import { Navigate } from "react-router";
import useAuth from "../hooks/useAuth";

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();

  if (user) {
    return children;
  }

  return <Navigate to="/auth/login" />;
};

export default PrivateRoute;
