import axiosInstance from "@/lib/axios";

export const getBooks = async ({
  search = "",
  page = 1,
  limit = 10,
  sort = "",
  category = "",
  email = "",
}) => {
  try {
    const query = [`page=${page}`, `limit=${limit}`];

    if (search) query.push(`search=${search}`);
    if (sort) query.push(`sortBy=${sort}`);
    if (category) query.push(`category=${category}`);
    if (email) query.push(`email=${email}`);

    const { data } = await axiosInstance.get(`/books?${query.join("&")}`);

    return data || {};
  } catch (error) {
    console.log("Error fetching books: ", error);
    throw error;
  }
};

export const changeBookStatus = async (id, status) => {
  const { data } = await axiosInstance.patch(`/books/${id}`, {
    status,
  });

  return data || {};
};
