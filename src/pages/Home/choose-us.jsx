import {
  FaShippingFast,
  FaShieldAlt,
  FaHeadset,
  FaBook,
  FaTags,
  FaHeart,
} from "react-icons/fa";
import Container from "../shared/Container/Container";
import Heading from "../../components/Heading/Heading";
import chooseUsImg from "../../assets/choose_us.png";

const ChooseUs = () => {
  const features = [
    {
      icon: <FaBook />,
      title: "Vast Collection",
      description:
        "Access to thousands of books across all genres and categories for every reader.",
    },
    {
      icon: <FaTags />,
      title: "Best Prices",
      description:
        "Competitive pricing with regular discounts and special offers on your favorite books.",
    },
    {
      icon: <FaShippingFast />,
      title: "Fast Delivery",
      description:
        "Quick and reliable delivery service to get your books to you as soon as possible.",
    },
    {
      icon: <FaShieldAlt />,
      title: "Secure Payment",
      description:
        "Safe and secure payment options with multiple payment methods for your convenience.",
    },
    {
      icon: <FaHeadset />,
      title: "24/7 Support",
      description:
        "Dedicated customer support team ready to assist you anytime, anywhere.",
    },
    {
      icon: <FaHeart />,
      title: "Quality Assured",
      description:
        "Carefully curated collection ensuring only the best quality books for our readers.",
    },
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <Container>
        <Heading
          title="Why Choose BookWagon"
          subtitle="Discover what makes us the best choice for all your reading needs"
          size="large"
        />

        <div className="flex flex-col xl:flex-row gap-8 lg:gap-12 items-center">
          {/* Image */}
          <div className="flex-1 w-full">
            <div className="relative">
              <img
                src={chooseUsImg}
                alt="Books"
                className="w-full h-64 sm:h-80 lg:h-96 xl:h-fit object-cover rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-linear-to-t from-primary/20 to-transparent rounded-2xl"></div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="flex-1 w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="card bg-base-100 border border-base-300 hover:border-primary hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="card-body p-4 sm:p-5">
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className="p-2 sm:p-3 bg-primary/10 rounded-lg group-hover:bg-primary group-hover:text-white transition-colors shrink-0">
                        <div className="text-xl sm:text-2xl text-primary group-hover:text-white transition-colors">
                          {feature.icon}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-base sm:text-lg font-bold mb-1 sm:mb-2">
                          {feature.title}
                        </h3>
                        <p className="text-xs sm:text-sm">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ChooseUs;
