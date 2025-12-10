import { Link, useNavigate } from "react-router";
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
            <Container>
              <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-12 py-12 sm:py-16 lg:py-20 min-h-[500px] sm:min-h-[600px] lg:min-h-[700px]">
                {/* Left Side - Text Content */}
                <div className="flex-1 text-center lg:text-left">
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-primary mb-4 sm:mb-6 leading-tight">
                    {slide.title}
                  </h1>
                  <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-base-content/80 mb-6 sm:mb-8 lg:mb-10 leading-relaxed">
                    {slide.description}
                  </p>
                  <Button handleClick={() => navigate("/books")}>
                    Explore All Books
                    <FaArrowRight />
                  </Button>
                </div>

                {/* Right Side - Image */}
                <div className="flex-1 w-full h-[300px] sm:h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </Container>
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
