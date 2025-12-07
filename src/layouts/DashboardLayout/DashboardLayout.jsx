import { Link, Outlet } from "react-router";
import { MdLibraryAdd } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import logo from "../../assets/logo.png";

const DashboardLayout = () => {
  return (
    <>
      <title>Dashboard - BookWagon</title>

      <div className="drawer lg:drawer-open">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Navbar */}
          <nav className="navbar w-full bg-base-300 px-5">
            <label
              htmlFor="my-drawer-4"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              {/* Sidebar toggle icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2"
                fill="none"
                stroke="currentColor"
                className="my-1.5 inline-block size-4"
              >
                <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
                <path d="M9 4v16"></path>
                <path d="M14 10l2 2l-2 2"></path>
              </svg>
            </label>
            <div className="px-4">Navbar Title</div>
          </nav>
          {/* Page content here */}
          <>
            <Outlet />
          </>
        </div>

        <div className="drawer-side is-drawer-close:overflow-visible">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-20 is-drawer-open:w-64">
            {/* Sidebar content here */}
            <ul className="menu w-full grow is-drawer-close:items-center">
              <li>
                <Link
                  to="/"
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                >
                  <img src={logo} alt="BookWagon" className="max-w-10" />
                  <span className="is-drawer-close:hidden text-2xl font-bold">BookWagon</span>
                </Link>
              </li>

              <li>
                <Link
                  to="/dashboard/add-book"
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Add Book"
                >
                  <span className="text-xl">
                    <MdLibraryAdd />
                  </span>
                  <span className="is-drawer-close:hidden">Add Book</span>
                </Link>
              </li>

              <li>
                <Link
                  to="/dashboard/profile"
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Profile"
                >
                  <span className="text-xl">
                    <FaUser />
                  </span>
                  <span className="is-drawer-close:hidden">Profile</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
