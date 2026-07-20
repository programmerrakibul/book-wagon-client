import {
  BadgeCheck,
  Calendar,
  Clock,
  Mail,
  ShieldCheck,
  User,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import useRole from "@/features/auth/hooks/use-role";
import {
  UserRoleConfig,
  getStatusBadge,
} from "@/features/shared/constants/statuses";
import useAuthStore from "@/store/use-auth-store";
import { getInitials } from "@/utils/utils";

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

  const roleBadge = getStatusBadge(role, UserRoleConfig);

  return (
    <>
      <title>My Profile | BookWagon</title>

      <Container className="py-6 sm:py-8 lg:py-10">
        <Heading title="My Profile" subtitle="View your account details" />

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_2fr]">
          <Card>
            <CardContent className="flex flex-col items-center gap-4 pt-0">
              <Avatar className="size-20 mt-[-24px]">
                <AvatarImage src={user?.photoUrl} alt={user?.name} />
                <AvatarFallback className="text-lg">
                  {getInitials(user?.name)}
                </AvatarFallback>
              </Avatar>
              <div className="text-center">
                <h2 className="text-lg font-semibold">{user?.name}</h2>
                <p className="text-sm text-muted-foreground">{user?.email}</p>
              </div>
              <Badge variant="outline" className={roleBadge.className}>
                {roleBadge.label}
              </Badge>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Account Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <DetailRow icon={User} label="Full Name" value={user?.name} />
              <Separator />
              <DetailRow icon={Mail} label="Email" value={user?.email} />
              <Separator />
              <DetailRow
                icon={ShieldCheck}
                label="Role"
                value={roleBadge.label}
              />
              <Separator />
              <DetailRow
                icon={BadgeCheck}
                label="Email Verified"
                value={user?.emailVerified ? "Verified" : "Not Verified"}
              />
              <Separator />
              <DetailRow
                icon={Calendar}
                label="Account Created"
                value={
                  user?.metadata?.creationTime
                    ? new Date(user.metadata.creationTime).toLocaleDateString()
                    : null
                }
              />
              <Separator />
              <DetailRow
                icon={Clock}
                label="Last Sign In"
                value={
                  user?.metadata?.lastSignInTime
                    ? new Date(
                        user.metadata.lastSignInTime,
                      ).toLocaleDateString()
                    : null
                }
              />
            </CardContent>
          </Card>
        </div>
      </Container>
    </>
  );
}

function DetailRow({ icon, label, value }) {
  const Icon = icon;
  return (
    <div className="flex items-center gap-3">
      <div className="flex size-9 items-center justify-center rounded-lg bg-muted">
        <Icon className="size-4 text-muted-foreground" />
      </div>
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm font-medium">{value ?? "—"}</p>
      </div>
    </div>
  );
}
