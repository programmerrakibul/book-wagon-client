import { MapPin, CheckCircle, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { availableCities } from "@/features/site/data/available-cities";

function Coverage() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-linear-to-br from-secondary/5 via-primary/5 to-secondary/5">
      <Container>
        <Heading
          title="Delivery Coverage"
          subtitle="We deliver books to major cities across Bangladesh"
          size="large"
        />

        <div className="mt-8 sm:mt-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {availableCities.map((city) => (
              <Card
                key={city.name}
                className="hover:border-primary hover:shadow-lg transition-all duration-300"
              >
                <CardContent className="p-5 sm:p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <MapPin className="size-5 text-primary" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold">{city.name}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Population served: <span className="font-semibold text-foreground">{city.population}</span>
                  </p>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="size-4 text-green-600 dark:text-green-400" />
                    <span className="text-xs font-medium text-green-600 dark:text-green-400">
                      Delivery Active
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="mt-8 sm:mt-12 border-primary/20 bg-linear-to-br from-primary/5 to-secondary/5">
            <CardContent className="p-6 sm:p-8 text-center">
              <TrendingUp className="size-8 text-primary mx-auto mb-3" />
              <p className="text-sm sm:text-base">
                <strong className="text-primary">Expanding Soon!</strong>{" "}
                We're working to bring our services to more cities across Bangladesh.
              </p>
            </CardContent>
          </Card>
        </div>
      </Container>
    </section>
  );
}

export { Coverage };
