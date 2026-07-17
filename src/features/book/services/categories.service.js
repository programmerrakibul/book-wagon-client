import axiosInstance from "@/lib/axios";

export async function getCategories() {
  const { data } = await axiosInstance.get("/categories");
  return data.data;
}

export async function getSubCategories(categoryId) {
  let query = "";
  if (categoryId) query = `?categoryId=${categoryId}`;
  const { data } = await axiosInstance.get(`/sub-categories${query}`);
  return data.data;
}

export async function getBookFormats() {
  const { data } = await axiosInstance.get("/book-formats");
  return data.data;
}
