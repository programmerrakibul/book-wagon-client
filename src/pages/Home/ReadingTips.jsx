import {
  FaLightbulb,
  FaBookOpen,
  FaClock,
  FaEye,
  FaBrain,
  FaBookmark,
  FaHeadphones,
  FaPenAlt,
  FaCoffee,
  FaStar,
} from "react-icons/fa";
import Container from "../shared/Container/Container";
import Heading from "../../components/Heading/Heading";

const ReadingTips = () => {
  const tips = [
    {
      icon: <FaClock />,
      title: "Set a Reading Schedule",
      description:
        "Dedicate 20-30 minutes daily at the same time to build a consistent reading habit.",
      category: "Habit",
      color: "primary",
    },
    {
      icon: <FaEye />,
      title: "Proper Lighting",
      description:
        "Read in well-lit areas to reduce eye strain. Natural light is best during the day.",
      category: "Health",
      color: "secondary",
    },
    {
      icon: <FaBookOpen />,
      title: "Active Reading",
      description:
        "Engage with the text by asking questions and summarizing key points.",
      category: "Technique",
      color: "accent",
    },
    {
      icon: <FaBookmark />,
      title: "Use Bookmarks",
      description:
        "Mark interesting passages or quotes to revisit later for reflection.",
      category: "Tools",
      color: "info",
    },
    {
      icon: <FaBrain />,
      title: "Take Breaks",
      description:
        "Follow the 20-20-20 rule: every 20 minutes, look at something 20 feet away for 20 seconds.",
      category: "Health",
      color: "success",
    },
    {
      icon: <FaHeadphones />,
      title: "Try Audiobooks",
      description:
        "Listen during commutes or chores. It's a great way to 'read' while multitasking.",
      category: "Alternative",
      color: "warning",
    },
    {
      icon: <FaPenAlt />,
      title: "Keep a Reading Journal",
      description:
        "Write down thoughts, favorite quotes, and lessons learned from each book.",
      category: "Reflection",
      color: "error",
    },
    {
      icon: <FaStar />,
      title: "Set Realistic Goals",
      description:
        "Start with small, achievable targets like 1 book per month, then gradually increase.",
      category: "Motivation",
      color: "secondary",
    },
  ];

  return (
    <>
      <title>Reading Tips - BookWagon</title>

      <section>
        <Container>
          {/* Header */}
          <Heading
            title="Enhance Your Reading Experience"
            subtitle="Discover practical tips and techniques to make your reading more enjoyable, effective, and rewarding."
          />

          {/* Tips Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {tips.map((tip, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-xl bg-base-200 dark:bg-base-100 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1"
              >
                <div className="relative p-5 sm:p-6">
                  {/* Icon with Background */}
                  <div
                    className={`w-12 h-12 rounded-xl bg-${tip.color}/10 text-${tip.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <span className="text-xl">{tip.icon}</span>
                  </div>

                  {/* Category Badge */}
                  <div className="inline-block mb-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium bg-${tip.color}/10 text-${tip.color}`}
                    >
                      {tip.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold mb-3 group-hover:text-primary transition-colors duration-300">
                    {tip.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm mb-4">{tip.description}</p>

                  {/* Bottom Info */}
                  <span className="text-xs pt-4 border-t border-base-300 dark:border-base-400 block">
                    Tip #{String(index + 1).padStart(2, "0")}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Key Benefits Section */}
          <div className="mt-12 sm:mt-16 bg-linear-to-br from-primary/5 to-secondary/5 rounded-2xl p-6 sm:p-8">
            <div className="max-w-3xl mx-auto text-center">
              <h3 className="text-2xl font-bold mb-6">
                Benefits of Effective Reading
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="bg-base-100 rounded-xl p-5 shadow-sm">
                  <div className="w-10 h-10 rounded-lg bg-success/10 text-success flex items-center justify-center mx-auto mb-4">
                    <FaBrain />
                  </div>
                  <h4 className="font-bold mb-2">Cognitive Enhancement</h4>
                  <p className="text-sm">
                    Improves memory, focus, and critical thinking skills
                  </p>
                </div>

                <div className="bg-base-100 rounded-xl p-5 shadow-sm">
                  <div className="w-10 h-10 rounded-lg bg-info/10 text-info flex items-center justify-center mx-auto mb-4">
                    <FaBookOpen />
                  </div>
                  <h4 className="font-bold mb-2">Knowledge Expansion</h4>
                  <p className="text-sm">
                    Broadens perspectives and increases vocabulary
                  </p>
                </div>

                <div className="bg-base-100 rounded-xl p-5 shadow-sm">
                  <div className="w-10 h-10 rounded-lg bg-warning/10 text-warning flex items-center justify-center mx-auto mb-4">
                    <FaClock />
                  </div>
                  <h4 className="font-bold mb-2">Stress Reduction</h4>
                  <p className="text-sm">
                    Calms the mind and provides mental relaxation
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default ReadingTips;
