import { FaBook, FaUsers, FaHeart, FaAward } from "react-icons/fa";
import { MdLibraryBooks } from "react-icons/md";
import Container from "../shared/Container/Container";
import Heading from "../../components/Heading/Heading";
import ourStoryImg from "../../assets/our_story.png";
import missionImg from "../../assets/mission.png";
import visionImg from "../../assets/vision.png";

const AboutUs = () => {
  const stats = [
    { icon: <FaBook />, value: "10,000+", label: "Books Available" },
    { icon: <FaUsers />, value: "5,000+", label: "Active Members" },
    { icon: <MdLibraryBooks />, value: "50+", label: "Categories" },
    { icon: <FaAward />, value: "15+", label: "Years of Service" },
  ];

  const values = [
    {
      icon: <FaBook />,
      title: "Quality Collection",
      description:
        "Curated selection of books across all genres and categories for every reader.",
    },
    {
      icon: <FaUsers />,
      title: "Community Focused",
      description:
        "Building a community of book lovers who share knowledge and passion for reading.",
    },
    {
      icon: <FaHeart />,
      title: "Customer First",
      description:
        "Your satisfaction is our priority. We're here to help you find your next great read.",
    },
    {
      icon: <FaAward />,
      title: "Excellence",
      description:
        "Committed to providing the best service and maintaining high standards.",
    },
  ];

  const missionVision = [
    {
      title: "Our Mission",
      description:
        "To foster a love of reading and learning by providing access to a diverse collection of books, creating a welcoming environment for all, and building a community where knowledge and ideas can flourish.",
      image: missionImg,
      gradient: "from-primary/10 to-primary/5",
      border: "border-primary/20",
    },
    {
      title: "Our Vision",
      description:
        "To be the leading library that inspires lifelong learning, promotes literacy, and serves as a cornerstone of our community, making quality literature accessible to everyone.",
      image: visionImg,
      gradient: "from-secondary/10 to-secondary/5",
      border: "border-secondary/20",
    },
  ];

  return (
    <>
      <title>About Us - BookWagon</title>

      <section className="py-8 sm:py-12 lg:py-16 bg-linear-to-br from-secondary/5 via-primary/5 to-secondary/5">
        <Container>
          {/* Hero Section */}
          <Heading
            title="About BookWagon"
            subtitle="Your trusted partner in the world of books, connecting readers
              with stories that inspire, educate, and entertain."
          />

          {/* Our Story with Image */}
          <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-12 mb-8 sm:mb-12 lg:mb-16">
            {/* Image */}
            <div className="flex-1">
              <img
                src={ourStoryImg}
                alt="Library"
                className="w-full h-full object-cover rounded-2xl shadow-xl"
              />
            </div>

            {/* Story Content */}
            <div className="flex-1 flex flex-col justify-center">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6">
                Our Story
              </h2>
              <div className="space-y-4 sm:space-y-6 text-sm sm:text-base lg:text-lg">
                <p>
                  Founded in 2010, BookWagon began with a simple mission: to
                  make quality books accessible to everyone. What started as a
                  small neighborhood library has grown into a thriving community
                  of book lovers, serving thousands of readers across the
                  region.
                </p>
                <p>
                  We believe that books have the power to transform lives,
                  broaden perspectives, and connect people across cultures and
                  generations. Our carefully curated collection spans fiction,
                  non-fiction, academic texts, and everything in between,
                  ensuring there's something for every reader.
                </p>
                <p>
                  Today, BookWagon stands as more than just a library – we're a
                  community hub where ideas flourish, knowledge is shared, and
                  the love of reading is celebrated every day.
                </p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12 lg:mb-16">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="card bg-linear-to-br from-primary/10 to-secondary/10 border border-primary/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="card-body p-4 sm:p-6 text-center">
                  <div className="text-3xl sm:text-4xl lg:text-5xl text-primary mb-2 sm:mb-3">
                    {stat.icon}
                  </div>
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm lg:text-base font-medium">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Our Values */}
          <div className="mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-8 sm:mb-12">
              Our Values
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="card-body p-6 sm:p-8">
                    <div className="flex items-start gap-4">
                      <div className="p-3 sm:p-4 bg-primary/10 rounded-full shrink-0">
                        <div className="text-2xl sm:text-3xl text-primary">
                          {value.icon}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2 sm:mb-3">
                          {value.title}
                        </h3>
                        <p className="text-sm sm:text-base">
                          {value.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mission & Vision */}
          <div className="flex flex-col md:flex-row gap-6 sm:gap-8">
            {missionVision.map((item, index) => (
              <div
                key={index}
                className={`flex-1 card bg-linear-to-br ${item.gradient} border ${item.border} shadow-xl overflow-hidden`}
              >
                <figure className="h-48 sm:h-56">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </figure>
                <div className="card-body p-6 sm:p-8">
                  <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">
                    {item.title}
                  </h2>
                  <p className="text-sm sm:text-base lg:text-lg leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
};

export default AboutUs;
