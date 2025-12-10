import Forbidden from "../components/Forbidden/Forbidden";
import Loading from "../components/Loading/Loading";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";

const LibrarianRoute = ({ children }) => {
  const { user } = useAuth();
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
