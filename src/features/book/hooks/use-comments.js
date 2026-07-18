import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

import { queryClient } from "@/App";
import {
  fetchComments,
  postComment,
} from "@/features/book/services/comments.service";
import { getAxiosError } from "@/utils/error";

export const commentKeys = {
  all: ["comments"],
  list: (bookId) => ["comments", bookId],
};

export function useComments(bookId) {
  return useQuery({
    queryKey: commentKeys.list(bookId),
    queryFn: () => fetchComments(bookId),
    enabled: Boolean(bookId),
    staleTime: 30_000,
  });
}

export function usePostComment(bookId, bookName) {
  return useMutation({
    mutationFn: (comment) => postComment(bookId, comment),
    onSuccess: (data) => {
      if (data.success) {
        queryClient.invalidateQueries({ queryKey: commentKeys.list(bookId) });
        toast.success(`Review posted for ${bookName}!`);
      } else {
        throw new Error(data.message);
      }
    },
    onError: (error) => {
      const msg = getAxiosError(error);
      toast.error(msg || "Failed to post comment.");
    },
  });
}
