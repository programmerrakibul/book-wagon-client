import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";

import { queryClient } from "@/App";
import {
  changeBookStatus,
  createBook,
  fetchBook,
  fetchBooks,
  updateBook,
} from "@/features/book/services/books.service";

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

export function useCreateBook() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: createBook,
    onSuccess: (data) => {
      if (data.success) {
        toast.success("Book has been added successfully!");
        queryClient.invalidateQueries({ queryKey: bookKeys.all });
        navigate("/dashboard/my-books");
      } else {
        throw new Error(data.message);
      }
    },
    onError: (error) => {
      const msg = error.response?.data?.message || error.message;
      toast.error(msg || "Failed to add the book. Please try again.");
    },
  });
}

export function useUpdateBook(id) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (payload) => updateBook(id, payload),
    onSuccess: (data) => {
      if (data.success) {
        toast.success("Book updated successfully!");
        queryClient.invalidateQueries({ queryKey: bookKeys.all });
        navigate("/dashboard/my-books");
      } else {
        throw new Error(data.message);
      }
    },
    onError: (error) => {
      const msg = error.response?.data?.message || error.message;
      toast.error(msg || "Failed to update the book.");
    },
  });
}

export const useUpdateStatus = () => {
  return useMutation({
    mutationFn: ({ bookId, status }) => changeBookStatus(bookId, status),
    onSuccess: (result) => {
      if (result.success) {
        queryClient.invalidateQueries({ queryKey: ["books"] });
        toast.success("Book status updated.");
      } else {
        throw new Error(result.message);
      }
    },
    onError: (err) => {
      toast.error(
        err.response?.data?.message ||
          err.message ||
          "Failed to update status.",
      );
    },
  });
};
