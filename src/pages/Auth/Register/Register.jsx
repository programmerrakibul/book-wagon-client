import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import MyInput from "../../../components/MyInput/MyInput";
import MyLabel from "../../../components/MyLabel/MyLabel";
import Button from "../../../components/Button/Button";
import ErrorMessage from "../../../components/ErrorMessage/ErrorMessage";
import { validatePassword } from "../../../utilities/validatePassword";
import { uploadImage } from "../../../utilities/uploadImage";
import useAuth from "../../../hooks/useAuth";
import SocialLogin from "../../shared/SocialLogin/SocialLogin";
import useGoogleLogin from "../../../hooks/useGoogleLogin";
import { Link, useNavigate } from "react-router";
import { loginSuccessMessage } from "../../../utilities/loginSuccessMessage";
import { getAuthErrorMessage } from "../../../utilities/getAuthErrorMessage";
import { toast } from "sonner";
import { postUser } from "../../../utilities/postUser";
import ActionSpinner from "../../../components/ActionSpinner/ActionSpinner";
import BackButton from "../../../components/BackButton/BackButton";
import EyeButton from "../../../components/EyeButton/EyeButton";

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { handleGoogleLogin, googleLoading } = useGoogleLogin();
  const { updateUserProfile, createUser } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const displayName = data.name;
    const email = data.email;
    const password = data.password;

    setLoading(true);

    try {
      const photoURL = await uploadImage(data.image[0]);
      const { user } = await createUser(email, password);

      await updateUserProfile({
        displayName,
        photoURL,
      });

      await postUser(user);

      reset();
      navigate("/");
      loginSuccessMessage(user.displayName);
    } catch (error) {
      const errorMessage = getAuthErrorMessage(error.code);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <title>Create your BookWagon Account</title>

      <div className="min-h-dvh flex items-center justify-center bg-secondary/5 py-12 md:px-4">
        <div className="card w-full max-w-md bg-base-100 shadow-xl">
          <div className="card-body">
            <BackButton to={"/"} label="Back to Home" />

            <h2 className="card-title text-3xl font-bold text-center text-primary! mb-6">
              Create Account
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Name Field */}
              <div className="space-y-1">
                <MyLabel htmlFor="name" label="Name" />
                <MyInput
                  id="name"
                  disabled={loading || googleLoading}
                  placeholder="Enter your name"
                  {...register("name", {
                    required: "Name is required",
                    validate: (value) =>
                      value.trim() !== "" || "Name cannot be empty",
                  })}
                />

                <ErrorMessage message={errors.name?.message} />
              </div>

              {/* Image File Field */}
              <div className="space-y-1">
                <MyLabel htmlFor="image" label="Profile Image" />
                <MyInput
                  id="image"
                  disabled={loading || googleLoading}
                  type="file"
                  accept="image/*"
                  className="file-input file-input-bordered w-full px-0"
                  {...register("image", { required: "Image is required" })}
                />
                <ErrorMessage message={errors.image?.message} />
              </div>

              {/* Email Field */}
              <div className="space-y-1">
                <MyLabel htmlFor="email" label="Email" />
                <MyInput
                  id="email"
                  disabled={loading || googleLoading}
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
                    disabled={loading || googleLoading}
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="pr-10"
                    {...register("password", {
                      required: "Password is required",
                      validate: validatePassword,
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
                  {loading ? <ActionSpinner /> : "Register"}
                </Button>
              </div>

              {/* Login Link */}
              <div className="text-center mt-4">
                <p className="text-sm">
                  Already have an account?{" "}
                  <Link
                    to="/auth/login"
                    className="text-secondary font-semibold hover:underline"
                  >
                    Login here
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

export default Register;
