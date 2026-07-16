import useAuthStore from "@/stores/use-auth-store";
import Forbidden from "../components/ui/forbidden";
import Loading from "../components/ui/loading";
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
