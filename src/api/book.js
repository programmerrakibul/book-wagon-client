import axiosInstance from "@/lib/axios";

export const getBooks = async ({
  search = "",
  page = 1,
  limit = 10,
  sort = "",
  category = "",
}) => {
  try {
    const { data } = await axiosInstance.get(
      `/books?search=${search}&page=${page}&limit=${limit}&sort=${sort}&category=${category}`,
    );

    return data || {}
  } catch (error) {
    console.log("Error fetching books: ", error);
    throw error;
  }
};
