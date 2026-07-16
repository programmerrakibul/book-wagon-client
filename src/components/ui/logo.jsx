import { Link } from "react-router";
import logo from "../../assets/logo.png";

const Logo = () => {
  return (
    <>
      <Link to="/" className="logo">
        <img src={logo} alt="BookWagon" />
        <span className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
          BookWagon
        </span>
      </Link>
    </>
  );
};

export default Logo;
