import { Link, useNavigate } from "react-router";
import { FaHome, FaArrowLeft, FaExclamationTriangle } from "react-icons/fa";
import Container from "../shared/Container/Container";
import Button from "../../components/Button/Button";

const Error = () => {
  const navigate = useNavigate();

  return (
    <>
      <title>404 - Page Not Found</title>

      <section className="min-h-screen flex items-center justify-center bg-linear-to-br from-secondary/5 via-primary/5 to-secondary/5 py-8 sm:py-12 lg:py-16">
        <Container>
          <div className="flex flex-col items-center text-center">
            {/* Error Icon */}
            <div className="relative mb-6 sm:mb-8">
              <div className="w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 bg-primary/10 rounded-full flex items-center justify-center">
                <FaExclamationTriangle className="text-5xl sm:text-6xl lg:text-7xl text-primary" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 sm:w-10 sm:h-10 bg-error rounded-full flex items-center justify-center animate-pulse">
                <span className="text-white font-bold text-sm sm:text-base">
                  !
                </span>
              </div>
            </div>

            {/* Error Code */}
            <h1 className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-bold mb-4 sm:mb-6">
              404
            </h1>

            {/* Error Message */}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-3 sm:mb-4">
              Oops! Page Not Found
            </h2>

            <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-2xl mb-8 sm:mb-10 lg:mb-12 leading-relaxed px-4">
              The page you're looking for doesn't exist or has been moved. Don't
              worry, even the best readers sometimes lose their place. Let's get
              you back on track!
            </p>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 sm:gap-4 px-4 sm:px-0">
              <Button handleClick={() => navigate(-1)}>
                <FaArrowLeft />
                Go Back
              </Button>
              <Button handleClick={() => navigate("/")}>
                <FaHome />
                Back to Home
              </Button>
            </div>

            {/* Helpful Links */}
            <div className="mt-12 sm:mt-16 lg:mt-20">
              <p className="text-xs sm:text-sm text-gray-500 mb-4">
                Looking for something specific?
              </p>
              <div className="flex flex-wrap justify-center gap-3 sm:gap-4 lg:gap-6">
                <Link
                  to="/books"
                  className="text-xs sm:text-sm lg:text-base text-primary hover:text-primary/80 font-medium transition-colors"
                >
                  Browse Books
                </Link>
                <span className="text-gray-300">|</span>
                <Link
                  to="/about-us"
                  className="text-xs sm:text-sm lg:text-base text-primary hover:text-primary/80 font-medium transition-colors"
                >
                  About Us
                </Link>
                <span className="text-gray-300">|</span>
                <Link
                  to="/contact-us"
                  className="text-xs sm:text-sm lg:text-base text-primary hover:text-primary/80 font-medium transition-colors"
                >
                  Contact Support
                </Link>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="mt-12 sm:mt-16 flex gap-2 sm:gap-3">
              <div
                className="w-2 h-2 sm:w-3 sm:h-3 bg-primary rounded-full animate-bounce"
                style={{ animationDelay: "0ms" }}
              ></div>
              <div
                className="w-2 h-2 sm:w-3 sm:h-3 bg-secondary rounded-full animate-bounce"
                style={{ animationDelay: "150ms" }}
              ></div>
              <div
                className="w-2 h-2 sm:w-3 sm:h-3 bg-primary rounded-full animate-bounce"
                style={{ animationDelay: "300ms" }}
              ></div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default Error;
