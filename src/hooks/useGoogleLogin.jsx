// import { useMutation } from "@tanstack/react-query";
// import useSecureAxios from "./useSecureAxios";
import { useNavigate } from "react-router";
import useAuth from "./useAuth";
import { loginSuccessMessage } from "../utilities/loginSuccessMessage";
import { getAuthErrorMessage } from "../utilities/getAuthErrorMessage";
import { toast } from "sonner";

const useGoogleLogin = () => {
  const navigate = useNavigate();
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

      loginSuccessMessage(user.displayName);

      navigate("/");
      // const newUser = {
      //   name: user.displayName,
      //   email: user.email,
      //   photoURL: user.photoURL,
      // }

      // await mutateAsync(newUser);
    } catch (err) {
      const errorMessage = getAuthErrorMessage(err.code);
      toast.error(errorMessage);
    }
  };

  return { handleGoogleLogin };
};

export default useGoogleLogin;
