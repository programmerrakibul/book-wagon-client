import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router";

const BackButton = ({ to = 1, label = "Back" }) => {
  return (
    <>
      <Link
        to={to}
        className="group flex items-center gap-2 hover:text-primary transition-all duration-300 mb-4 w-fit"
      >
        <FaArrowLeft className="size-4 group-hover:-translate-x-1 transition-transform duration-300" />
        <span className="text-sm font-medium">{label}</span>
      </Link>
    </>
  );
};

export default BackButton;
