import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

import { queryClient } from "@/App";
import {
  fetchUsers,
  updateUserRole,
} from "@/features/profile/services/users.service";
import { uploadImage } from "@/lib/upload-image";
import useAuthStore, { updateUserProfile } from "@/store/use-auth-store";
import { getAxiosError } from "@/utils/error";
import { updateProfile } from "../services/profile.service";

export const userKeys = {
  all: ["users"],
  list: (params) => ["users", "list", params],
};

export function useUsers(params) {
  return useQuery({
    queryKey: userKeys.list(params),
    queryFn: () => fetchUsers(params),
    staleTime: 30_000,
  });
}

export function useUpdateUserRole() {
  return useMutation({
    mutationFn: ({ id, role }) => updateUserRole(id, role),
    onSuccess: (data) => {
      if (data.success) {
        queryClient.invalidateQueries({ queryKey: userKeys.all });
        toast.success("User role updated successfully!");
      } else {
        throw new Error(data.message);
      }
    },
    onError: (error) => {
      const msg = getAxiosError(error);
      toast.error(msg || "Failed to update user role.");
    },
  });
}

export const useUpdateUserProfile = () => {
  const user = useAuthStore((s) => s.user);

  return useMutation({
    mutationFn: async ({ displayName = user?.name, imageFile }) => {
      let photoURL = user?.photoUrl;
      const name = displayName?.trim();

      if (imageFile) {
        photoURL = await uploadImage(imageFile);
      }

      await updateUserProfile({
        displayName: name,
        photoURL,
      });

      await updateProfile({
        name,
        photoUrl: photoURL,
      });
    },
    onSuccess: () => {
      toast.success("Profile updated successfully");
      queryClient.invalidateQueries({ queryKey: userKeys.all });
    },
    onError: () => toast.error("Failed to update profile"),
  });
};
