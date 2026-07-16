import { useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ArrowRight } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { sliderData } from "@/features/site/data/slider-data";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

function Banner() {
  const navigate = useNavigate();
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const buttonRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(titleRef.current, { opacity: 0, y: -30 }, { opacity: 1, y: 0, duration: 0.8 })
      .fromTo(descRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 }, "-=0.4")
      .fromTo(buttonRef.current, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.6 }, "-=0.4")
      .fromTo(imageRef.current, { opacity: 0, x: 50 }, { opacity: 1, x: 0, duration: 1 }, "-=0.8");

    return () => tl.kill();
  }, []);

  return (
    <section className="bg-linear-to-br from-primary/5 to-secondary/5">
      <Swiper
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true, dynamicBullets: true }}
        navigation
        loop
        speed={800}
        modules={[Autoplay, Pagination, Navigation]}
        className="w-full [&_.swiper-pagination]:bottom-5 sm:[&_.swiper-pagination]:bottom-8 [&_.swiper-pagination-bullet]:h-2.5 [&_.swiper-pagination-bullet]:w-2.5 [&_.swiper-pagination-bullet]:bg-primary [&_.swiper-pagination-bullet]:opacity-50 [&_.swiper-pagination-bullet-active]:opacity-100 [&_.swiper-button-next]:hidden sm:[&_.swiper-button-next]:flex [&_.swiper-button-next]:h-10 sm:[&_.swiper-button-next]:h-12 [&_.swiper-button-next]:w-10 sm:[&_.swiper-button-next]:w-12 [&_.swiper-button-next]:rounded-full [&_.swiper-button-next]:bg-primary/10 [&_.swiper-button-next]:text-primary [&_.swiper-button-next]:after:text-lg sm:[&_.swiper-button-next]:after:text-xl [&_.swiper-button-next]:hover:bg-primary/20 [&_.swiper-button-prev]:hidden sm:[&_.swiper-button-prev]:flex [&_.swiper-button-prev]:h-10 sm:[&_.swiper-button-prev]:h-12 [&_.swiper-button-prev]:w-10 sm:[&_.swiper-button-prev]:w-12 [&_.swiper-button-prev]:rounded-full [&_.swiper-button-prev]:bg-primary/10 [&_.swiper-button-prev]:text-primary [&_.swiper-button-prev]:after:text-lg sm:[&_.swiper-button-prev]:after:text-xl [&_.swiper-button-prev]:hover:bg-primary/20"
      >
        {sliderData.map((slide) => (
          <SwiperSlide key={slide.id}>
            <motion.div variants={containerVariants} initial="hidden" animate="visible">
              <Container>
                <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-12 py-12 sm:py-16 lg:py-20 min-h-[70dvh]">
                  <div className="flex-1 text-center lg:text-left">
                    <motion.h1
                      ref={titleRef}
                      variants={itemVariants}
                      className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent"
                    >
                      {slide.title}
                    </motion.h1>
                    <motion.p
                      ref={descRef}
                      variants={itemVariants}
                      className="text-sm sm:text-base lg:text-lg xl:text-xl mb-6 sm:mb-8 lg:mb-10 leading-relaxed text-muted-foreground"
                    >
                      {slide.description}
                    </motion.p>
                    <motion.div ref={buttonRef} variants={itemVariants}>
                      <Button onClick={() => navigate("/books")} className="gap-2">
                        Explore All Books
                        <ArrowRight className="size-4" />
                      </Button>
                    </motion.div>
                  </div>

                  <motion.div
                    ref={imageRef}
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                    className="flex-1"
                  >
                    <img
                      src={slide.image}
                      alt={slide.title}
                      loading="eager"
                      className="w-full object-cover max-w-[350px] sm:max-w-[390px] md:max-w-[450px] lg:w-full h-[300px] sm:h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl ml-auto"
                    />
                  </motion.div>
                </div>
              </Container>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

export { Banner };
