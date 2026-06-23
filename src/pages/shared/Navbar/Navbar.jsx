import Avatar from "@/components/Avatar/Avatar";
import AvatarDropdown from "@/components/AvatarDropdown/AvatarDropdown";
import Button from "@/components/Button/Button";
import Logo from "@/components/Logo/Logo";
import useTheme from "@/hooks/useTheme";
import Container from "@/pages/shared/Container/Container";
import useAuthStore from "@/stores/useAuthStore";
import { handleLogout } from "@/utilities/handleLogout";
import { useState } from "react";
import { FiSun } from "react-icons/fi";
import { HiMenu, HiX } from "react-icons/hi";
import { IoMoonOutline } from "react-icons/io5";
import { LuLoader, LuLogIn, LuLogOut } from "react-icons/lu";
import { NavLink, useNavigate } from "react-router";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isLoading = useAuthStore((s) => s.state.loading.authLoading);
  const user = useAuthStore((s) => s.state.user);

  const navItems = [
    { label: "Home", slug: "/" },
    { label: "Books", slug: "/books" },
    { label: "About Us", slug: "/about-us" },
    { label: "Contact Us", slug: "/contact-us" },
  ];

  if (user) {
    const dashboard = { label: "Dashboard", slug: "/dashboard" };
    navItems.splice(2, 0, dashboard);
  }

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  const navLinks = navItems.map((item, index) => (
    <li key={index}>
      <NavLink to={item.slug} className="nav_links">
        {item.label}
      </NavLink>
    </li>
  ));

  return (
    <>
      <nav className="bg-base-100/40 backdrop-blur-sm border-b border-base-200/30 shadow-sm">
        <Container>
          {/* Desktop & Mobile layout */}
          <div className="navbar px-0 py-2">
            {/* Logo - Left Side */}
            <div className="navbar-start">
              <Logo />
            </div>

            {/* Desktop Menu - Center */}
            <div className="navbar-center hidden lg:inline-flex">
              <ul className="menu py-0 menu-horizontal gap-2">{navLinks}</ul>
            </div>

            {/* Mobile Menu Button & Desktop CTA - Right Side */}
            <div className="navbar-end gap-3">
              <label className="swap swap-rotate">
                {/* this hidden checkbox controls the state */}
                <input
                  onChange={toggleTheme}
                  type="checkbox"
                  checked={theme === "dark"}
                />

                {/* sun icon */}
                <FiSun className="size-7 lg:size-8 swap-off" />

                {/* moon icon */}
                <IoMoonOutline className="swap-on size-7 lg:size-8" />
              </label>

              {/* Hamburger Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="btn btn-ghost text-3xl! btn-circle lg:hidden hover:bg-base-200/50 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/30"
                aria-label="Toggle navigate menu"
              >
                {mobileMenuOpen ? <HiX /> : <HiMenu />}
              </button>

              {/* Desktop Auth Section */}
              {isLoading ? (
                <span>
                  <LuLoader className="animate-spin" size={32} />
                </span>
              ) : user ? (
                <div className="hidden lg:flex items-center gap-3">
                  <AvatarDropdown />

                  <Button onClick={handleLogout}>
                    <LuLogOut />
                    <span>Logout</span>
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={() => navigate("/auth/login")}
                  className="hidden md:inline-flex"
                >
                  <LuLogIn />
                  <span>Login</span>
                </Button>
              )}
            </div>
          </div>

          {/* Custom Mobile Menu - Smooth Slide Animation */}
          <div
            className={`lg:hidden border-t border-base-100/40 backdrop-blur-sm overflow-hidden transition-all duration-300 ease-in-out ${
              mobileMenuOpen ? "max-h-[490px] opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="bg-base-100/40 backdrop-blur-sm shadow-sm px-4 md:px-6 py-4 space-y-2 border-t border-base-100/40">
              {/* Mobile Nav Links */}
              <div className="space-y-1">
                {navItems.map((item, index) => (
                  <NavLink
                    key={index}
                    to={item.slug}
                    onClick={handleNavClick}
                    className="block py-3 px-4 text-base font-medium text-base-content/80 hover:bg-base-200/40 hover:text-primary transition-all duration-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30"
                  >
                    {item.label}
                  </NavLink>
                ))}
              </div>

              {/* Divider */}
              <div className="divider my-2" />

              {/* Mobile Auth Section */}
              {user ? (
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <div className="flex items-center gap-3 p-3 bg-base-200/40 rounded-lg">
                    <Avatar
                      src={user.photoURL}
                      alt={user.displayName}
                      size="size-12"
                    />

                    <div>
                      <p className="font-semibold text-sm">
                        {user.displayName || "User"}
                      </p>
                      <p className="text-xs text-base-content/60">
                        {user.email}
                      </p>
                    </div>
                  </div>

                  <Button onClick={handleLogout}>
                    <LuLogOut />
                    <span>Logout</span>
                  </Button>
                </div>
              ) : (
                <>
                  <Button
                    onClick={() => navigate("/auth/login")}
                    className="btn-block"
                  >
                    <LuLogIn />
                    <span>Login</span>
                  </Button>
                  <p className="text-center text-xs text-base-content/40 pt-2">
                    Let&apos;s read together
                  </p>
                </>
              )}
            </div>
          </div>
        </Container>
      </nav>
    </>
  );
};

export default Navbar;
