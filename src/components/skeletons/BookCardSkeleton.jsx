import { Card, CardContent, Box, Skeleton } from "@mui/material";

const BookCardSkeleton = ({ length = 6 }) => {
  return (
    <>
      {[...Array(length)].map((_, index) => (
        <Card
          key={index}
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: { xs: "row", sm: "column" },
            overflow: "hidden",
            bgcolor: "background.paper",
          }}
          className="dark:bg-base-100!"
        >
          {/* Image Skeleton */}
          <Box
            sx={{
              position: "relative",
              width: { xs: "40%", sm: "100%" },
              flexShrink: 0,
              bgcolor: "action.hover",
            }}
          >
            <Skeleton
              variant="rectangular"
              sx={{
                height: 150,
                width: "100%",
                bgcolor: "rgba(0, 0, 0, 0.11)",
              }}
              className="dark:bg-white/10!"
              animation="wave"
            />
            {/* Chip Skeleton */}
            <Box sx={{ position: "absolute", top: 8, right: 8 }}>
              <Skeleton
                variant="rounded"
                width={60}
                height={24}
                sx={{ bgcolor: "rgba(0, 0, 0, 0.11)" }}
                className="dark:bg-white/10!"
                animation="wave"
              />
            </Box>
          </Box>

          {/* Content Skeleton */}
          <CardContent sx={{ flexGrow: 1, p: { xs: 1.5, sm: 2.5 } }}>
            {/* Title Skeleton */}
            <Skeleton
              variant="text"
              sx={{
                fontSize: { xs: "0.875rem", sm: "1.125rem", lg: "1.25rem" },
                mb: { xs: 1, sm: 1.5 },
                width: "80%",
                bgcolor: "rgba(0, 0, 0, 0.11)",
              }}
              className="dark:bg-white/10!"
              animation="wave"
            />

            {/* Author Skeleton */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                mb: { xs: 1, sm: 2 },
              }}
            >
              <Skeleton
                variant="circular"
                width={12}
                height={12}
                sx={{ bgcolor: "rgba(0, 0, 0, 0.11)" }}
                className="dark:bg-white/10!"
                animation="wave"
              />
              <Skeleton
                variant="text"
                sx={{
                  fontSize: { xs: "0.7rem", sm: "0.875rem" },
                  width: "60%",
                  bgcolor: "rgba(0, 0, 0, 0.11)",
                }}
                className="dark:bg-white/10!"
                animation="wave"
              />
            </Box>

            {/* Price Skeleton */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Skeleton
                variant="circular"
                width={14}
                height={14}
                sx={{ bgcolor: "rgba(0, 0, 0, 0.11)" }}
                className="dark:bg-white/10!"
                animation="wave"
              />
              <Skeleton
                variant="text"
                sx={{
                  fontSize: { xs: "1rem", sm: "1.25rem" },
                  width: "40%",
                  bgcolor: "rgba(0, 0, 0, 0.11)",
                }}
                className="dark:bg-white/10!"
                animation="wave"
              />
            </Box>
          </CardContent>
        </Card>
      ))}
    </>
  );
};

export default BookCardSkeleton;
