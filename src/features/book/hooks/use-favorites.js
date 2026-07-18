import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

import { queryClient } from "@/App";
import {
  checkFavorite,
  toggleFavorite,
} from "@/features/book/services/favorites.service";
import useAuthStore from "@/store/use-auth-store";
import { getAxiosError } from "@/utils/error";

export const favoriteKeys = {
  check: (bookId, email) => ["isFavorite", bookId, email],
};

export function useIsFavorite(bookId, email) {
  return useQuery({
    queryKey: favoriteKeys.check(bookId, email),
    queryFn: () => checkFavorite(bookId),
    enabled: !!email && !!bookId,
    staleTime: 30_000,
  });
}

export function useToggleFavorite(bookId) {
  const user = useAuthStore((s) => s.user);

  return useMutation({
    mutationFn: () => {
      if (!user) {
        throw new Error("Please sign in to add to wishlist.");
      }

      return toggleFavorite(bookId);
    },
    onSuccess: (result) => {
      queryClient.invalidateQueries({
        queryKey: favoriteKeys.check(bookId, user.email),
      });
      toast.success(result.message);
    },
    onError: (err) => {
      const msg = getAxiosError(err);

      toast.error(msg || "Wishlist update failed. Please try again.");
    },
  });
}
