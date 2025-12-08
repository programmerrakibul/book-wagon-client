import { BsBoxSeam } from "react-icons/bs";
import { FaTag, FaUser } from "react-icons/fa";
import { Link } from "react-router";

const BookCard = ({ book }) => {
  const { _id, bookName, bookImage, author, price, quantity } = book || {};

  return (
    <>
      <Link
        to={`/book-details/${_id}`}
        className="relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group aspect-3/4 max-h-64 w-full"
      >
        <img
          src={bookImage}
          alt={bookName}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />

        {quantity > 0 ? (
          <div className="absolute top-3 right-3 badge badge-success badge-sm sm:badge-md gap-1 shadow-lg">
            <BsBoxSeam className="text-xs" />
            {quantity}
          </div>
        ) : (
          <div className="absolute top-3 right-3 badge badge-error badge-sm sm:badge-md shadow-lg">
            Out of Stock
          </div>
        )}

        <div className="absolute inset-0 bg-linear-to-t from-secondary-content/90 via-secondary-content/70 to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 sm:p-6">
          {/* Book Name */}
          <h2 className="text-primary font-bold text-xl mb-2 sm:mb-3 line-clamp-2">
            {bookName}
          </h2>

          <div className="space-y-1 sm:space-y-2">
            {/* Author */}
            <div className="flex items-center gap-2 text-primary">
              <FaUser className="shrink-0 text-sm" />
              <span className="truncate text-sm">{author}</span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-2 text-primary">
              <FaTag className="shrink-0 text-sm" />
              <span className="font-bold text-lg">৳ {price}</span>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default BookCard;
