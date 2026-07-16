import ActionSpinner from "@/components/ui/action-spinner";
import BackButton from "@/components/ui/back-button";
import Button from "@/components/ui/button";
import ErrorMessage from "@/components/ui/error-message";
import EyeButton from "@/components/ui/eye-button";
import MyInput from "@/components/ui/input";
import MyLabel from "@/components/ui/label";
import SocialLogin from "@/components/ui/social-login";
import useAuthStore, { createUser } from "@/stores/use-auth-store";
import { getAuthErrorMessage } from "@/utils/getAuthErrorMessage";
import { loginSuccessMessage } from "@/utils/loginSuccessMessage";
import { postUser } from "@/utils/postUser";
import { uploadImage } from "@/utils/uploadImage";
import { validatePassword } from "@/utils/validatePassword";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";

const Register = () => {
  const navigate = useNavigate();
  const loading = useAuthStore((s) => s.authLoading);
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

    try {
      const photoURL = await uploadImage(data.image[0]);
      const user = await createUser({ email, password, displayName, photoURL });

      await postUser(user);

      reset();
      navigate("/");
      loginSuccessMessage(user.displayName);
    } catch (error) {
      const errorMessage = getAuthErrorMessage(error.code);
      toast.error(errorMessage);
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
                  disabled={loading}
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
                  disabled={loading}
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
                  disabled={loading}
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
                    disabled={loading}
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
                <Button disabled={loading} className="btn-block">
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

              <SocialLogin disabled={loading} />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
