import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { useEffect, useRef } from "react";
// eslint-disable-next-line no-unused-vars
import {motion} from 'framer-motion'
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Autoplay } from "swiper/modules";
import { FaBook, FaArrowRight } from "react-icons/fa";
import "swiper/css";
import "swiper/css/free-mode";
import Container from "../shared/Container/Container";
import usePublicAxios from "../../hooks/usePublicAxios";
import Loading from "../../components/Loading/Loading";
import Heading from "../../components/Heading/Heading";
import BookCard from "../../components/BookCard/BookCard";
import Button from "../../components/Button/Button";

gsap.registerPlugin(ScrollTrigger);

const LatestBooks = () => {
  const today = new Date().toLocaleDateString();
  const publicAxios = usePublicAxios();
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const swiperRef = useRef(null);
  const buttonRef = useRef(null);

  const { data: books = [], isLoading } = useQuery({
    queryKey: ["latest-books", today],
    queryFn: async () => {
      const { data } = await publicAxios.get("/books", {
        params: {
          limit: 6,
          sortBy: "createdAt",
          sortOrder: "desc",
        },
      });
      return data?.books;
    },
  });

  useEffect(() => {
    if (!isLoading && books.length > 0) {
      // GSAP scroll-triggered animations
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
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      )
        .fromTo(
          swiperRef.current,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
          "-=0.4"
        )
        .fromTo(
          buttonRef.current,
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.7)" },
          "-=0.4"
        );
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [isLoading, books]);

  // Framer Motion variants
  const buttonVariants = {
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    tap: {
      scale: 0.95,
    },
  };

  if (isLoading) {
    return <Loading message="Loading latest books..." />;
  }

  return (
    <section
      ref={sectionRef}
      className="py-12 sm:py-16 lg:py-20 bg-linear-to-br from-secondary/5 via-primary/5 to-secondary/5"
    >
      <Container>
        <div ref={headingRef}>
          <Heading
            title="Latest Arrivals"
            subtitle="Discover our newest collection of books"
            size="large"
          />
        </div>

        {books.length > 0 ? (
          <>
            <div ref={swiperRef}>
              <Swiper
                grabCursor={true}
                freeMode={true}
                loop={true}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
                modules={[FreeMode, Autoplay]}
                className="latest-books-swiper"
                breakpoints={{
                  320: {
                    slidesPerView: 1,
                    spaceBetween: 16,
                  },
                  640: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                  },
                  1024: {
                    slidesPerView: 3,
                    spaceBetween: 24,
                  },
                  1280: {
                    slidesPerView: 4,
                    spaceBetween: 24,
                  },
                }}
              >
                {books.map((book) => (
                  <SwiperSlide key={book._id}>
                    <BookCard book={book} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* View All Button */}
            <motion.div
              ref={buttonRef}
              className="text-center mt-8 sm:mt-12"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <Button handleClick={() => navigate("/books")} className="gap-2">
                View All Books
                <FaArrowRight />
              </Button>
            </motion.div>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="card bg-base-100 shadow-lg"
          >
            <div className="card-body text-center py-12 sm:py-16">
              <FaBook className="text-6xl sm:text-7xl  mx-auto mb-4" />
              <h3 className="text-xl sm:text-2xl font-semibold ">
                No Books Available
              </h3>
            </div>
          </motion.div>
        )}
      </Container>
    </section>
  );
};

export default LatestBooks;
