import { useState } from "react";
import { useForm } from "react-hook-form";
import MyInput from "../../../components/MyInput/MyInput";
import MyLabel from "../../../components/MyLabel/MyLabel";
import Button from "../../../components/Button/Button";
import ErrorMessage from "../../../components/ErrorMessage/ErrorMessage";
import useAuth from "../../../hooks/useAuth";
import SocialLogin from "../../shared/SocialLogin/SocialLogin";
import useGoogleLogin from "../../../hooks/useGoogleLogin";
import { Link, useNavigate } from "react-router";
import { loginSuccessMessage } from "../../../utilities/loginSuccessMessage";
import { toast } from "sonner";
import { getAuthErrorMessage } from "../../../utilities/getAuthErrorMessage";
import ActionSpinner from "../../../components/ActionSpinner/ActionSpinner";
import { postUser } from "../../../utilities/postUser";
import BackButton from "../../../components/BackButton/BackButton";
import EyeButton from "../../../components/EyeButton/EyeButton";

const Login = () => {
  const navigate = useNavigate();
  const { logInWithPassword } = useAuth();
  const [loading, setLoading] = useState(false);
  const { handleGoogleLogin, googleLoading } = useGoogleLogin();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const email = data.email;
    const password = data.password;

    setLoading(true);

    try {
      const { user } = await logInWithPassword(email, password);
      await postUser(user);

      loginSuccessMessage(user.displayName);
      reset();
      navigate("/");
    } catch (error) {
      const errorMessage = getAuthErrorMessage(error.code);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <title>Login with BookWagon</title>

      <div className="min-h-dvh flex items-center justify-center bg-secondary/5 py-12 md:px-4">
        <div className="card w-full max-w-md bg-base-100 shadow-xl">
          <div className="card-body">
            <BackButton to={"/"} label="Back to Home" />

            <h2 className="card-title text-3xl font-bold text-center text-primary! mb-6">
              Login to Your Account
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Email Field */}
              <div className="space-y-1">
                <MyLabel htmlFor="email" label="Email" />
                <MyInput
                  id="email"
                  type="email"
                  disabled={loading || googleLoading}
                  placeholder="Enter your email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                />
                <ErrorMessage message={errors.email?.message} />
              </div>

              {/* Password Field */}
              <div className="space-y-1">
                <MyLabel htmlFor="password" label="Password" />
                <div className="relative">
                  <MyInput
                    id="password"
                    disabled={loading || googleLoading}
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="pr-10"
                    {...register("password", {
                      required: "Password is required",
                    })}
                  />

                  <EyeButton
                    showPassword={showPassword}
                    setShowPassword={setShowPassword}
                  />
                </div>
                <ErrorMessage message={errors.password?.message} />
              </div>

              {/* Submit Button */}
              <div className="mt-6">
                <Button
                  disabled={loading || googleLoading}
                  className="btn-block"
                >
                  {loading ? <ActionSpinner /> : "Login"}
                </Button>
              </div>

              {/* Login Link */}
              <div className="text-center mt-4">
                <p className="text-sm">
                  Don't have an account?{" "}
                  <Link
                    to="/auth/register"
                    className="text-secondary font-semibold hover:underline"
                  >
                    Register here
                  </Link>
                </p>
              </div>

              <SocialLogin
                disabled={loading || googleLoading}
                isLoading={googleLoading}
                onClick={() => handleGoogleLogin()}
              />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
