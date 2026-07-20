import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Link } from "react-router";

function BookCard({ book = {} }) {
  const name = book.name;
  const image = book.photoUrl;
  const discount = book.discount > 0;
  const originalPrice = book.price;
  const discountedPrice = discount
    ? book.discountedPrice || originalPrice
    : originalPrice;

  return (
    <Link to={`/book-details/${book._id}`} className="group block h-full">
      <Card className="overflow-hidden transition-shadow duration-200 hover:shadow-md py-0 gap-0 h-full">
        <div
          className={
            "aspect-2/3 h-[clamp(80px,30vw,200px)] md:h-40 w-full overflow-hidden bg-muted"
          }
        >
          <img
            src={image}
            alt={name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <CardContent className="flex flex-col gap-2 p-4">
          <CardTitle className="line-clamp-1 md:line-clamp-2 md:min-h-10 text-sm font-semibold leading-snug group-hover:text-primary">
            {name}
          </CardTitle>
          <p className="text-xs text-muted-foreground line-clamp-1 truncate">
            {book.author}
          </p>

          <span className="w-fit rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary line-clamp-1">
            {book.categoryId.name}
          </span>
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
    </Link>
  );
}

export { BookCard };
