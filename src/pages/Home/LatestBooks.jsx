import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router";
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

const LatestBooks = () => {
  const today = new Date().toLocaleDateString();
  const publicAxios = usePublicAxios();
  const navigate = useNavigate();

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

  if (isLoading) {
    return <Loading message="Loading latest books..." />;
  }

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-linear-to-br from-secondary/5 via-primary/5 to-secondary/5">
      <Container>
        <Heading
          title="Latest Arrivals"
          subtitle="Discover our newest collection of books"
          size="large"
        />

        {books.length > 0 ? (
          <>
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

            {/* View All Button */}
            <div className="text-center mt-8 sm:mt-12">
              <Button handleClick={() => navigate("/books")} className="gap-2">
                View All Books
                <FaArrowRight />
              </Button>
            </div>
          </>
        ) : (
          <div className="card bg-base-100 shadow-lg">
            <div className="card-body text-center py-12 sm:py-16">
              <FaBook className="text-6xl sm:text-7xl  mx-auto mb-4" />
              <h3 className="text-xl sm:text-2xl font-semibold ">
                No Books Available
              </h3>
            </div>
          </div>
        )}
      </Container>
    </section>
  );
};

export default LatestBooks;
