import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Loading } from "@/components/ui/loading";
import { BookCard } from "@/features/book/components/book-card";
import { useBooks } from "@/features/book/hooks/use-books";
import Autoplay from "embla-carousel-autoplay";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, BookOpen } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

function LatestBooks() {
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const carouselRef = useRef(null);
  const buttonRef = useRef(null);

  const { data: { data: books = [] } = {}, isLoading } = useBooks({ limit: 6 });

  useEffect(() => {
    if (isLoading || !books?.length) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "top 40%",
        toggleActions: "play none none reverse",
      },
    });

    tl.fromTo(
      headingRef.current,
      { opacity: 0, y: -30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
    )
      .fromTo(
        carouselRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        "-=0.4",
      )
      .fromTo(
        buttonRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.7)" },
        "-=0.4",
      );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [isLoading, books]);

  return (
    <section
      ref={sectionRef}
      className="py-12 sm:py-16 lg:py-20 bg-linear-to-br from-secondary/5 via-primary/5 to-secondary/5"
    >
      <Container>
        <div ref={headingRef} className="mb-8">
          <Heading
            title="Latest Arrivals"
            subtitle="Discover our newest collection of books"
            size="large"
          />
        </div>

        {isLoading ? (
          <Loading message="Loading latest books..." fullPage={false} />
        ) : books?.length > 0 ? (
          <>
            <div ref={carouselRef}>
              <Carousel
                opts={{
                  align: "start",
                  loop: true,
                }}
                plugins={[
                  Autoplay({
                    delay: 3000,
                    stopOnInteraction: false,
                    pauseOnMouseEnter: true,
                  }),
                ]}
              >
                <CarouselContent className="-ml-4 cursor-grab">
                  {books.map((book) => (
                    <CarouselItem
                      key={book._id}
                      className="pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 xl:basis-1/5 2xl:basis-1/6 h-full"
                    >
                      <BookCard book={book} />
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>

            <motion.div
              ref={buttonRef}
              className="text-center mt-8 sm:mt-12"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button onClick={() => navigate("/books")} className="gap-2">
                View All Books
                <ArrowRight className="size-4" />
              </Button>
            </motion.div>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-12 sm:py-16"
          >
            <BookOpen className="size-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl sm:text-2xl font-semibold text-muted-foreground">
              No Books Available
            </h3>
          </motion.div>
        )}
      </Container>
    </section>
  );
}

export { LatestBooks };
