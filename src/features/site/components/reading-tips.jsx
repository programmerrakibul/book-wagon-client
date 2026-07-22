import { Card, CardContent } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { benefits, tips } from "../data/reading-tips";

function ReadingTips() {
  return (
    <section className="py-8 sm:py-12 lg:py-16">
      <Container>
        <Heading
          title="Enhance Your Reading Experience"
          subtitle="Discover practical tips and techniques to make your reading more enjoyable, effective, and rewarding."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 mt-8 sm:mt-12">
          {tips.map((tip, index) => (
            <Card
              key={index}
              className="group overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-1"
            >
              <CardContent className="p-5 sm:p-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <tip.icon className="size-5" />
                </div>

                <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary mb-3">
                  {tip.category}
                </span>

                <h3 className="text-lg font-bold mb-3 group-hover:text-primary transition-colors duration-300">
                  {tip.title}
                </h3>

                <p className="text-sm text-muted-foreground mb-4">
                  {tip.description}
                </p>

                <span className="text-xs text-muted-foreground pt-4 border-t block">
                  Tip #{String(index + 1).padStart(2, "0")}
                </span>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 sm:mt-16 bg-linear-to-br from-primary/5 to-secondary/5 rounded-2xl p-6 sm:p-8">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-6">
              Benefits of Effective Reading
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {benefits.map((benefit) => {
                const Icon = benefit.icon;
                return (
                  <Card key={benefit.title} className="shadow-sm">
                    <CardContent className="p-5 text-center">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
                        <Icon className="size-5" />
                      </div>
                      <h4 className="font-bold mb-2">{benefit.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {benefit.description}
                      </p>
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

export { ReadingTips };
