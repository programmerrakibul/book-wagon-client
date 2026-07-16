import { Link } from "react-router";
import { FaArrowLeft } from "react-icons/fa";

const BackButton = ({ to, label = "Back" }) => {
  return (
    <>
      <Link
        to={to || -1}
        aria-label={label}
        className="group flex items-center gap-2 hover:text-primary transition-all duration-300 mb-4 w-fit"
      >
        <FaArrowLeft className="size-4 group-hover:-translate-x-1 transition-transform duration-300" />
        <span className="text-sm font-medium">{label}</span>
      </Link>
    </>
  );
};

export default BackButton;
