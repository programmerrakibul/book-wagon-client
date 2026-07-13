import Loading from "@/components/Loading/Loading";
import useAuthStore from "@/stores/use-auth-store";
import { Navigate } from "react-router";

const PrivateRoute = ({ children }) => {
  const user = useAuthStore((s) => s.user);
  const isLoading = useAuthStore((s) => s.authLoading);

  if (isLoading) {
    return (
      <div className="min-h-dvh grid place-items-center">
        <Loading />
      </div>
    );
  }

  if (user) {
    return children;
  }

  return <Navigate to="/auth/login" />;
};

export default PrivateRoute;
