import axios from "axios";

export const uploadImage = async (imageFile) => {
  try {
    const formData = new FormData();
    const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME?.trim();
    const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET?.trim();

    if (!CLOUD_NAME || !UPLOAD_PRESET) {
      throw new Error("Missing Cloudinary environment variables");
    }

    if (!imageFile) {
      throw new Error("No image file provided");
    }

    const uploadUrl = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

    formData.append("file", imageFile);
    formData.append("upload_preset", UPLOAD_PRESET);

    const { data } = await axios.post(uploadUrl, formData);

    return data.secure_url;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};
