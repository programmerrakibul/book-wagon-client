import axios from "axios";

export const postUser = async (user) => {
  try {
    const newUser = {
      name: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
    };

    const url = `${import.meta.env.VITE_SERVER_URL}/api/users`;

    const { data } = await axios.post(url, newUser);
    return data;
  } catch (error) {
    console.error("Error posting user:", error);
    throw error;
  }
};
