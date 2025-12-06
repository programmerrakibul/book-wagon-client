import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash, FaArrowLeft } from "react-icons/fa";
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

const Login = () => {
  const navigate = useNavigate();
  const { handleGoogleLogin } = useGoogleLogin();
  const { logInWithPassword } = useAuth();
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

    try {
      const { user } = await logInWithPassword(email, password);

      loginSuccessMessage(user.displayName);
      reset();
      navigate("/");
    } catch (error) {
      const errorMessage = getAuthErrorMessage(error.code);
      toast.error(errorMessage);
    }
  };

  return (
    <>
      <title>Login with BookWagon</title>

      <div className="min-h-dvh flex items-center justify-center bg-secondary/5 py-12 md:px-4">
        <div className="card w-full max-w-md bg-base-100 shadow-xl">
          <div className="card-body">
            <Link
              to="/"
              className="group flex items-center gap-2 text-gray-600 hover:text-primary transition-all duration-300 mb-4 w-fit"
            >
              <FaArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
              <span className="text-sm font-medium">Back to Home</span>
            </Link>

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
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="pr-10"
                    {...register("password", {
                      required: "Password is required",
                    })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? (
                      <FaEyeSlash className="w-5 h-5" />
                    ) : (
                      <FaEye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                <ErrorMessage message={errors.password?.message} />
              </div>

              {/* Submit Button */}
              <div className="mt-6">
                <Button className="btn-block">Login</Button>
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

              <SocialLogin onClick={() => handleGoogleLogin()} />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
