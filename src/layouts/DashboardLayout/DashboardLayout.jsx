import logo from "@/assets/logo.png";
import Avatar from "@/components/Avatar/Avatar";
import AvatarDropdown from "@/components/AvatarDropdown/AvatarDropdown";
import useRole from "@/hooks/useRole";
import Container from "@/pages/shared/Container/Container";
import useAuthStore from "@/stores/use-auth-store";
import { useMemo } from "react";
import { FaFileInvoiceDollar, FaHeart, FaUser, FaUsers } from "react-icons/fa";
import { IoLibrary } from "react-icons/io5";
import {
  MdDashboard,
  MdLibraryAdd,
  MdMenu,
  MdShoppingCart,
} from "react-icons/md";
import { Link, NavLink, Outlet } from "react-router";

const DashboardNavSkeleton = () => {
  const skeletonItems = Array.from({ length: 6 });

  return (
    <>
      {skeletonItems.map((_, index) => (
        <li key={index}>
          <div
            className="flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300
                       bg-base-300 dark:bg-neutral-800 animate-pulse"
          >
            {/* Icon Skeleton */}
            <div className="w-8 h-8 rounded-md bg-gray-300 dark:bg-neutral-700 shrink-0" />

            {/* Label Skeleton */}
            <div className="flex-1 space-y-1">
              <div
                className={`h-4 bg-gray-300 dark:bg-neutral-700 rounded w-${[80, 65, 90, 55, 75, 85][index % 6]}%`}
              />
            </div>
          </div>
        </li>
      ))}
    </>
  );
};

const UserProfileSkeleton = () => {
  return (
    <div className="flex items-center gap-3 p-3 rounded-lg bg-linear-to-r from-primary/20 to-secondary/20 animate-pulse">
      {/* Avatar Skeleton */}
      <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-neutral-700 shrink-0" />

      {/* Text Content Skeleton */}
      <div className="flex-1 min-w-0 space-y-2">
        {/* Name Line */}
        <div className="h-4 bg-gray-300 dark:bg-neutral-700 rounded w-3/4" />

        {/* Email Line */}
        <div className="h-3 bg-gray-300 dark:bg-neutral-700 rounded w-5/6" />
      </div>
    </div>
  );
};

const DashboardLayout = () => {
  const user = useAuthStore((s) => s.user);
  const userLoading = useAuthStore((s) => s.authLoading);
  const { role, roleLoading } = useRole();

  const menuItems = useMemo(() => {
    const items = [
      {
        to: "/dashboard",
        label: "Overview",
        icon: <MdDashboard />,
      },
      {
        to: "/dashboard/profile",
        label: "Profile",
        icon: <FaUser />,
      },
    ];

    if (["user", "librarian"].includes(role)) {
      const menu = [
        {
          to: "/dashboard/my-orders",
          label: "My Orders",
          icon: <MdShoppingCart />,
        },
        {
          to: "/dashboard/my-wishlist",
          label: "My Wishlist",
          icon: <FaHeart />,
        },
        {
          to: "/dashboard/invoices",
          label: "Invoices",
          icon: <FaFileInvoiceDollar />,
        },
      ];

      items.splice(1, 0, ...menu);
    }

    if (role === "admin") {
      const adminMenu = [
        {
          to: "/dashboard/manage-books",
          label: "Manage Books",
          icon: <IoLibrary />,
        },
        {
          to: "/dashboard/manage-users",
          label: "Manage Users",
          icon: <FaUsers />,
        },
      ];

      items.splice(1, 0, ...adminMenu);
    }

    if (role === "librarian") {
      const librarianMenu = [
        {
          to: "/dashboard/add-book",
          label: "Add Book",
          icon: <MdLibraryAdd />,
        },
        {
          to: "/dashboard/my-books",
          label: "My Books",
          icon: <IoLibrary />,
        },
        {
          to: "/dashboard/all-orders",
          label: "All Orders",
          icon: <MdShoppingCart />,
        },
      ];

      items.splice(4, 0, ...librarianMenu);
    }

    return items;
  }, [role]);

  return (
    <>
      <title>Dashboard - BookWagon</title>

      <div className="drawer lg:drawer-open">
        <input
          id="dashboard-drawer"
          type="checkbox"
          className="drawer-toggle"
        />

        {/* Main Content */}
        <div className="drawer-content flex flex-col">
          {/* Top Navbar */}
          <nav className="sticky top-0 z-30 bg-base-100 shadow-md">
            <Container>
              <div className="navbar px-0">
                {/* Mobile Menu Button */}
                <div className="flex-none lg:hidden">
                  <label
                    htmlFor="dashboard-drawer"
                    aria-label="open sidebar"
                    className="btn btn-square btn-ghost"
                  >
                    <MdMenu className="text-2xl" />
                  </label>
                </div>

                {/* Title */}
                <div className="flex-1">
                  <h1 className="text-lg sm:text-xl lg:text-2xl font-bold ml-2 lg:ml-0">
                    Dashboard
                  </h1>
                </div>

                {/* Avatar Dropdown */}
                <AvatarDropdown />
              </div>
            </Container>
          </nav>

          {/* Page Content */}
          <main className="flex-1 bg-base-300 min-h-[70dvh]">
            <Outlet />
          </main>
        </div>

        {/* Sidebar */}
        <div className="drawer-side min-h-dvh z-40 backdrop-blur-[2px]">
          <label
            htmlFor="dashboard-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>

          <aside className="flex min-h-full w-64 bg-base-100 flex-col  border-r border-primary/20">
            {/* Logo Section */}
            <div className="sticky top-0 z-50 bg-base-100/80 border-b border-primary/20 px-4 py-3 backdrop-blur-sm">
              <Link to="/" className="flex items-center gap-1 text-neutral">
                <img
                  src={logo}
                  alt="BookWagon"
                  className="size-10 object-cover"
                />
                <span className="text-[23px] font-bold bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent font-['Montserrat_Alternates']">
                  BookWagon
                </span>
              </Link>
            </div>

            {/* Menu Items */}
            <ul className="menu w-full menu-vertical p-4 space-y-2 flex-1">
              {roleLoading ? (
                <DashboardNavSkeleton />
              ) : (
                menuItems.map((item, index) => (
                  <li key={index}>
                    <NavLink
                      to={item.to}
                      end={item.to === "/dashboard"}
                      className="dashboard_nav_links"
                    >
                      <span className="text-xl">{item.icon}</span>
                      <span className="text-sm font-medium">{item.label}</span>
                    </NavLink>
                  </li>
                ))
              )}
            </ul>

            {/* User Card at Bottom */}
            <div className="sticky bottom-0 bg-base-100/40 backdrop-blur-sm border-t border-primary/20 p-4">
              {userLoading ? (
                <UserProfileSkeleton />
              ) : (
                <div className="flex items-center gap-3 p-3 rounded-lg bg-linear-to-r from-primary/20 to-secondary/20">
                  <Avatar src={user?.photoURL} alt={user?.displayName} />

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold truncate">
                      {user?.displayName || "User"}
                    </p>
                    <p className="text-xs truncate">{user?.email}</p>
                  </div>
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
