import { Link } from "react-router";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaBook,
} from "react-icons/fa";
import Container from "../Container/Container";
import Logo from "../../../components/Logo/Logo";
import { BsTwitterX } from "react-icons/bs";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "Books", path: "/books" },
    { name: "About Us", path: "/about-us" },
    { name: "Contact", path: "/contact-us" },
  ];

  const categories = [
    { name: "Fiction", path: "/books?category=fiction" },
    { name: "Non-Fiction", path: "/books?category=non-fiction" },
    { name: "Science", path: "/books?category=science" },
    { name: "History", path: "/books?category=history" },
  ];

  const socialLinks = [
    { icon: <FaFacebookF />, url: "https://facebook.com", label: "Facebook" },
    { icon: <BsTwitterX />, url: "https://twitter.com", label: "Twitter" },
    { icon: <FaInstagram />, url: "https://instagram.com", label: "Instagram" },
    { icon: <FaLinkedinIn />, url: "https://linkedin.com", label: "LinkedIn" },
  ];

  return (
    <footer className="bg-base-200 mt-auto">
      <Container>
        <div className="py-8 sm:py-12 lg:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10">
            {/* About Section */}
            <div className="space-y-3">
              <Logo />

              <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4">
                Your trusted partner in the world of books. Discover, read, and
                grow with our extensive collection.
              </p>
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="btn btn-circle btn-sm sm:btn-md btn-ghost hover:btn-primary transition-colors"
                  >
                    <span className="text-base sm:text-lg">{social.icon}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-base sm:text-lg font-bold text-gray-800 mb-4">
                Quick Links
              </h4>
              <ul className="space-y-2 sm:space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link.path}
                      className="text-sm sm:text-base text-gray-600 hover:text-primary transition-colors inline-block"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Categories */}
            <div>
              <h4 className="text-base sm:text-lg font-bold text-gray-800 mb-4">
                Categories
              </h4>
              <ul className="space-y-2 sm:space-y-3">
                {categories.map((category, index) => (
                  <li key={index}>
                    <Link
                      to={category.path}
                      className="text-sm sm:text-base text-gray-600 hover:text-primary transition-colors inline-block"
                    >
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-base sm:text-lg font-bold text-gray-800 mb-4">
                Contact Us
              </h4>
              <ul className="space-y-3 sm:space-y-4">
                <li className="flex items-start gap-3">
                  <FaMapMarkerAlt className="text-primary mt-1 shrink-0 text-sm sm:text-base" />
                  <span className="text-sm sm:text-base text-gray-600">
                    123 Library Street, Dhaka 1000, Bangladesh
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <FaPhone className="text-primary shrink-0 text-sm sm:text-base" />
                  <a
                    href="tel:+8801234567890"
                    className="text-sm sm:text-base text-gray-600 hover:text-primary transition-colors"
                  >
                    +880 1234-567890
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <FaEnvelope className="text-primary shrink-0 text-sm sm:text-base" />
                  <a
                    href="mailto:info@bookwagon.com"
                    className="text-sm sm:text-base text-gray-600 hover:text-primary transition-colors"
                  >
                    info@bookwagon.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Container>

      {/* Bottom Bar */}
      <div className="border-t border-base-300">
        <Container>
          <div className="py-4 sm:py-6 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
            <p className="text-xs sm:text-sm text-gray-600 text-center sm:text-left">
              © {currentYear} BookWagon. All rights reserved.
            </p>
            <div className="flex gap-4 sm:gap-6">
              <Link
                to="/privacy-policy"
                className="text-xs sm:text-sm text-gray-600 hover:text-primary transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms-of-service"
                className="text-xs sm:text-sm text-gray-600 hover:text-primary transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;
