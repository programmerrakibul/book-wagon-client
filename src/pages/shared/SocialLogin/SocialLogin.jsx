import { FcGoogle } from "react-icons/fc";

const SocialLogin = ({ onClick, disabled = false }) => {
  return (
    <>
      <div>
        <div className="divider text-gray-500 text-sm">OR</div>

        <button
          type="button"
          onClick={onClick}
          disabled={disabled}
          className="btn btn-block bg-white text-gray-700 border-2 border-gray-300 hover:bg-gray-50 hover:border-gray-400 hover:shadow-md transition-all duration-200 font-medium"
        >
          <span className="text-base md:text-xl">
            <FcGoogle />
          </span>
          <span>Continue with Google</span>
        </button>
      </div>
    </>
  );
};

export default SocialLogin;
