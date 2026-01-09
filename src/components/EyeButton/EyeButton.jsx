import { FaEye, FaEyeSlash } from "react-icons/fa";

const EyeButton = ({ showPassword, setShowPassword }) => {
  return (
    <>
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-white/40 dark:hover:text-white/60 z-10"
      >
        {showPassword ? (
          <FaEyeSlash className="size-5" />
        ) : (
          <FaEye className="size-5" />
        )}
      </button>
    </>
  );
};

export default EyeButton;
