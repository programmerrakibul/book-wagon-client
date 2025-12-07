import { Link } from "react-router";
import logo from "../../assets/logo.png";

const Logo = () => {
  return (
    <>
      <Link to="/" className="logo">
        <img src={logo} alt="BookWagon" />
      </Link>
    </>
  );
};

export default Logo;
