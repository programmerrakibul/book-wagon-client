import axiosInstance from "@/lib/axios";

export const getCategories = async () => {
  try {
    const { data } = await axiosInstance.get("/categories");
    return data.data;
  } catch (error) {
    console.error("Error fetching categories: ", error);
    throw error;
  }
};

export const getSubCategories = async (categoryId) => {
  try {
    let query = "";

    if (categoryId) query = `?categoryId=${categoryId}`;

    const { data } = await axiosInstance.get(`/sub-categories${query}`);
    return data.data;
  } catch (error) {
    console.error("Error fetching subcategories: ", error);
    throw error;
  }
};

export const getBookFormats = async () => {
  try {
    const { data } = await axiosInstance.get("/book-formats");
    return data.data;
  } catch (error) {
    console.error("Error fetching book formats: ", error);
    throw error;
  }
};
