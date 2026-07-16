import { BookOpen, Tags, Truck, ShieldCheck, Headphones, Heart } from "lucide-react";
import chooseUsImg from "@/assets/choose_us.png";
import { Card, CardContent } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";

const features = [
  {
    icon: BookOpen,
    title: "Vast Collection",
    description:
      "Access to thousands of books across all genres and categories for every reader.",
  },
  {
    icon: Tags,
    title: "Best Prices",
    description:
      "Competitive pricing with regular discounts and special offers on your favorite books.",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description:
      "Quick and reliable delivery service to get your books to you as soon as possible.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Payment",
    description:
      "Safe and secure payment options with multiple payment methods for your convenience.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description:
      "Dedicated customer support team ready to assist you anytime, anywhere.",
  },
  {
    icon: Heart,
    title: "Quality Assured",
    description:
      "Carefully curated collection ensuring only the best quality books for our readers.",
  },
];

function ChooseUs() {
  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <Container>
        <Heading
          title="Why Choose BookWagon"
          subtitle="Discover what makes us the best choice for all your reading needs"
          size="large"
        />

        <div className="flex flex-col xl:flex-row gap-8 lg:gap-12 items-center mt-8 sm:mt-12">
          <div className="flex-1 w-full">
            <div className="relative">
              <img
                src={chooseUsImg}
                alt="Books"
                className="w-full h-64 sm:h-80 lg:h-96 xl:h-fit object-cover rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-linear-to-t from-primary/20 to-transparent rounded-2xl" />
            </div>
          </div>

          <div className="flex-1 w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <Card
                    key={feature.title}
                    className="border hover:border-primary hover:shadow-lg transition-all duration-300 group"
                  >
                    <CardContent className="p-4 sm:p-5">
                      <div className="flex items-start gap-3 sm:gap-4">
                        <div className="p-2 sm:p-3 bg-primary/10 rounded-lg group-hover:bg-primary transition-colors shrink-0">
                          <Icon className="size-5 sm:size-6 text-primary group-hover:text-primary-foreground transition-colors" />
                        </div>
                        <div>
                          <h3 className="text-base sm:text-lg font-bold mb-1 sm:mb-2">
                            {feature.title}
                          </h3>
                          <p className="text-xs sm:text-sm text-muted-foreground">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export { ChooseUs };
