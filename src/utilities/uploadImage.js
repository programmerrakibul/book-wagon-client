import axios from "axios";

export const uploadImage = async (imageFile) => {
  const apiKey = import.meta.env.VITE_IMAGE_API_KEY;
  const formData = new FormData();
  formData.append("image", imageFile);

  try {
    const { data } = await axios.post(
      "https://api.imgbb.com/1/upload",
      formData,
      {
        params: {
          key: apiKey,
        },
      }
    );
    return data.data.url;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};
