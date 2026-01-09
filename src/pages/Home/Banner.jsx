import { useNavigate } from "react-router";
import { useEffect, useRef } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { FaArrowRight } from "react-icons/fa";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Container from "../shared/Container/Container";
import Button from "../../components/Button/Button";
import { sliderData } from "../../data/sliderData";

const Banner = () => {
  const navigate = useNavigate();
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const buttonRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    // GSAP timeline for slide content animations
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: -30 },
      { opacity: 1, y: 0, duration: 0.8 }
    )
      .fromTo(
        descRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8 },
        "-=0.4"
      )
      .fromTo(
        buttonRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.6 },
        "-=0.4"
      )
      .fromTo(
        imageRef.current,
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 1 },
        "-=0.8"
      );

    return () => tl.kill();
  }, []);

  // Framer Motion variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const slideVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="bg-linear-to-br from-primary/5 to-secondary/5">
      <Swiper
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        navigation={true}
        loop={true}
        speed={800}
        modules={[Autoplay, Pagination, Navigation]}
        className="banner-swiper"
      >
        {sliderData.map((slide) => (
          <SwiperSlide key={slide.id}>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <Container>
                <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-12 py-12 sm:py-16 lg:py-20 h-[70dvh]">
                  {/* Left Side - Text Content */}
                  <div className="flex-1 text-center lg:text-left">
                    <motion.h1
                      ref={titleRef}
                      variants={slideVariants}
                      className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 bg-linear-to-r! from-primary! to-secondary! bg-clip-text! text-transparent!"
                    >
                      {slide.title}
                    </motion.h1>
                    <motion.p
                      ref={descRef}
                      variants={slideVariants}
                      className="text-sm sm:text-base lg:text-lg xl:text-xl mb-6 sm:mb-8 lg:mb-10 leading-relaxed"
                    >
                      {slide.description}
                    </motion.p>
                    <motion.div ref={buttonRef} variants={slideVariants}>
                      <Button handleClick={() => navigate("/books")}>
                        Explore All Books
                        <FaArrowRight />
                      </Button>
                    </motion.div>
                  </div>

                  {/* Right Side - Image */}
                  <motion.div
                    ref={imageRef}
                    variants={slideVariants}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                    className="flex-1 max-w-[350px] sm:max-w-[390px] md:max-w-[450px] lg:w-full h-[300px] sm:h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl"
                  >
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                </div>
              </Container>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style>{`
        .banner-swiper {
          width: 100%;
        }

        .banner-swiper .swiper-pagination {
          bottom: 20px;
        }

        .banner-swiper .swiper-pagination-bullet {
          background: hsl(var(--p));
          opacity: 0.5;
          width: 10px;
          height: 10px;
        }

        @media (min-width: 640px) {
          .banner-swiper .swiper-pagination {
            bottom: 30px;
          }
          .banner-swiper .swiper-pagination-bullet {
            width: 12px;
            height: 12px;
          }
        }

        .banner-swiper .swiper-pagination-bullet-active {
          opacity: 1;
          background: hsl(var(--p));
        }

        .banner-swiper .swiper-button-next,
        .banner-swiper .swiper-button-prev {
          color: hsl(var(--p));
          background: hsl(var(--p) / 0.1);
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }

        @media (min-width: 640px) {
          .banner-swiper .swiper-button-next,
          .banner-swiper .swiper-button-prev {
            width: 50px;
            height: 50px;
          }
        }

        .banner-swiper .swiper-button-next:hover,
        .banner-swiper .swiper-button-prev:hover {
          background: hsl(var(--p) / 0.2);
        }

        .banner-swiper .swiper-button-next:after,
        .banner-swiper .swiper-button-prev:after {
          font-size: 18px;
        }

        @media (min-width: 640px) {
          .banner-swiper .swiper-button-next:after,
          .banner-swiper .swiper-button-prev:after {
            font-size: 22px;
          }
        }

        @media (max-width: 640px) {
          .banner-swiper .swiper-button-next,
          .banner-swiper .swiper-button-prev {
            display: none;
          }
        }
      `}</style>
    </section>
  );
};

export default Banner;
