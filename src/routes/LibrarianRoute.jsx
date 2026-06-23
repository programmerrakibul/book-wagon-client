import useAuthStore from "@/stores/useAuthStore";
import Forbidden from "../components/Forbidden/Forbidden";
import Loading from "../components/Loading/Loading";
import useRole from "../hooks/useRole";

const LibrarianRoute = ({ children }) => {
  const  user  = useAuthStore(s=> s.state.user);
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
