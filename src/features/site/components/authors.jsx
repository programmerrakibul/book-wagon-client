import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Quote } from "lucide-react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { Autoplay, EffectCoverflow } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
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
          <Swiper
            effect="coverflow"
            grabCursor
            centeredSlides
            slidesPerView={{
              640: 2,
            }}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 400,
              modifier: 1,
              slideShadows: false,
            }}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            loop
            modules={[EffectCoverflow, Autoplay]}
            className="w-full py-12 sm:py-14 [&_.swiper-slide]:w-[280px] sm:[&_.swiper-slide]:w-[350px] lg:[&_.swiper-slide]:w-[400px] [&_.swiper-slide-active]:scale-105 [&_.swiper-pagination]:bottom-5 [&_.swiper-pagination-bullet]:h-2.5 [&_.swiper-pagination-bullet]:w-2.5 [&_.swiper-pagination-bullet]:bg-primary [&_.swiper-pagination-bullet]:opacity-50 [&_.swiper-pagination-bullet-active]:h-3 [&_.swiper-pagination-bullet-active]:w-3 [&_.swiper-pagination-bullet-active]:opacity-100"
          >
            {authors.map((author) => (
              <SwiperSlide key={author.id}>
                <Card className="shadow-2xl h-full mx-2">
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
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </Container>
    </section>
  );
}

export { Authors };
