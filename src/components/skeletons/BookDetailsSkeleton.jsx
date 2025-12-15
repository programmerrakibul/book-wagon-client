import { Box, Card, CardContent, Skeleton } from "@mui/material";
import Container from "../../pages/shared/Container/Container";

const BookDetailsSkeleton = () => {
  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-linear-to-br from-secondary/5 via-primary/5 to-secondary/5">
      <Container>
        <Skeleton
          variant="text"
          width={100}
          height={24}
          sx={{ mb: { xs: 3, sm: 4 }, bgcolor: "rgba(0, 0, 0, 0.11)" }}
          className="dark:bg-white/10!"
          animation="wave"
        />
        <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-12">
          <div className="flex-1 lg:max-w-md">
            <Card
              sx={{ bgcolor: "background.paper" }}
              className="dark:bg-base-100! shadow-xl overflow-hidden sticky top-24"
            >
              <Box sx={{ position: "relative" }}>
                <Skeleton
                  variant="rectangular"
                  sx={{
                    width: "100%",
                    height: { xs: 320, sm: 384, lg: 448 },
                    bgcolor: "rgba(0, 0, 0, 0.11)",
                  }}
                  className="dark:bg-white/10!"
                  animation="wave"
                />
                <Box sx={{ position: "absolute", top: 16, right: 16 }}>
                  <Skeleton
                    variant="rounded"
                    width={120}
                    height={32}
                    sx={{ bgcolor: "rgba(0, 0, 0, 0.11)" }}
                    className="dark:bg-white/10!"
                    animation="wave"
                  />
                </Box>
              </Box>
            </Card>
          </div>
          <div className="flex-1">
            <div className="space-y-6 sm:space-y-8">
              <div>
                <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
                  <Skeleton
                    variant="text"
                    sx={{
                      width: "80%",
                      height: { xs: 40, sm: 48, lg: 56, xl: 64 },
                      bgcolor: "rgba(0, 0, 0, 0.11)",
                    }}
                    className="dark:bg-white/10!"
                    animation="wave"
                  />
                  <Skeleton
                    variant="circular"
                    width={40}
                    height={40}
                    sx={{ bgcolor: "rgba(0, 0, 0, 0.11)" }}
                    className="dark:bg-white/10!"
                    animation="wave"
                  />
                </div>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Skeleton
                    variant="circular"
                    width={20}
                    height={20}
                    sx={{ bgcolor: "rgba(0, 0, 0, 0.11)" }}
                    className="dark:bg-white/10!"
                    animation="wave"
                  />
                  <Skeleton
                    variant="text"
                    width={150}
                    height={24}
                    sx={{ bgcolor: "rgba(0, 0, 0, 0.11)" }}
                    className="dark:bg-white/10!"
                    animation="wave"
                  />
                </Box>
              </div>
              <Card
                sx={{ bgcolor: "background.paper" }}
                className="dark:bg-base-100!"
              >
                <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Skeleton
                      variant="circular"
                      width={48}
                      height={48}
                      sx={{ bgcolor: "rgba(0, 0, 0, 0.11)" }}
                      className="dark:bg-white/10!"
                      animation="wave"
                    />
                    <div>
                      <Skeleton
                        variant="text"
                        width={60}
                        height={20}
                        sx={{ mb: 1, bgcolor: "rgba(0, 0, 0, 0.11)" }}
                        className="dark:bg-white/10!"
                        animation="wave"
                      />
                      <Skeleton
                        variant="text"
                        width={120}
                        sx={{
                          height: { xs: 48, sm: 56, lg: 64 },
                          bgcolor: "rgba(0, 0, 0, 0.11)",
                        }}
                        className="dark:bg-white/10!"
                        animation="wave"
                      />
                    </div>
                  </Box>
                </CardContent>
              </Card>
              <Card
                sx={{ bgcolor: "background.paper" }}
                className="dark:bg-base-100! shadow-lg"
              >
                <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mb: { xs: 2, sm: 3 },
                    }}
                  >
                    <Skeleton
                      variant="circular"
                      width={24}
                      height={24}
                      sx={{ bgcolor: "rgba(0, 0, 0, 0.11)" }}
                      className="dark:bg-white/10!"
                      animation="wave"
                    />
                    <Skeleton
                      variant="text"
                      width={180}
                      height={32}
                      sx={{ bgcolor: "rgba(0, 0, 0, 0.11)" }}
                      className="dark:bg-white/10!"
                      animation="wave"
                    />
                  </Box>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    {[1, 2, 3, 4].map((item) => (
                      <Box
                        key={item}
                        sx={{ display: "flex", alignItems: "start", gap: 2 }}
                      >
                        <Skeleton
                          variant="rounded"
                          width={48}
                          height={48}
                          sx={{ bgcolor: "rgba(0, 0, 0, 0.11)" }}
                          className="dark:bg-white/10!"
                          animation="wave"
                        />
                        <div>
                          <Skeleton
                            variant="text"
                            width={80}
                            height={20}
                            sx={{ mb: 0.5, bgcolor: "rgba(0, 0, 0, 0.11)" }}
                            className="dark:bg-white/10!"
                            animation="wave"
                          />
                          <Skeleton
                            variant="text"
                            width={100}
                            height={24}
                            sx={{ bgcolor: "rgba(0, 0, 0, 0.11)" }}
                            className="dark:bg-white/10!"
                            animation="wave"
                          />
                        </div>
                      </Box>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card
                sx={{ bgcolor: "background.paper" }}
                className="dark:bg-base-100! shadow-lg"
              >
                <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mb: { xs: 2, sm: 3 },
                    }}
                  >
                    <Skeleton
                      variant="circular"
                      width={24}
                      height={24}
                      sx={{ bgcolor: "rgba(0, 0, 0, 0.11)" }}
                      className="dark:bg-white/10!"
                      animation="wave"
                    />
                    <Skeleton
                      variant="text"
                      width={120}
                      height={32}
                      sx={{ bgcolor: "rgba(0, 0, 0, 0.11)" }}
                      className="dark:bg-white/10!"
                      animation="wave"
                    />
                  </Box>
                  <Skeleton
                    variant="text"
                    width="100%"
                    height={20}
                    sx={{ mb: 1, bgcolor: "rgba(0, 0, 0, 0.11)" }}
                    className="dark:bg-white/10!"
                    animation="wave"
                  />
                  <Skeleton
                    variant="text"
                    width="95%"
                    height={20}
                    sx={{ mb: 1, bgcolor: "rgba(0, 0, 0, 0.11)" }}
                    className="dark:bg-white/10!"
                    animation="wave"
                  />
                  <Skeleton
                    variant="text"
                    width="90%"
                    height={20}
                    sx={{ bgcolor: "rgba(0, 0, 0, 0.11)" }}
                    className="dark:bg-white/10!"
                    animation="wave"
                  />
                </CardContent>
              </Card>
              <Skeleton
                variant="rounded"
                width="100%"
                height={48}
                sx={{ bgcolor: "rgba(0, 0, 0, 0.11)" }}
                className="dark:bg-white/10!"
                animation="wave"
              />
            </div>
          </div>
        </div>
        <div className="mt-12 sm:mt-16 lg:mt-20">
          <Card
            sx={{ bgcolor: "background.paper" }}
            className="dark:bg-base-100! shadow-xl"
          >
            <CardContent sx={{ p: { xs: 2, sm: 3, lg: 4 } }}>
              <Skeleton
                variant="text"
                width={200}
                sx={{
                  height: { xs: 32, sm: 40, lg: 48 },
                  mb: { xs: 3, sm: 4 },
                  bgcolor: "rgba(0, 0, 0, 0.11)",
                }}
                className="dark:bg-white/10!"
                animation="wave"
              />
              <div className="space-y-6 sm:space-y-8">
                {[1, 2, 3].map((item) => (
                  <Box
                    key={item}
                    sx={{ display: "flex", gap: { xs: 1.5, sm: 2 } }}
                  >
                    <Skeleton
                      variant="circular"
                      sx={{
                        width: { xs: 40, sm: 48 },
                        height: { xs: 40, sm: 48 },
                        bgcolor: "rgba(0, 0, 0, 0.11)",
                      }}
                      className="dark:bg-white/10!"
                      animation="wave"
                    />
                    <div className="flex-1">
                      <Box
                        sx={{
                          bgcolor: "action.hover",
                          borderRadius: 4,
                          p: { xs: 2, sm: 2.5 },
                        }}
                        className="dark:bg-base-200!"
                      >
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            mb: 1,
                          }}
                        >
                          <Skeleton
                            variant="text"
                            width={120}
                            height={20}
                            sx={{ bgcolor: "rgba(0, 0, 0, 0.11)" }}
                            className="dark:bg-white/10!"
                            animation="wave"
                          />
                          <Skeleton
                            variant="text"
                            width={80}
                            height={20}
                            sx={{ bgcolor: "rgba(0, 0, 0, 0.11)" }}
                            className="dark:bg-white/10!"
                            animation="wave"
                          />
                        </Box>
                        <Skeleton
                          variant="text"
                          width="100%"
                          height={20}
                          sx={{ mb: 0.5, bgcolor: "rgba(0, 0, 0, 0.11)" }}
                          className="dark:bg-white/10!"
                          animation="wave"
                        />
                        <Skeleton
                          variant="text"
                          width="80%"
                          height={20}
                          sx={{ bgcolor: "rgba(0, 0, 0, 0.11)" }}
                          className="dark:bg-white/10!"
                          animation="wave"
                        />
                      </Box>
                    </div>
                  </Box>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </Container>
    </section>
  );
};

export default BookDetailsSkeleton;
