import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { fetchWishlist } from "@/features/wishlist/services/wishlist.service";

export const wishlistKeys = {
  all: ["wishlist"],
  list: (params) => ["wishlist", "list", params],
};

export function useWishlist(params) {
  return useQuery({
    queryKey: wishlistKeys.list(params),
    queryFn: () => fetchWishlist(params),
    placeholderData: keepPreviousData,
    staleTime: 30_000,
  });
}
