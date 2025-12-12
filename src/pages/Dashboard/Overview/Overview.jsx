import Loading from "../../../components/Loading/Loading";
import useRole from "../../../hooks/useRole";
import AdminOverview from "./AdminOverview";
import LibrarianOverview from "./LibrarianOverview";
import UserOverview from "./UserOverview";

const Overview = () => {
  const { role, roleLoading } = useRole();

  if (roleLoading) {
    return <Loading />;
  }

  if (role === "admin") {
    return <AdminOverview />;
  }

  if (role === "librarian") {
    return <LibrarianOverview />;
  }

  if (role === "user") {
    return <UserOverview />;
  }
};

export default Overview;
