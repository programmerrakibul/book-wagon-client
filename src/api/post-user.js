import axiosInstance from "@/lib/axios";

export const postUser = async (user) => {
  try {
    const newUser = {
      name: user.displayName,
      email: user.email,
      photoUrl: user.photoURL,
    };

    const { data } = await axiosInstance.post("/users", newUser);
    return data;
  } catch (error) {
    console.error("Error posting user:", error);
    throw error;
  }
};
