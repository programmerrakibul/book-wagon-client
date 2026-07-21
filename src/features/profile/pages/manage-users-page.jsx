import { Users } from "lucide-react";
import { useCallback } from "react";
import { useSearchParams } from "react-router";

import { DataTable } from "@/components/shared/data-table";
import { EmptyState } from "@/components/shared/empty-state";
import { Pagination } from "@/components/shared/pagination";
import { SkeletonLayout } from "@/components/shared/skeleton-layout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useUpdateUserRole,
  useUsers,
} from "@/features/profile/hooks/use-users";
import {
  UserRoleConfig,
  UserRoles,
  getStatusBadge,
} from "@/features/shared/constants/statuses";

function getInitials(name) {
  return (name ?? "U")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export default function ManageUsersPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  const { data, isLoading } = useUsers({ page, limit: 10 });
  const roleMutation = useUpdateUserRole();

  const users = data?.data ?? [];
  const totalPages = data?.pagination?.totalPages ?? 1;

  const handlePageChange = useCallback(
    (p) => setSearchParams({ page: String(p) }),
    [setSearchParams],
  );

  const ROLE_OPTIONS = Object.values(UserRoles).map((r) => ({
    label: r,
    value: r,
  }));

  const columns = [
    {
      key: "avatar",
      header: "Avatar",
      className: "w-[50px]",
      cell: (row) => (
        <Avatar className="size-8">
          <AvatarImage
            src={row.photoUrl}
            alt={row.name}
            referrerPolicy="no-referrer"
          />
          <AvatarFallback>{getInitials(row.name)}</AvatarFallback>
        </Avatar>
      ),
    },
    {
      key: "name",
      header: "Name",
      cell: (row) => <span className="font-medium">{row.name ?? "—"}</span>,
    },
    {
      key: "email",
      header: "Email",
      className: "hidden sm:table-cell",
      cell: (row) => <span className="text-muted-foreground">{row.email}</span>,
    },
    {
      key: "role",
      header: "Role",
      cell: (row) => {
        const rc = getStatusBadge(row.role, UserRoleConfig);
        return (
          <Badge variant="outline" className={rc.className}>
            {rc.label}
          </Badge>
        );
      },
    },
    {
      key: "actions",
      header: "Actions",
      className: "text-right",
      cell: (row) => (
        <div className="flex justify-end">
          <Select
            value={row.role}
            onValueChange={(value) =>
              roleMutation.mutate({ id: row._id, role: value })
            }
            disabled={roleMutation.isPending}
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {ROLE_OPTIONS.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      ),
    },
  ];

  const renderCard = (row) => {
    const rc = getStatusBadge(row.role, UserRoleConfig);
    return (
      <div className="flex items-center gap-4 rounded-xl border bg-card p-4">
        <Avatar className="size-10">
          <AvatarImage
            src={row.photoUrl}
            alt={row.name}
            referrerPolicy="no-referrer"
          />
          <AvatarFallback>{getInitials(row.name)}</AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium">{row.name ?? "—"}</p>
          <p className="truncate text-xs text-muted-foreground">{row.email}</p>
          <div className="mt-1 flex items-center gap-2">
            <Badge variant="outline" className={rc.className}>
              {rc.label}
            </Badge>
          </div>
        </div>
        <Select
          value={row.role}
          onValueChange={(value) =>
            roleMutation.mutate({ id: row._id, role: value })
          }
          disabled={roleMutation.isPending}
        >
          <SelectTrigger className="w-[110px] h-8 text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {ROLE_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    );
  };

  if (isLoading) {
    return (
      <Container className="py-6 sm:py-8 lg:py-10">
        <Heading title="Manage Users" subtitle="Administer user accounts" />
        <div className="mt-6">
          <SkeletonLayout variant="table" count={10} />
        </div>
      </Container>
    );
  }

  if (!users.length) {
    return (
      <Container className="py-6 sm:py-8 lg:py-10">
        <Heading title="Manage Users" subtitle="Administer user accounts" />
        <div className="mt-8">
          <EmptyState
            icon={Users}
            title="No users found"
            description="There are no users to display at this time."
          />
        </div>
      </Container>
    );
  }

  return (
    <>
      <title>Manage Users | BookWagon</title>

      <Container className="py-6 sm:py-8 lg:py-10">
        <Heading title="Manage Users" subtitle="Administer user accounts" />

        <div className="mt-6">
          <DataTable columns={columns} data={users} renderCard={renderCard} />
        </div>

        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </Container>
    </>
  );
}
