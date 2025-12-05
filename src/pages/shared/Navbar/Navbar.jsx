import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import Container from "../Container/Container";
import { Link, NavLink } from "react-router";
import Button from "../../../components/Button/Button";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "Home", slug: "/" },
    { label: "Books", slug: "/books" },
    { label: "Dashboard", slug: "/dashboard" },
    { label: "About Us", slug: "/about-us" },
    { label: "Contact Us", slug: "/contact-us" },
  ];

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
      <nav className="bg-base-100/80 border-b border-base-200/30 shadow-sm">
        <Container>
          {/* Desktop & Mobile layout */}
          <div className="navbar h-16 p-0">
            {/* Logo - Left Side */}
            <div className="navbar-start">
              <Link to="/" className="logo" aria-label="Rakibul - Home">
                BookWagon
              </Link>
            </div>

            {/* Desktop Menu - Center */}
            <div className="navbar-center hidden md:inline-flex">
              <ul className="menu menu-horizontal gap-2">{navLinks}</ul>
            </div>

            {/* Mobile Menu Button & Desktop CTA - Right Side */}
            <div className="navbar-end gap-3">
              {/* Hamburger Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="btn btn-ghost btn-circle md:hidden hover:bg-base-200/50 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/30"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
              </button>

              {/* CTA Button - Desktop Only */}
              <Button className="hidden md:inline-flex">LogIn</Button>
            </div>
          </div>

          {/* Custom Mobile Menu - Smooth Slide Animation */}
          <div
            className={`md:hidden border-t border-base-200/30 overflow-hidden transition-all duration-300 ease-in-out ${
              mobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="bg-base-100/80 backdrop-blur-xl shadow-sm px-4 md:px-6 py-4 space-y-2 border-t border-base-200/30">
              {/* Mobile Nav Links */}
              <div className="space-y-1">
                {navItems.map((item, index) => (
                  <NavLink
                    key={index}
                    to={item.href}
                    onClick={handleNavClick}
                    className="block py-3 px-4 text-base font-medium text-base-content/80 hover:bg-base-200/40 hover:text-primary transition-all duration-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30"
                  >
                    {item.label}
                  </NavLink>
                ))}
              </div>

              {/* Divider */}
              <div className="divider my-2" />

              {/* Mobile CTA */}
              <Button className="btn-block">Get in Touch</Button>
              <p className="text-center text-xs text-base-content/40 pt-2">
                Let&apos;s work together
              </p>
            </div>
          </div>
        </Container>
      </nav>
    </>
  );
};

export default Navbar;
