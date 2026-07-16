import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Typography,
} from "@mui/material";
import { useEffect, useRef } from "react";
import { Link } from "react-router";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BsBoxSeam } from "react-icons/bs";
import { FaTag, FaUser } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const BookCard = ({ book = {} }) => {
  const cardRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    // GSAP scroll-triggered animation
    const card = cardRef.current;
    gsap.fromTo(
      card,
      {
        opacity: 0,
        y: 50,
        scale: 0.9,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 85%",
          end: "top 60%",
          toggleActions: "play none none reverse",
        },
      },
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === card) {
          trigger.kill();
        }
      });
    };
  }, []);

  // Framer Motion variants
  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    hover: {
      y: -8,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  const imageVariants = {
    hover: {
      scale: 1.1,
      transition: {
        duration: 0.4,
        ease: "easeInOut",
      },
    },
  };

  const contentVariants = {
    hover: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hover: {
      x: 5,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <Link to={`/book-details/${book._id}`}>
      <motion.div
        ref={cardRef}
        variants={cardVariants}
        initial="initial"
        animate="animate"
        whileHover="hover"
      >
        <Card
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: { xs: "row", sm: "column" },
            overflow: "hidden",
          }}
          className="dark:bg-base-100!"
        >
          <Box
            sx={{
              position: "relative",
              width: { xs: "40%", sm: "100%" },
              flexShrink: 0,
              overflow: "hidden",
            }}
          >
            <motion.div ref={imageRef} variants={imageVariants}>
              <CardMedia
                component="img"
                image={book.photoUrl}
                alt={book.name}
                sx={{
                  height: 150,
                  objectFit: "cover",
                }}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.3 }}
            >
              <Box sx={{ position: "absolute", top: 8, right: 8 }}>
                {book.stock > 0 ? (
                  <Chip
                    icon={<BsBoxSeam />}
                    label={book.stock}
                    color="success"
                    size="small"
                    sx={{ fontWeight: 600, fontSize: "0.75rem" }}
                  />
                ) : (
                  <Chip
                    label="Out of Stock"
                    color="error"
                    size="small"
                    sx={{ fontWeight: 600, fontSize: "0.75rem" }}
                  />
                )}
              </Box>
            </motion.div>
          </Box>

          <motion.div variants={contentVariants}>
            <CardContent sx={{ flexGrow: 1, p: { xs: 1.5, sm: 2.5 } }}>
              <motion.div variants={itemVariants}>
                <Typography
                  variant="h6"
                  component="h2"
                  sx={{
                    fontWeight: 700,
                    fontFamily: "Montserrat Alternates",
                    mb: { xs: 1, sm: 1.5 },
                    fontSize: { xs: "0.875rem", sm: "1.125rem", lg: "1.25rem" },
                    color: "#26ccc2",
                    display: "-webkit-box",
                    WebkitLineClamp: 1,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {book.name}
                </Typography>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Typography
                  component="p"
                  className="text-neutral/60 dark:text-white/80 overflow-hidden line-clamp-2 text-sm! md:text-base! mb-2!"
                >
                  {book.description}
                </Typography>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    mb: { xs: 1, sm: 2 },
                  }}
                  className="text-neutral/60 dark:text-white/80"
                >
                  <FaUser style={{ flexShrink: 0, fontSize: "0.75rem" }} />
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: { xs: "0.7rem", sm: "0.875rem" },
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {book.author}
                  </Typography>
                </Box>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    color: "#26ccc2",
                  }}
                >
                  <FaTag style={{ flexShrink: 0, fontSize: "0.875rem" }} />
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      fontSize: { xs: "1rem", sm: "1.25rem" },
                    }}
                    className="text-primary!"
                  >
                    ৳ {book.discount ? book.discountedPrice : book.price}
                  </Typography>
                </Box>
              </motion.div>
            </CardContent>
          </motion.div>
        </Card>
      </motion.div>
    </Link>
  );
};

export default BookCard;
