import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchBook, fetchBooks } from "../services/books.service";
export const bookKeys = {
  all: ["books"],
  list: (params) => ["books", "list", params],
  detail: (id) => ["books", "detail", id],
};
export function useBooks(params) {
  return useQuery({
    queryKey: bookKeys.list(params),
    queryFn: () => fetchBooks(params),
    placeholderData: keepPreviousData,
    staleTime: 60_000,
  });
}
export function useBook(id) {
  return useQuery({
    queryKey: bookKeys.detail(id),
    queryFn: () => fetchBook(id),
    enabled: Boolean(id),
    staleTime: 60_000,
  });
}
