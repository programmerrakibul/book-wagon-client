import Forbidden from "../components/Forbidden/Forbidden";
import Loading from "../components/Loading/Loading";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";

const AdminRoute = ({ children }) => {
  const { user } = useAuth();
  const { role, roleLoading } = useRole();

  if (roleLoading) {
    return <Loading />;
  }

  if (!user || role !== "admin") {
    return <Forbidden />;
  }

  return children;
};

export default AdminRoute;
