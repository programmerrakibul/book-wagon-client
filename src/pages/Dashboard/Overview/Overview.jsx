import Loading from "@/components/ui/loading";
import useRole from "@/hooks/use-role";
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
