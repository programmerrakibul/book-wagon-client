import { useState, useEffect } from "react";
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
import { FaRocket } from "react-icons/fa";
import { demoCredentials } from "../../../data/demoCredentials";

const Login = () => {
  const navigate = useNavigate();
  const { logInWithPassword } = useAuth();
  const [loading, setLoading] = useState(false);
  const { handleGoogleLogin, googleLoading } = useGoogleLogin();
  const [showPassword, setShowPassword] = useState(false);
  const [showDemoModal, setShowDemoModal] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  // Lock body scroll when modal is open
  useEffect(() => {
    if (showDemoModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    // Cleanup function
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showDemoModal]);

  const handleDemoLogin = (role) => {
    const credentials = demoCredentials[role];

    setValue("email", credentials.email);
    setValue("password", credentials.password);

    setShowDemoModal(false);

    setTimeout(() => {
      handleSubmit(onSubmit)();
    }, 300);

    toast.info(`Logging in as ${credentials.label}...`);
  };

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

            {/*  Demo Button */}
            <button
              type="button"
              onClick={() => setShowDemoModal(true)}
              disabled={loading || googleLoading}
              className="mb-4 btn-block btn btn-outline btn-primary text-primary hover:text-white"
            >
              <FaRocket className="mr-2" />
              Try Demo Accounts
            </button>

            <div className="divider">Or sign in manually</div>

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
                  className="btn-block cursor-pointer"
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
                    className="text-secondary font-semibold hover:underline cursor-pointer"
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

      {/* Demo Modal with Dark Mode Support */}
      {showDemoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-secondary/20 backdrop-blur-xs overflow-auto">
          <div className="relative w-full max-w-sm bg-base-100 rounded-md shadow-lg">
            {/* Modal Header */}
            <div className="p-4 border-b border-gray-300 dark:border-gray-700">
              <h3 className="text-lg font-semibold">Select Demo Role</h3>
              <p className="text-sm mt-1">Choose a role to login</p>
            </div>

            {/* Modal Body */}
            <div className="p-4">
              <div className="space-y-3">
                {Object.entries(demoCredentials).map(([role, data]) => {
                  const Icon = data.icon;

                  return (
                    <button
                      key={role}
                      type="button"
                      onClick={() => handleDemoLogin(role)}
                      disabled={loading || googleLoading}
                      className="w-full flex items-center gap-3 p-3 border border-gray-300 dark:border-gray-700 rounded-md hover:bg-secondary/20 disabled:opacity-50 cursor-pointer transition-colors"
                    >
                      <div className="text-primary">
                        <Icon />
                      </div>
                      <div className="text-left">
                        <p className="font-medium dark:text-white">
                          {data.label}
                        </p>
                        <p className="text-sm">{data.email}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-gray-300 dark:border-gray-700">
              <button
                onClick={() => setShowDemoModal(false)}
                className="btn btn-error btn-outline btn-block"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
