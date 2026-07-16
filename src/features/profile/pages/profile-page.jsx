import {
  User,
  Mail,
  ShieldCheck,
  Calendar,
  Clock,
  BadgeCheck,
} from "lucide-react";

import useAuthStore from "@/store/use-auth-store";
import useRole from "@/features/auth/hooks/use-role";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Spinner } from "@/components/ui/spinner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

const roleColors = {
  admin: "bg-red-100 text-red-800 border-red-200",
  librarian: "bg-blue-100 text-blue-800 border-blue-200",
  user: "bg-green-100 text-green-800 border-green-200",
};

export default function ProfilePage() {
  const user = useAuthStore((s) => s.user);
  const authLoading = useAuthStore((s) => s.authLoading);
  const { role, roleLoading } = useRole();

  if (authLoading || roleLoading) {
    return (
      <Container className="py-10 flex items-center justify-center min-h-[50vh]">
        <Spinner className="size-8" />
      </Container>
    );
  }

  const initials = (user?.displayName ?? "U")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const roleLabel =
    role === "admin"
      ? "Admin"
      : role === "librarian"
        ? "Librarian"
        : "User";

  return (
    <Container className="py-10">
      <Heading title="My Profile" subtitle="View your account details" />

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_2fr]">
        <Card>
          <CardContent className="flex flex-col items-center gap-4 pt-0">
            <Avatar className="size-20 mt-[-24px]">
              <AvatarImage src={user?.photoURL} alt={user?.displayName} />
              <AvatarFallback className="text-lg">{initials}</AvatarFallback>
            </Avatar>
            <div className="text-center">
              <h2 className="text-lg font-semibold">{user?.displayName}</h2>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
            </div>
            <Badge
              variant="outline"
              className={roleColors[role] ?? roleColors.user}
            >
              {roleLabel}
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Account Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-lg bg-muted">
                <User className="size-4 text-muted-foreground" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Full Name</p>
                <p className="text-sm font-medium">
                  {user?.displayName ?? "—"}
                </p>
              </div>
            </div>

            <Separator />

            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-lg bg-muted">
                <Mail className="size-4 text-muted-foreground" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Email</p>
                <p className="text-sm font-medium">{user?.email ?? "—"}</p>
              </div>
            </div>

            <Separator />

            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-lg bg-muted">
                <ShieldCheck className="size-4 text-muted-foreground" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Role</p>
                <p className="text-sm font-medium">{roleLabel}</p>
              </div>
            </div>

            <Separator />

            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-lg bg-muted">
                <BadgeCheck className="size-4 text-muted-foreground" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">
                  Email Verified
                </p>
                <p className="text-sm font-medium">
                  {user?.emailVerified ? "Verified" : "Not Verified"}
                </p>
              </div>
            </div>

            <Separator />

            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-lg bg-muted">
                <Calendar className="size-4 text-muted-foreground" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Account Created</p>
                <p className="text-sm font-medium">
                  {user?.metadata?.creationTime
                    ? new Date(user.metadata.creationTime).toLocaleDateString()
                    : "—"}
                </p>
              </div>
            </div>

            <Separator />

            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-lg bg-muted">
                <Clock className="size-4 text-muted-foreground" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">
                  Last Sign In
                </p>
                <p className="text-sm font-medium">
                  {user?.metadata?.lastSignInTime
                    ? new Date(
                        user.metadata.lastSignInTime,
                      ).toLocaleDateString()
                    : "—"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Container>
  );
}
