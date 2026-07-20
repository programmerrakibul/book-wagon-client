import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import Autoplay from "embla-carousel-autoplay";
import { Quote } from "lucide-react";
import { authors } from "../data/authors";

function Authors() {
  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-linear-to-br from-muted/50 to-background">
      <Container>
        <Heading
          title="Featured Authors"
          subtitle="Discover the brilliant minds behind your favorite books"
        />

        <div className="mt-8 sm:mt-12">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            plugins={[
              Autoplay({
                delay: 3500,
                stopOnInteraction: false,
              }),
            ]}
          >
            <CarouselContent className="-ml-4">
              {authors.map((author) => (
                <CarouselItem
                  key={author.id}
                  className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                >
                  <Card className="shadow-2xl h-full">
                    <CardContent className="p-6 sm:p-8">
                      <div className="flex justify-center mb-4 sm:mb-6">
                        <Avatar className="size-24 sm:size-32">
                          <AvatarImage src={author.image} alt={author.name} />
                          <AvatarFallback className="text-lg">
                            {author.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                      </div>

                      <h3 className="text-xl sm:text-2xl font-bold text-center mb-4">
                        {author.name}
                      </h3>

                      <p className="text-sm sm:text-base text-muted-foreground text-center leading-relaxed mb-4 sm:mb-6 line-clamp-3">
                        {author.bio}
                      </p>

                      <div className="bg-primary/5 rounded-lg p-4">
                        <Quote className="size-5 text-primary mb-2" />
                        <p className="text-xs sm:text-sm italic text-muted-foreground">
                          {author.quote}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </Container>
    </section>
  );
}

export { Authors };
