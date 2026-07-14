import ActionSpinner from "@/components/ActionSpinner/ActionSpinner";
import useAuthStore, { loginWithGoogle } from "@/stores/use-auth-store";
import { getAuthErrorMessage } from "@/utils/getAuthErrorMessage";
import { loginSuccessMessage } from "@/utils/loginSuccessMessage";
import { postUser } from "@/utils/postUser";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router";
import { toast } from "sonner";

const SocialLogin = ({ disabled = false }) => {
  const navigate = useNavigate();
  const isLoading = useAuthStore((s) => s.googleLoading);

  const handleGoogleLogin = async () => {
    try {
      const user = await loginWithGoogle();
      await postUser(user);

      loginSuccessMessage(user.displayName);
      navigate("/");
    } catch (err) {
      const errorMessage = getAuthErrorMessage(err.code);
      toast.error(errorMessage);
    }
  };

  return (
    <>
      <div>
        <div className="divider  text-sm">OR</div>

        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={isLoading || disabled}
          className="btn btn-block bg-white dark:bg-neutral dark:text-white dark:hover:text-neutral border-2 border-gray-300 hover:bg-gray-50 hover:border-gray-400 hover:shadow-md transition-all duration-200 font-medium"
        >
          {isLoading ? (
            <ActionSpinner />
          ) : (
            <>
              <span className="text-base md:text-xl">
                <FcGoogle />
              </span>
              <span>Continue with Google</span>
            </>
          )}
        </button>
      </div>
    </>
  );
};

export default SocialLogin;
