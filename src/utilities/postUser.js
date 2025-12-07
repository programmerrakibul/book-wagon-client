import axios from "axios";

export const postUser = async (user) => {
  const newUser = {
    name: user.displayName,
    email: user.email,
    photoURL: user.photoURL,
  };

  const apiBaseUrl = import.meta.env.VITE_SERVER_URL;

  try {
    const { data } = await axios.post(`${apiBaseUrl}/users`, newUser);
    return data;
  } catch (error) {
    console.error("Error posting user:", error);
    throw error;
  }
};
