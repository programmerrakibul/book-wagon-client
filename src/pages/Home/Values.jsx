import { FaAward, FaBook, FaHeart, FaUsers } from "react-icons/fa";
import Container from "../shared/Container/Container";
import Heading from "../../components/Heading/Heading";

const Values = () => {
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

  return (
    <>
      <section>
        <Container>
          <Heading title="Our Values" />

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
        </Container>
      </section>
    </>
  );
};

export default Values;
