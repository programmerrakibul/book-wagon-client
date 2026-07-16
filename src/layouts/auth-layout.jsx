import authImg from "@/assets/auth.avif";
import useAuthStore from "@/store/use-auth-store";
import { Navigate, Outlet } from "react-router";

const AuthLayout = () => {
  const user = useAuthStore((s) => s.user);
  const authLoading = useAuthStore((s) => s.authLoading);

  if (!authLoading && user) {
    return <Navigate to="/" replace />;
  }

  return (
    <section className="flex min-h-dvh">
      <div className="hidden md:block md:w-1/2 lg:w-3/5">
        <img
          src={authImg}
          alt="A boy in front of the shelf"
          className="h-full w-full object-cover"
        />
      </div>

      <div className="flex w-full items-center justify-center md:w-1/2 lg:w-2/5">
        <Outlet />
      </div>
    </section>
  );
};

export default AuthLayout;
