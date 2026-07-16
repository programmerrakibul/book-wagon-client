import { useQuery } from "@tanstack/react-query";
import {
  getCategories,
  getSubCategories,
  getBookFormats,
} from "../services/categories.service";

const STALE_TIME = 1000 * 60 * 60 * 24;
const placeholderData = (previousData) => previousData;

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    staleTime: STALE_TIME,
    placeholderData,
  });
};

export const useSubCategories = ({ categoryId, enabled = true }) => {
  return useQuery({
    queryKey: ["subcategories", categoryId],
    queryFn: () => getSubCategories(categoryId),
    staleTime: STALE_TIME,
    placeholderData,
    enabled,
  });
};

export const useBookFormats = () => {
  return useQuery({
    queryKey: ["book-formats"],
    queryFn: getBookFormats,
    staleTime: STALE_TIME,
    placeholderData,
  });
};
