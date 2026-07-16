import ActionSpinner from "@/components/ui/action-spinner";
import BackButton from "@/components/ui/back-button";
import Button from "@/components/ui/button";
import ErrorMessage from "@/components/ui/error-message";
import EyeButton from "@/components/ui/eye-button";
import MyInput from "@/components/ui/input";
import MyLabel from "@/components/ui/label";
import SocialLogin from "@/components/ui/social-login";
import useAuthStore, { loginWithPassword } from "@/stores/use-auth-store";
import { getAuthErrorMessage } from "@/utils/getAuthErrorMessage";
import { loginSuccessMessage } from "@/utils/loginSuccessMessage";
import { postUser } from "@/utils/postUser";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const emailLoading = useAuthStore((s) => s.emailLoading);
  const googleLoading = useAuthStore((s) => s.googleLoading);
  const loading = emailLoading || googleLoading;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      email: "demo-reader@gmail.com",
      password: "Rakibul206#",
    },
  });

  const onSubmit = async (data) => {
    const email = data.email;
    const password = data.password;

    try {
      const user = await loginWithPassword({ email, password });
      await postUser(user);

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
                  disabled={loading}
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
                    disabled={loading}
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
              <div className="mt-6 space-y-1">
                <Button disabled={loading} className="btn-block cursor-pointer">
                  {emailLoading ? <ActionSpinner /> : "Login"}
                </Button>
                <p className="text-xs text-primary font-semibold text-center">
                  Filled with demo credentials
                </p>
              </div>

              {/* Login Link */}
              <div className="text-center mt-4">
                <p className="text-sm">
                  Don't have an account?{" "}
                  <Link
                    to="/auth/register"
                    className="text-secondary font-semibold hover:underline cursor-pointer"
                  >
                    Register here
                  </Link>
                </p>
              </div>

              <SocialLogin disabled={loading} />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
