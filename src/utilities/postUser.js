import axios from "axios";

export const postUser = async (user) => {
  const newUser = {
    name: user.displayName,
    email: user.email,
    photoURL: user.photoURL,
  };

  try {
    const { data } = await axios.post(
      `${import.meta.env.SERVER_URL}/users`,
      newUser
    );
    return data;
  } catch (error) {
    console.error("Error posting user:", error);
    throw error;
  }
};
