import { Link } from "react-router";
import { Card, CardContent } from "@/components/ui/card";

function BookCard({ book }) {
  const name = book.name || book.bookName;
  const image = book.photoUrl || book.image || book.bookImage;

  return (
    <Link to={`/book-details/${book._id}`} className="group block">
      <Card className="overflow-hidden transition-shadow duration-200 hover:shadow-md">
        <div className="aspect-3/4 overflow-hidden bg-muted">
          {image ? (
            <img
              src={image}
              alt={name}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-xs text-muted-foreground">
              No Image
            </div>
          )}
        </div>
        <CardContent className="flex flex-col gap-2 p-4">
          <h3 className="line-clamp-2 text-sm font-semibold leading-snug group-hover:text-primary">
            {name}
          </h3>
          {book.author && (
            <p className="text-xs text-muted-foreground">{book.author}</p>
          )}
          {book.category && (
            <span className="w-fit rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
              {book.category}
            </span>
          )}
          <p className="mt-auto pt-1 text-sm font-bold">
            ${book.price}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}

export { BookCard };
