import { useNavigate } from "react-router";
import useAuth from "./useAuth";
import { loginSuccessMessage } from "../utilities/loginSuccessMessage";
import { getAuthErrorMessage } from "../utilities/getAuthErrorMessage";
import { toast } from "sonner";
import { postUser } from "../utilities/postUser";
import { useState } from "react";

const useGoogleLogin = () => {
  const navigate = useNavigate();
  const { loginInWithGoogle } = useAuth();
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);

    try {
      const { user } = await loginInWithGoogle();
      await postUser(user);

      loginSuccessMessage(user.displayName);
      navigate("/");
    } catch (err) {
      const errorMessage = getAuthErrorMessage(err.code);
      toast.error(errorMessage);
    } finally {
      setGoogleLoading(false);
    }
  };

  return { handleGoogleLogin, googleLoading };
};

export default useGoogleLogin;
