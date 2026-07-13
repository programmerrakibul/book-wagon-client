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
