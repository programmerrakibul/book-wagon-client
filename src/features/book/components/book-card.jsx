import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Link, useNavigate } from "react-router";
import FavoriteButton from "./favorite-button";

function BookCard({ book = {} }) {
  const navigate = useNavigate();
  const name = book.name;
  const image = book.photoUrl;
  const discount = book.discount > 0;
  const originalPrice = book.price;
  const discountedPrice = discount
    ? book.discountedPrice || originalPrice
    : originalPrice;

  return (
    <>
      <Card
        onClick={() => {
          navigate(`/book-details/${book._id}`);
        }}
        className="overflow-hidden transition-shadow duration-200 hover:shadow-md py-0 gap-0 group h-full cursor-pointer"
      >
        <div
          className={
            "aspect-3/2 h-[clamp(150px,35vw,270px)] sm:h-44 md:h-48 lg:h-56 w-full overflow-hidden bg-muted relative"
          }
        >
          <img
            src={image}
            alt={name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />

          {discount && (
            <Badge
              variant="destructive"
              className="absolute top-3 left-3"
            >{`-${book.discount}% off`}</Badge>
          )}

          <div className="absolute top-3 right-3">
            <FavoriteButton
              id={book._id}
              email={book.librarianId?.email}
              className="bg-background/50 backdrop-blur-md"
            />
          </div>
        </div>
        <CardContent className="flex flex-col gap-2 p-4">
          <CardTitle className="line-clamp-1 sm:line-clamp-2 sm:min-h-10 text-sm leading-snug group-hover:text-primary">
            {name}
          </CardTitle>
          <div className="flex items-center justify-start gap-2">
            <p className="mt-auto pt-1 text-sm font-bold">
              ৳{(discountedPrice || originalPrice).toLocaleString()}
            </p>

            {discount && (
              <p className="text-xs text-destructive line-through">
                ৳{originalPrice.toLocaleString()}
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </>
  );
}

export { BookCard };
