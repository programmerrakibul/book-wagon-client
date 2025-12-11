import { Link, NavLink, Outlet } from "react-router";
import {
  MdLibraryAdd,
  MdDashboard,
  MdMenu,
  MdShoppingCart,
} from "react-icons/md";
import {
  FaUser,
  FaBook,
  FaHome,
  FaUsers,
  FaFileInvoiceDollar,
  FaHeart,
} from "react-icons/fa";
import { IoLibrary, IoLogOut } from "react-icons/io5";
import logo from "../../assets/logo.png";
import useAuth from "../../hooks/useAuth";
import { handleLogout } from "../../utilities/handleLogout";
import Avatar from "../../components/Avatar/Avatar";
import Container from "../../pages/shared/Container/Container";
import useRole from "../../hooks/useRole";
import Loading from "../../components/Loading/Loading";

const DashboardLayout = () => {
  const { user, logOutUser } = useAuth();
  const { role, roleLoading } = useRole();

  if (roleLoading) {
    return <Loading />;
  }

  const menuItems = [
    {
      to: "/dashboard",
      label: "Overview",
      icon: <MdDashboard />,
    },
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

    {
      to: "/dashboard/profile",
      label: "Profile",
      icon: <FaUser />,
    },
  ];

  if (role === "admin") {
    const admin = [
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

    menuItems.splice(3, 0, ...admin);
  }

  if (role === "librarian") {
    const librarian = [
      {
        to: "/dashboard/all-orders",
        label: "All Orders",
        icon: <MdShoppingCart />,
      },
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
    ];

    menuItems.splice(3, 0, ...librarian);
  }

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
                  <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 ml-2 lg:ml-0">
                    Dashboard
                  </h1>
                </div>

                {/* User Info */}
                <div className="flex-none">
                  <div className="dropdown dropdown-end">
                    <label
                      tabIndex={0}
                      className="btn btn-ghost btn-circle avatar"
                    >
                      <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                        <img src={user.photoURL} alt={user.displayName} />
                      </div>
                    </label>
                    <ul
                      tabIndex={0}
                      className="menu menu-sm dropdown-content mt-3 z-1 p-2 shadow-lg bg-base-100 rounded-box w-52 border border-primary/20"
                    >
                      <li className="menu-title">
                        <span className="text-xs text-gray-600">
                          Signed in as
                        </span>
                      </li>
                      <li className="disabled">
                        <span className="text-sm font-semibold">
                          {user.displayName}
                        </span>
                      </li>
                      <div className="divider my-1"></div>
                      <li>
                        <Link to="/" className="text-sm">
                          <FaHome /> Home
                        </Link>
                      </li>
                      <li>
                        <Link to="/books" className="text-sm">
                          <FaBook /> All Books
                        </Link>
                      </li>
                      <div className="divider my-1"></div>
                      <li>
                        <button
                          onClick={() => handleLogout(logOutUser)}
                          className="text-error text-sm"
                        >
                          <IoLogOut /> Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </Container>
          </nav>

          {/* Page Content */}
          <main className="flex-1 bg-base-200 min-h-[70dvh]">
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
                <span className="text-[23px] font-bold">BookWagon</span>
              </Link>
            </div>

            {/* Menu Items */}
            <ul className="menu w-full menu-vertical p-4 space-y-2 flex-1">
              {menuItems.map((item, index) => (
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
              ))}
            </ul>

            {/* User Card at Bottom */}
            <div className="sticky bottom-0 bg-base-100/40 backdrop-blur-sm border-t border-primary/20 p-4">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-linear-to-r from-primary/20 to-secondary/20">
                <Avatar src={user?.photoURL} alt={user?.displayName} />

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold truncate">
                    {user?.displayName || "User"}
                  </p>
                  <p className="text-xs text-gray-600 truncate">
                    {user?.email}
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
