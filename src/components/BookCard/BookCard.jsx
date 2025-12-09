import { Link } from "react-router";
import { FaTag, FaUser } from "react-icons/fa";
import { BsBoxSeam } from "react-icons/bs";
import { Card, CardMedia, CardContent, Typography, Box, Chip } from "@mui/material";

const BookCard = ({ book }) => {
  const { _id, bookName, bookImage, author, price, quantity } = book;

  return (
    <Link to={`/book-details/${_id}`}>
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: { xs: "row", sm: "column" },
          transition: "all 0.3s ease",
          "&:hover": {
            transform: "translateY(-8px)",
            boxShadow: 6,
          },
        }}
      >
        <Box sx={{ position: "relative", width: { xs: "40%", sm: "100%" }, flexShrink: 0 }}>
          <CardMedia
            component="img"
            image={bookImage}
            alt={bookName}
            sx={{
              height: 150,
              objectFit: "cover",
              transition: "transform 0.3s ease",
              "&:hover": {
                transform: "scale(1.05)",
              },
            }}
          />
          <Box sx={{ position: "absolute", top: 8, right: 8 }}>
            {quantity > 0 ? (
              <Chip
                icon={<BsBoxSeam />}
                label={quantity}
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
        </Box>

        <CardContent sx={{ flexGrow: 1, p: { xs: 1.5, sm: 2.5 } }}>
          <Typography
            variant="h6"
            component="h2"
            sx={{
              fontWeight: 700,
              mb: { xs: 1, sm: 1.5 },
              fontSize: { xs: "0.875rem", sm: "1.125rem", lg: "1.25rem" },
              color: "primary.main",
              display: "-webkit-box",
              WebkitLineClamp: 1,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {bookName}
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              mb: { xs: 1, sm: 2 },
              color: "text.secondary",
            }}
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
              {author}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1, color: "primary.main" }}>
            <FaTag style={{ flexShrink: 0, fontSize: "0.875rem" }} />
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                fontSize: { xs: "1rem", sm: "1.25rem" },
              }}
            >
              ৳ {price}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Link>
  );
};

export default BookCard;
