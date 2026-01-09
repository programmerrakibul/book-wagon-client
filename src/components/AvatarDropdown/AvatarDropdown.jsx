import { FaHome } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import { handleLogout } from "../../utilities/handleLogout";
import { IoLibrary, IoLogOut } from "react-icons/io5";
import { NavLink } from "react-router";
import { HiOutlineUser } from "react-icons/hi";
import { MdLibraryAdd } from "react-icons/md";
import Avatar from "../Avatar/Avatar";

const menuItems = [
  {
    to: "/",
    icon: FaHome,
    label: "Home",
  },
  {
    to: "/dashboard/add-book",
    icon: MdLibraryAdd,
    label: "Add Book",
  },
  {
    to: "/books",
    icon: IoLibrary,
    label: "All Books",
  },
  {
    to: "/dashboard/profile",
    icon: HiOutlineUser,
    label: "Profile",
  },
];

const AvatarDropdown = () => {
  const { user, logOutUser } = useAuth();

  return (
    <>
      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle ">
            <Avatar src={user.photoURL} alt={user.displayName} />
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-1 p-2 shadow-lg bg-base-100 rounded-box w-52 border border-primary/20"
          >
            <li className="menu-title">
              <span className="text-xs text-neutral dark:text-white">Signed in as</span>
            </li>
            <li className="disabled">
              <span className="text-sm font-semibold">{user.displayName}</span>
            </li>
            <div className="divider my-1"></div>
            {menuItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 text-sm transition-colors ${
                      isActive
                        ? "bg-primary/10 text-primary dark:text-primary font-medium"
                        : "hover:bg-base-200 dark:hover:bg-gray-700 text-base-content dark:text-gray-300"
                    }`
                  }
                >
                  <Icon className="size-5 shrink-0" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
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
    </>
  );
};

export default AvatarDropdown;
