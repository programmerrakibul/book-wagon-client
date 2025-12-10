import { Navigate, Outlet } from "react-router";
import Container from "../../pages/shared/Container/Container";
import authImg from "../../assets/auth.avif";
import useAuth from "../../hooks/useAuth";

const AuthLayout = () => {
  const { user } = useAuth();

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
