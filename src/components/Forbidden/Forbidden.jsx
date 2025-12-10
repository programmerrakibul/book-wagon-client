import { FaShieldAlt } from "react-icons/fa";

const Forbidden = () => {
  return (
    <>
      <title>Access Forbidden - BookWagon</title>

      <div className="flex items-center justify-center py-12 sm:py-16 lg:py-20">
      <div className="max-w-2xl mx-auto px-4">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body text-center py-8 sm:py-10 lg:py-12">
            {/* Icon */}
            <div className="relative inline-block mb-4 sm:mb-6">
              <div className="absolute inset-0 bg-error/20 rounded-full blur-xl animate-pulse"></div>
              <div className="relative bg-error/10 p-4 sm:p-6 rounded-full">
                <FaShieldAlt className="text-5xl sm:text-6xl lg:text-7xl text-error" />
              </div>
            </div>

            {/* Error Code */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-error mb-3 sm:mb-4">
              403
            </h1>

            {/* Title */}
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-2 sm:mb-3">
              Access Forbidden
            </h2>

            {/* Description */}
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              You don't have permission to access this resource. Please contact
              an administrator if you believe this is an error.
            </p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Forbidden;
