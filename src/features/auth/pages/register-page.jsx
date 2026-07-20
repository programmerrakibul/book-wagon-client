import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeftIcon, Eye, EyeOff, Upload, UserPlus } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";

import { postUser } from "@/features/auth/services/auth.service";
import { uploadImage } from "@/lib/upload-image";
import { createUser } from "@/store/use-auth-store";
import GoogleLogin from "../components/google-login";
import { registerSchema } from "../validation/auth";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: "", email: "", password: "", profileImage: null },
  });

  const onSubmit = async (values) => {
    try {
      const photoURL = await uploadImage(values.profileImage[0]);
      const user = await createUser({
        displayName: values.name,
        photoURL,
        email: values.email,
        password: values.password,
      });
      await postUser(user);
      toast.success("Account created successfully!");
      navigate("/");
    } catch (err) {
      toast.error(err.message || "Registration failed");
    }
  };

  return (
    <>
      <title>Register | BookWagon</title>

      <main className="flex min-h-[80vh] items-center justify-center px-4 py-12">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-2 flex size-12 items-center justify-center rounded-full bg-primary/10">
              <UserPlus className="size-6 text-primary" />
            </div>
            <CardTitle className="text-2xl">Create Account</CardTitle>
            <CardDescription>Join BookWagon and start reading</CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <Controller
                name="name"
                control={control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel htmlFor="name">Full Name</FieldLabel>
                    <FieldContent>
                      <Input {...field} id="name" placeholder="John Doe" />
                      {fieldState.error && (
                        <FieldError>{fieldState.error.message}</FieldError>
                      )}
                    </FieldContent>
                  </Field>
                )}
              />

              <Controller
                name="profileImage"
                control={control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel htmlFor="profileImage">
                      Profile Image
                    </FieldLabel>
                    <FieldContent>
                      <div className="relative">
                        <Upload className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="profileImage"
                          type="file"
                          accept="image/*"
                          className="pl-9 file:mr-2 file:border-0 file:bg-transparent file:text-sm file:font-medium"
                          onChange={(e) => field.onChange(e.target.files)}
                        />
                      </div>
                      <FieldDescription>
                        Upload a profile picture
                      </FieldDescription>
                      {fieldState.error && (
                        <FieldError>{fieldState.error.message}</FieldError>
                      )}
                    </FieldContent>
                  </Field>
                )}
              />

              <Controller
                name="email"
                control={control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <FieldContent>
                      <Input
                        {...field}
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                      />
                      {fieldState.error && (
                        <FieldError>{fieldState.error.message}</FieldError>
                      )}
                    </FieldContent>
                  </Field>
                )}
              />

              <Controller
                name="password"
                control={control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <FieldContent>
                      <div className="relative">
                        <Input
                          {...field}
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Create a strong password"
                          className="pr-9"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                          {showPassword ? (
                            <EyeOff className="size-4" />
                          ) : (
                            <Eye className="size-4" />
                          )}
                        </button>
                      </div>
                      <FieldDescription>
                        Min 8 chars, upper, lower, number, and special character
                      </FieldDescription>
                      {fieldState.error && (
                        <FieldError>{fieldState.error.message}</FieldError>
                      )}
                    </FieldContent>
                  </Field>
                )}
              />

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting && <Spinner className="mr-2" />}
                Create Account
              </Button>
            </form>

            <GoogleLogin label="Sign up with Google" />
          </CardContent>

          <CardFooter className="flex-col gap-2">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link
                to="/auth/login"
                className="font-medium text-primary hover:underline"
              >
                Sign in
              </Link>
            </p>

            <p className="font-medium text-sm text-primary hover:underline">
              <Link
                to="/"
                className=" flex items-center justify-center gap-1 group"
              >
                <ArrowLeftIcon className="size-4 group-hover:mr-1.5 transition-all duration-200" />
                <span>Back to home</span>
              </Link>
            </p>
          </CardFooter>
        </Card>
      </main>
    </>
  );
}
