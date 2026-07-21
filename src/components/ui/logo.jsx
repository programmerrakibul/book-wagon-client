import logo from "@/assets/logo.png";
import { Link } from "react-router";

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2">
      <img src={logo} alt="BookWagon" className="h-8" />
      <span className="text-lg font-bold">
        BookWagon
      </span>
    </Link>
  );
}

export { Logo };
