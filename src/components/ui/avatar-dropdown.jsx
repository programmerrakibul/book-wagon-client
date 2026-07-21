import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useAuthStore, { logoutUser } from "@/store/use-auth-store";
import {
  BookIcon,
  HomeIcon,
  LayoutDashboardIcon,
  LogOutIcon,
  UserIcon,
} from "lucide-react";
import { Link, useLocation } from "react-router";

function AvatarDropdown() {
  const user = useAuthStore((s) => s.user);
  const { pathname } = useLocation();

  if (!user) return null;

  const initials = (user.name || user.email || "U")
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const linkClasses = "flex items-center gap-2 w-full";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none">
        <Avatar className="size-8">
          <AvatarImage
            src={user.photoUrl}
            alt={user.name}
            referrerPolicy="no-referrer"
          />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <p className="text-sm font-medium">{user.name}</p>
          <p className="text-xs text-muted-foreground">{user.email}</p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        {pathname.startsWith("/dashboard") ? (
          <>
            <DropdownMenuItem>
              <Link to="/" className={linkClasses}>
                <HomeIcon />
                Home
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link to="/books" className={linkClasses}>
                <BookIcon />
                All Books
              </Link>
            </DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuItem>
              <Link to="/dashboard" className={linkClasses}>
                <LayoutDashboardIcon />
                Dashboard
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link to="/dashboard/profile" className={linkClasses}>
                <UserIcon />
                Profile
              </Link>
            </DropdownMenuItem>
          </>
        )}

        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive" onClick={() => logoutUser()}>
          <LogOutIcon />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export { AvatarDropdown };
