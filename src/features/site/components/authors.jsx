import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import Autoplay from "embla-carousel-autoplay";
import { authors } from "../data/authors";
import AuthorCard from "./author-card";

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
                  <AuthorCard author={author} />
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
