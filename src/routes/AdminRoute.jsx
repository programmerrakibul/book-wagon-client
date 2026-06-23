import useAuthStore from "@/stores/useAuthStore";
import Forbidden from "../components/Forbidden/Forbidden";
import Loading from "../components/Loading/Loading";
import useRole from "../hooks/useRole";

const AdminRoute = ({ children }) => {
  const user = useAuthStore((s) => s.state.user);
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
