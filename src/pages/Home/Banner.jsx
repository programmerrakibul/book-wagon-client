import { Link, useNavigate } from "react-router";
import { FaBook, FaArrowRight, FaSearch } from "react-icons/fa";
import Container from "../shared/Container/Container";
import Button from "../../components/Button/Button";

const Banner = () => {
  const navigate = useNavigate();

  return (
    <section className="min-h-[calc(100vh-80px)] flex items-center py-12 sm:py-16 lg:py-20 bg-linear-to-br from-secondary/10 via-primary/10 to-secondary/10">
      <Container>
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          {/* Left Content */}
          <div className="flex-1 text-center lg:text-left space-y-6 sm:space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
              <FaBook className="text-primary text-sm sm:text-base" />
              <span className="text-xs sm:text-sm font-semibold text-primary">
                #1 Online Book Store in Bangladesh
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-800 leading-tight">
              Discover Your Next{" "}
              <span className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
                Great Read
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Explore thousands of books across all genres. From bestsellers to
              hidden gems, find your perfect book and get it delivered to your
              doorstep.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-6 sm:gap-8 py-4">
              <div>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary">
                  10K+
                </div>
                <div className="text-xs sm:text-sm text-gray-600">
                  Books Available
                </div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary">
                  5K+
                </div>
                <div className="text-xs sm:text-sm text-gray-600">
                  Happy Readers
                </div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary">
                  50+
                </div>
                <div className="text-xs sm:text-sm text-gray-600">
                  Categories
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex gap-3 sm:gap-4 justify-center lg:justify-start">
              <Button handleClick={() => navigate("/books")}>
                <FaSearch />
                Browse Books
              </Button>
              <Button handleClick={() => navigate("/about-us")}>
                Learn More
                <FaArrowRight />
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 pt-4 text-xs sm:text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <span className="text-success text-lg">✓</span>
                <span>Fast Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-success text-lg">✓</span>
                <span>Secure Payment</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-success text-lg">✓</span>
                <span>24/7 Support</span>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="flex-1 w-full max-w-lg lg:max-w-none">
            <div className="relative">
              {/* Main Image */}
              <div className="relative z-10">
                <img
                  src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&q=80"
                  alt="Reading books"
                  className="w-full h-64 sm:h-80 lg:h-96 object-cover rounded-2xl shadow-2xl"
                />
                <div className="absolute inset-0 bg-linear-to-t from-primary/20 to-transparent rounded-2xl"></div>
              </div>

              {/* Floating Card */}
              <div className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 bg-base-100 p-3 sm:p-4 rounded-xl shadow-xl z-20 max-w-[200px] sm:max-w-[240px]">
                <div className="flex items-center gap-3">
                  <div className="p-2 sm:p-3 bg-primary/10 rounded-lg">
                    <FaBook className="text-xl sm:text-2xl text-primary" />
                  </div>
                  <div>
                    <div className="text-lg sm:text-xl font-bold text-gray-800">
                      1000+
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600">
                      New Arrivals
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 sm:w-24 sm:h-24 bg-primary/20 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-8 -right-8 w-32 h-32 sm:w-40 sm:h-40 bg-secondary/20 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Banner;
