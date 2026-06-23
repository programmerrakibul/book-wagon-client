import authImg from "@/assets/auth.avif";
import Container from "@/pages/shared/Container/Container";
import useAuthStore from "@/stores/useAuthStore";
import { Navigate, Outlet } from "react-router";

const AuthLayout = () => {
  const user = useAuthStore((s) => s.user);

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <section>
        <Container className="flex items-stretch justify-between">
          <div className="hidden md:block md:flex-1">
            <img
              src={authImg}
              alt="A boy in front of the shelf"
              className="min-h-dvh object-cover w-full"
            />
          </div>

          <div className="flex-1 min-h-dvh">
            <Outlet />
          </div>
        </Container>
      </section>
    </>
  );
};

export default AuthLayout;
