import { Link } from "react-router";

import logo from "@/assets/logo.png";
import { cn } from "@/utils/utils";

function Logo({ className }) {
  return (
    <Link to="/" className={cn("inline-flex items-center gap-2", className)}>
      <img src={logo} alt="BookWagon" className="h-8 w-auto" />
    </Link>
  );
}

export { Logo };
