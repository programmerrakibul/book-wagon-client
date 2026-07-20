import { Card, CardContent } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { values } from "../data/values";

function Values() {
  return (
    <section className="py-8 sm:py-12 lg:py-16">
      <Container>
        <Heading title="Our Values" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mt-8 sm:mt-12">
          {values.map((value) => {
            const Icon = value.icon;
            return (
              <Card
                key={value.title}
                className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <CardContent className="p-6 sm:p-8">
                  <div className="flex items-start gap-4">
                    <div className="p-3 sm:p-4 bg-primary/10 rounded-full shrink-0">
                      <Icon className="size-6 sm:size-7 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2 sm:mb-3">
                        {value.title}
                      </h3>
                      <p className="text-sm sm:text-base text-muted-foreground">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

export { Values };
