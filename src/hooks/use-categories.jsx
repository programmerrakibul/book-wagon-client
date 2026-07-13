import { getCategories } from "@/api/category";
import { useQuery } from "@tanstack/react-query";

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    staleTime: 1000 * 60 * 60 * 24,
    placeholderData: (previousData) => previousData,
  });
};
