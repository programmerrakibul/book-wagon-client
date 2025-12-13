import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay } from "swiper/modules";
import { FaQuoteLeft } from "react-icons/fa";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import Container from "../shared/Container/Container";
import Heading from "../../components/Heading/Heading";
import Avatar from "../../components/Avatar/Avatar";

const Authors = () => {
  const authors = [
    {
      id: 1,
      name: "Jane Austen",
      image: "https://i.pravatar.cc/300?img=1",
      bio: "English novelist known for her six major novels, which interpret, critique and comment upon the British landed gentry at the end of the 18th century.",
      books: "Pride and Prejudice, Sense and Sensibility",
      quote: "There is no charm equal to tenderness of heart.",
    },
    {
      id: 2,
      name: "Mark Twain",
      image: "https://i.pravatar.cc/300?img=12",
      bio: "American writer, humorist, entrepreneur, publisher, and lecturer. He was lauded as the greatest humorist the United States has produced.",
      books: "The Adventures of Tom Sawyer, Adventures of Huckleberry Finn",
      quote: "The secret of getting ahead is getting started.",
    },
    {
      id: 3,
      name: "Virginia Woolf",
      image: "https://i.pravatar.cc/300?img=5",
      bio: "English writer, considered one of the most important modernist 20th-century authors and a pioneer in the use of stream of consciousness.",
      books: "Mrs Dalloway, To the Lighthouse",
      quote: "You cannot find peace by avoiding life.",
    },
    {
      id: 4,
      name: "Ernest Hemingway",
      image: "https://i.pravatar.cc/300?img=13",
      bio: "American novelist, short-story writer, and journalist. His economical and understated style had a strong influence on 20th-century fiction.",
      books: "The Old Man and the Sea, A Farewell to Arms",
      quote: "There is nothing to writing. All you do is sit down and bleed.",
    },
    {
      id: 5,
      name: "Agatha Christie",
      image: "https://i.pravatar.cc/300?img=9",
      bio: "English writer known for her 66 detective novels and 14 short story collections, particularly those revolving around fictional detectives.",
      books: "Murder on the Orient Express, And Then There Were None",
      quote:
        "The impossible could not have happened, therefore the impossible must be possible.",
    },
    {
      id: 6,
      name: "George Orwell",
      image: "https://i.pravatar.cc/300?img=14",
      bio: "English novelist, essayist, journalist and critic. His work is characterized by lucid prose, awareness of social injustice and opposition to totalitarianism.",
      books: "1984, Animal Farm",
      quote: "In a time of deceit telling the truth is a revolutionary act.",
    },
  ];

  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-linear-to-br from-base-200 to-base-100">
      <Container>
        {/* Header */}
        <Heading
          title="Featured Authors"
          subtitle="Discover the brilliant minds behind your favorite books"
        />

        {/* Swiper Coverflow */}
        <div className="relative">
          <Swiper
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            slidesPerView="auto"
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 400,
              modifier: 1,
              slideShadows: false,
            }}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
            }}
            loop={true}
            modules={[EffectCoverflow, Autoplay]}
            className="authors-swiper"
          >
            {authors.map((author) => (
              <SwiperSlide key={author.id}>
                <div className="card bg-base-100 shadow-2xl h-full">
                  <div className="card-body p-6 sm:p-8">
                    {/* Author Image */}
                    <div className="flex justify-center mb-4 sm:mb-6">
                      <Avatar
                        src={author.image}
                        alt={author.name}
                        size="size-24 sm: size-32"
                      />
                    </div>

                    {/* Author Name */}
                    <h3 className="text-xl sm:text-2xl font-bold text-center text-gray-800 mb-4">
                      {author.name}
                    </h3>

                    {/* Bio */}
                    <p className="text-sm sm:text-base text-gray-600 text-center leading-relaxed mb-4 sm:mb-6 line-clamp-3">
                      {author.bio}
                    </p>

                    {/* Quote */}
                    <div className="bg-primary/5 rounded-lg p-4 relative">
                      <FaQuoteLeft className="text-primary text-xl sm:text-2xl mb-2" />
                      <p className="text-xs sm:text-sm italic text-gray-700 leading-relaxed">
                        {author.quote}
                      </p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </Container>

      <style>{`
        .authors-swiper {
          width: 100%;
          padding: 50px 0 70px;
        }

        .authors-swiper .swiper-slide {
          background-position: center;
          background-size: cover;
          width: 280px;
          height: auto;
        }

        @media (min-width: 640px) {
          .authors-swiper .swiper-slide {
            width: 350px;
          }
        }

        @media (min-width: 1024px) {
          .authors-swiper .swiper-slide {
            width: 400px;
          }
        }

        .authors-swiper .swiper-slide-active {
          transform: scale(1.05);
        }

        .authors-swiper .swiper-pagination {
          bottom: 20px;
        }

        .authors-swiper .swiper-pagination-bullet {
          background: hsl(var(--p));
          opacity: 0.5;
          width: 10px;
          height: 10px;
        }

        .authors-swiper .swiper-pagination-bullet-active {
          opacity: 1;
          width: 12px;
          height: 12px;
        }
      `}</style>
    </section>
  );
};

export default Authors;
