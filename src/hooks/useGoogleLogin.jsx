// import { useMutation } from "@tanstack/react-query";
// import useSecureAxios from "./useSecureAxios";
import useAuth from "./useAuth";

const useGoogleLogin = () => {
  const { loginInWithGoogle } = useAuth();
  // const secureAxios = useSecureAxios();
  // const { mutateAsync, isPending: googleLoading } = useMutation({
  //   mutationKey: ["user"],
  //   mutationFn: async (payload) => {
  //     const {data} = await secureAxios.post("/users", payload);
  //     return data;
  //   },
  // });

  const handleGoogleLogin = async () => {
    try {
      const { user } = await loginInWithGoogle();

      console.log(user);

      // const newUser = {
      //   name: user.displayName,
      //   email: user.email,
      //   photoURL: user.photoURL,
      // }

      // await mutateAsync(newUser);
    } catch (err) {
      console.log(err);
    }
  };

  return { handleGoogleLogin };
};

export default useGoogleLogin;
