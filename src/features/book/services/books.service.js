import axiosInstance from "@/lib/axios";

export async function fetchBooks({
  search = "",
  page = 1,
  limit = 10,
  sort = "",
  category = "",
  email = "",
} = {}) {
  const query = [`page=${page}`, `limit=${limit}`];
  search && query.push(`search=${search}`);
  category && query.push(`category=${category}`);
  email && query.push(`email=${email}`);
  if (sort) {
    const [field, order] = sort.split("-");
    query.push(`sortBy=${field}&sortOrder=${order.toLowerCase()}`);
  }

  const { data } = await axiosInstance.get(`/books?${query.join("&")}`);
  return data || {};
}

export async function fetchBook(id) {
  const { data } = await axiosInstance.get(`/books/${id}`);
  return data?.data ?? {};
}

export async function createBook(payload) {
  const { data } = await axiosInstance.post("/books", payload);
  return data || {};
}

export async function updateBook(id, payload) {
  const { data } = await axiosInstance.put(`/books/${id}`, payload);
  return data || {};
}

export async function deleteBook(id) {
  const { data } = await axiosInstance.delete(`/books/${id}`);
  return data || {};
}

export async function changeBookStatus(id, status) {
  const { data } = await axiosInstance.patch(`/books/${id}/status`, { status });
  return data || {};
}

export async function toggleActiveStatus(id, isActive) {
  const { data } = await axiosInstance.patch(`/books/${id}/active-status`, {
    isActive,
  });
  return data || {};
}
