import axiosInstance from "@/lib/axios";

export async function fetchComments(bookId) {
  const { data } = await axiosInstance.get(`/comments/${bookId}`);
  return data || {};
}

export async function postComment(bookId, comment) {
  const { data } = await axiosInstance.post(`/comments`, { comment, bookId });
  return data || {};
}
