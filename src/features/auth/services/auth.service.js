import axiosInstance from "@/lib/axios";

export async function postUser(user) {
  const newUser = {
    name: user.displayName,
    email: user.email,
    photoUrl: user.photoURL,
  };
  const { data } = await axiosInstance.post("/users", newUser);
  return data;
}

export async function getUserRole() {
  const { data } = await axiosInstance.get("/users/role");
  return data || {};
}
