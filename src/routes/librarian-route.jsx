import { Forbidden } from "@/components/ui/forbidden";
import { Loading } from "@/components/ui/loading";
import useRole from "@/features/auth/hooks/use-role";
import { UserRoles } from "@/features/shared/constants/statuses";
import useAuthStore from "@/store/use-auth-store";

const LibrarianRoute = ({ children }) => {
  const user = useAuthStore((s) => s.user);
  const { role, roleLoading } = useRole();

  if (roleLoading) {
    return <Loading />;
  }

  if (!user || role !== UserRoles.LIBRARIAN) {
    return <Forbidden />;
  }

  return children;
};

export default LibrarianRoute;
