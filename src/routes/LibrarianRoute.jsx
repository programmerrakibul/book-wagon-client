import useAuthStore from "@/stores/use-auth-store";
import Forbidden from "../components/Forbidden/Forbidden";
import Loading from "../components/Loading/Loading";
import useRole from "../hooks/use-role";

const LibrarianRoute = ({ children }) => {
  const user = useAuthStore((s) => s.user);
  const { role, roleLoading } = useRole();

  if (roleLoading) {
    return <Loading />;
  }

  if (!user || role !== "librarian") {
    return <Forbidden />;
  }

  return children;
};

export default LibrarianRoute;
