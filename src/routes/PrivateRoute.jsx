import { Navigate } from "react-router";
import useAuthStore from "@/stores/useAuthStore";

const PrivateRoute = ({ children }) => {
  const user  = useAuthStore(s=> s.user);

  if (user) {
    return children;
  }

  return <Navigate to="/auth/login" />;
};

export default PrivateRoute;
