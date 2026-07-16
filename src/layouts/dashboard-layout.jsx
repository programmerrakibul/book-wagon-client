import logo from "@/assets/logo.png";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AvatarDropdown } from "@/components/ui/avatar-dropdown";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import useRole from "@/features/auth/hooks/use-role";
import useAuthStore from "@/store/use-auth-store";
import { useUiStore } from "@/store/use-ui-store";
import { cn } from "@/utils/utils";
import {
  BookMarked,
  BookOpen,
  Heart,
  LayoutDashboard,
  Menu,
  Plus,
  Receipt,
  ShoppingCart,
  User,
  Users,
} from "lucide-react";
import { useMemo } from "react";
import { Link, NavLink, Outlet } from "react-router";

const navLinkClass = ({ isActive }) =>
  cn(
    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
    isActive
      ? "bg-primary text-primary-foreground"
      : "text-muted-foreground hover:bg-muted hover:text-foreground",
  );

function SidebarNav({ onNavClick }) {
  const user = useAuthStore((s) => s.user);
  const { role, roleLoading } = useRole();

  const menuItems = useMemo(() => {
    const items = [
      { to: "/dashboard", label: "Overview", icon: LayoutDashboard },
      { to: "/dashboard/profile", label: "Profile", icon: User },
    ];

    if (["user", "librarian"].includes(role)) {
      items.splice(
        1,
        0,
        { to: "/dashboard/my-orders", label: "My Orders", icon: ShoppingCart },
        { to: "/dashboard/my-wishlist", label: "My Wishlist", icon: Heart },
        { to: "/dashboard/invoices", label: "Invoices", icon: Receipt },
      );
    }

    if (role === "admin") {
      items.splice(
        1,
        0,
        {
          to: "/dashboard/manage-books",
          label: "Manage Books",
          icon: BookOpen,
        },
        { to: "/dashboard/manage-users", label: "Manage Users", icon: Users },
      );
    }

    if (role === "librarian") {
      items.splice(
        4,
        0,
        { to: "/dashboard/add-book", label: "Add Book", icon: Plus },
        { to: "/dashboard/my-books", label: "My Books", icon: BookMarked },
        {
          to: "/dashboard/all-orders",
          label: "All Orders",
          icon: ShoppingCart,
        },
      );
    }

    return items;
  }, [role]);

  return (
    <aside className="flex h-full flex-col border-r bg-background">
      <div className="flex h-14 items-center border-b px-4">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="BookWagon" className="h-8" />
          <span className="text-base sm:text-lg font-bold">BookWagon</span>
        </Link>
      </div>

      <Separator />

      <ScrollArea className="flex-1 px-3 py-2">
        <nav className="flex flex-col gap-1">
          {roleLoading
            ? Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-9 w-full" />
              ))
            : menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.to === "/dashboard"}
                    className={navLinkClass}
                    onClick={onNavClick}
                  >
                    <Icon className="size-4 shrink-0" />
                    {item.label}
                  </NavLink>
                );
              })}
        </nav>
      </ScrollArea>

      <Separator />

      <div className="p-3">
        <div className="flex items-center gap-3 rounded-lg bg-muted/50 p-3">
          <Avatar className="size-9">
            <AvatarImage
              src={user?.photoURL}
              alt={user?.displayName || "User"}
            />
            <AvatarFallback>
              {(user?.displayName || user?.email || "U")
                .split(" ")
                .map((w) => w[0])
                .join("")
                .slice(0, 2)
                .toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium">
              {user?.displayName || "User"}
            </p>
            <p className="truncate text-xs text-muted-foreground">
              {user?.email}
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}

const DashboardLayout = () => {
  const sidebarOpen = useUiStore((s) => s.sidebarOpen);
  const setSidebarOpen = useUiStore((s) => s.setSidebarOpen);

  return (
    <div className="flex min-h-dvh">
      {/* Desktop sidebar */}
      <aside className="hidden lg:fixed lg:inset-y-0 lg:z-30 lg:flex lg:w-64 lg:flex-col">
        <SidebarNav />
      </aside>

      {/* Mobile sheet sidebar */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="fixed left-3 top-3 z-40 lg:hidden"
          >
            <Menu className="size-5" />
            <span className="sr-only">Open sidebar</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <SidebarNav onNavClick={() => setSidebarOpen(false)} />
        </SheetContent>
      </Sheet>

      {/* Main content area */}
      <div className="flex flex-1 flex-col lg:pl-64">
        {/* Top navbar */}
        <header className="sticky top-0 z-20 flex h-14 items-center border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 px-4">
          <div className="hidden lg:flex lg:flex-1" />

          <div className="flex flex-1 items-center lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="size-5" />
              <span className="sr-only">Open sidebar</span>
            </Button>
          </div>

          <div className="flex flex-1 items-center justify-end gap-2">
            <AvatarDropdown />
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 bg-muted/30">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
