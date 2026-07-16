import { useSearchParams } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { ChevronLeft, ChevronRight } from "lucide-react";

import axiosInstance from "@/lib/axios";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Spinner } from "@/components/ui/spinner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

const roleConfig = {
  admin: {
    label: "Admin",
    className: "bg-red-100 text-red-800 border-red-200",
  },
  librarian: {
    label: "Librarian",
    className: "bg-blue-100 text-blue-800 border-blue-200",
  },
  user: {
    label: "User",
    className: "bg-green-100 text-green-800 border-green-200",
  },
};

function useUsers(page) {
  return useQuery({
    queryKey: ["users", page],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/users", {
        params: { page, limit: 10 },
      });
      return data ?? {};
    },
  });
}

export default function ManageUsersPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryClient = useQueryClient();
  const page = Number(searchParams.get("page")) || 1;

  const { data, isLoading } = useUsers(page);

  const users = data?.data ?? [];
  const totalPages = data?.totalPages ?? 1;

  const roleMutation = useMutation({
    mutationFn: ({ id, role }) =>
      axiosInstance.patch(`/users/${id}`, { role }),
    onSuccess: () => {
      toast.success("User role updated");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: () => toast.error("Failed to update user role"),
  });

  if (isLoading) {
    return (
      <Container className="py-10 flex items-center justify-center min-h-[50vh]">
        <Spinner className="size-8" />
      </Container>
    );
  }

  if (!users.length) {
    return (
      <Container className="py-10">
        <Heading title="Manage Users" subtitle="Administer user accounts" />
        <Empty className="mt-8">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </EmptyMedia>
            <EmptyTitle>No users found</EmptyTitle>
            <EmptyDescription>
              There are no users to display at this time.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent />
        </Empty>
      </Container>
    );
  }

  return (
    <Container className="py-10">
      <Heading title="Manage Users" subtitle="Administer user accounts" />

      <div className="mt-6 rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">Avatar</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="hidden sm:table-cell">Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((u) => {
              const rc = roleConfig[u.role] ?? roleConfig.user;
              const initials = (u.displayName ?? u.name ?? "U")
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()
                .slice(0, 2);

              return (
                <TableRow key={u._id}>
                  <TableCell>
                    <Avatar className="size-8">
                      <AvatarImage src={u.photoURL} alt={u.displayName} />
                      <AvatarFallback>{initials}</AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell className="font-medium">
                    {u.displayName ?? u.name ?? "—"}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell text-muted-foreground">
                    {u.email}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={rc.className}>
                      {rc.label}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Select
                      value={u.role}
                      onValueChange={(value) =>
                        roleMutation.mutate({
                          id: u._id,
                          role: value,
                        })
                      }
                    >
                      <SelectTrigger className="w-[120px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="user">User</SelectItem>
                        <SelectItem value="librarian">Librarian</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-center gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={page <= 1}
            onClick={() => setSearchParams({ page: String(page - 1) })}
          >
            <ChevronLeft className="size-4" />
            Previous
          </Button>
          <span className="text-sm text-muted-foreground px-2">
            Page {page} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            disabled={page >= totalPages}
            onClick={() => setSearchParams({ page: String(page + 1) })}
          >
            Next
            <ChevronRight className="size-4" />
          </Button>
        </div>
      )}
    </Container>
  );
}
