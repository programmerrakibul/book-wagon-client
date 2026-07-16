import useAuthStore from "@/stores/use-auth-store";
import Forbidden from "../components/ui/forbidden";
import Loading from "../components/ui/loading";
import useRole from "../hooks/use-role";

const AdminRoute = ({ children }) => {
  const user = useAuthStore((s) => s.user);
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
