import Autoplay from "embla-carousel-autoplay";
import { useCallback, useEffect, useState } from "react";

import { Container } from "@/components/ui/container";
import { sliderData } from "@/features/site/data/slider-data";
import { cn } from "@/utils/utils";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

function Banner() {
  const [api, setApi] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const total = sliderData.length;

  const onSelect = useCallback(() => {
    if (!api) return;
    setCurrentIndex(api.selectedScrollSnap());
  }, [api]);

  useEffect(() => {
    if (!api) return;
    onSelect();
    api.on("select", onSelect);
    api.on("reInit", onSelect);
    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api, onSelect]);

  return (
    <section className="pt-18">
      <Container>
        <Carousel
          opts={{ loop: true }}
          plugins={[Autoplay({ delay: 5000, stopOnInteraction: false })]}
          setApi={setApi}
          className="relative"
        >
          <CarouselContent>
            {sliderData.map((item, idx) => (
              <CarouselItem
                key={item.id}
                className="basis-full rounded-md overflow-hidden"
              >
                <div className="relative aspect-video sm:aspect-video lg:aspect-auto rounded-md overflow-hidden">
                  <img
                    src={item.photoUrl}
                    alt={`Slide ${idx + 1}`}
                    loading="eager"
                    className="h-full w-full object-cover rounded-md"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="hidden sm:inline-flex absolute left-4" />
          <CarouselNext className="hidden sm:inline-flex absolute right-4" />

          <div className="absolute inset-0 rounded-xl bg-linear-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2">
            {sliderData.map((_, idx) => (
              <button
                key={idx}
                onClick={() => api?.scrollTo(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  currentIndex === idx
                    ? "w-6 bg-white"
                    : "w-2 bg-white/50 hover:bg-white/70",
                )}
              />
            ))}
          </div>

          <div className="absolute bottom-4 right-4 sm:right-6 z-10 rounded-full bg-black/40 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm tabular-nums">
            {currentIndex + 1} / {total}
          </div>
        </Carousel>
      </Container>
    </section>
  );
}

export { Banner };
