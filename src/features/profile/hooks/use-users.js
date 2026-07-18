import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

import { queryClient } from "@/App";
import {
  fetchUsers,
  updateUserRole,
} from "@/features/profile/services/users.service";
import { getAxiosError } from "@/utils/error";

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
