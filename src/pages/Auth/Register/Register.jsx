import { useForm } from "react-hook-form";
import MyInput from "../../../components/MyInput/MyInput";
import MyLabel from "../../../components/MyLabel/MyLabel";
import Button from "../../../components/Button/Button";
import ErrorMessage from "../../../components/ErrorMessage/ErrorMessage";
import { validatePassword } from "../../../utilities/validatePassword";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    // Handle registration logic here
  };

  return (
    <>
      <title>Create your BookWagon Account</title>

      <div className="min-h-dvh flex items-center justify-center bg-secondary/5 py-12 md:px-4">
        <div className="card w-full max-w-md bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-3xl font-bold text-center text-primary mb-6">
              Create Account
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Name Field */}
              <div className="space-y-1">
                <MyLabel htmlFor="name" label="Name" />
                <MyInput
                  id="name"
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
                  type="file"
                  accept="image/*"
                  className="file-input file-input-bordered w-full"
                  {...register("image", { required: "Image is required" })}
                />
                <ErrorMessage message={errors.image?.message} />
              </div>

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
                <MyInput
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  {...register("password", {
                    required: "Password is required",
                    validate: validatePassword,
                  })}
                />
                <ErrorMessage message={errors.password?.message} />
              </div>

              {/* Submit Button */}
              <div className="mt-6">
                <Button className="btn-block">Register</Button>
              </div>

              {/* Login Link */}
              <div className="text-center mt-4">
                <p className="text-sm">
                  Already have an account?{" "}
                  <a
                    href="/login"
                    className="text-secondary font-semibold hover:underline"
                  >
                    Login here
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
