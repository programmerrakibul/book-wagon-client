import useRole from "@/features/auth/hooks/use-role";
import { Spinner } from "@/components/ui/spinner";
import AdminOverview from "@/features/dashboard/components/admin-overview";
import LibrarianOverview from "@/features/dashboard/components/librarian-overview";
import UserOverview from "@/features/dashboard/components/user-overview";

export default function OverviewPage() {
  const { role, roleLoading } = useRole();

  if (roleLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Spinner className="size-8" />
      </div>
    );
  }

  if (role === "admin") return <AdminOverview />;
  if (role === "librarian") return <LibrarianOverview />;
  return <UserOverview />;
}
