import { useParams, Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import {
  FaBook,
  FaUser,
  FaTag,
  FaFileAlt,
  FaLayerGroup,
  FaCheckCircle,
  FaTimesCircle,
  FaShoppingCart,
  FaArrowLeft,
  FaRegHeart,
  FaHeart,
} from "react-icons/fa";
import { BsBoxSeam } from "react-icons/bs";
import { MdCategory } from "react-icons/md";
import Container from "../shared/Container/Container";
import usePublicAxios from "../../hooks/usePublicAxios";
import Button from "../../components/Button/Button";
import { useState } from "react";
import OrderModal from "../../components/OrderModal/OrderModal";
import useAuth from "../../hooks/useAuth";
import Loading from "../../components/Loading/Loading";
import useSecureAxios from "../../hooks/useSecureAxios";
import { toast } from "sonner";
import { getAlert } from "../../utilities/getAlert";

const BookDetails = () => {
  const { id } = useParams();
  const publicAxios = usePublicAxios();
  const secureAxios = useSecureAxios();
  const [open, setOpen] = useState(false);
  const { user } = useAuth();

  const { data: book = {}, isLoading: bookLoading } = useQuery({
    queryKey: ["book-details", id],
    queryFn: async () => {
      const { data } = await publicAxios.get(`/books/${id}`);
      return data?.book;
    },
  });

  const {
    data: inWishlist,
    isLoading: wishlistLoading,
    refetch,
  } = useQuery({
    queryKey: ["inWishlist", id, user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const { data } = await secureAxios.get(
        `/wishlist/${user?.email}/check/${id}`
      );

      return data?.inWishlist;
    },
  });

  if (bookLoading || wishlistLoading) {
    return <Loading message="Book is loading..." />;
  }

  const closeModal = () => {
    setOpen(false);
  };

  const {
    _id,
    bookName,
    bookImage,
    author,
    price,
    quantity,
    category,
    description,
    pageCount,
    subcategory,
    librarianEmail,
  } = book;

  const isLibrarian = librarianEmail === user?.email;

  const addToWishlist = async () => {
    try {
      const { data } = await secureAxios.post(`/wishlist/${user.email}/add`, {
        bookId: _id,
      });

      if (data.success) {
        refetch();

        getAlert({
          title: "Successfully added to wishlist.",
        });
      }
    } catch (err) {
      console.log(err);

      toast.error("Add to wishlist failed! Please try again.");
    }
  };

  const removeFromWishlist = async () => {
    try {
      const { data } = await secureAxios.delete(
        `/wishlist/${user.email}/remove/${id}`
      );

      if (data.success) {
        refetch();

        getAlert({
          title: "Successfully removed from wishlist.",
        });
      }
    } catch (err) {
      console.log(err);

      toast.error("Remove from wishlist failed! Please try again.");
    }
  };

  return (
    <>
      <title>{`${bookName} - BookWagon`}</title>

      <section className="py-8 sm:py-12 lg:py-16 bg-linear-to-br from-secondary/5 via-primary/5 to-secondary/5">
        <Container>
          {/* Back Button */}
          <Link
            to={-1}
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-semibold mb-6 sm:mb-8 transition-colors"
          >
            <FaArrowLeft />
            <span className="text-sm sm:text-base">Go Back</span>
          </Link>

          <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-12">
            {/* Book Image */}
            <div className="flex-1 lg:max-w-md">
              <div className="card bg-base-100 shadow-xl overflow-hidden sticky top-24">
                <figure className="relative">
                  <img
                    src={bookImage}
                    alt={bookName}
                    className="w-full h-80 sm:h-96 lg:h-112 object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    {quantity > 0 ? (
                      <div className="badge badge-success gap-2 p-3 sm:p-4 shadow-lg">
                        <BsBoxSeam className="text-sm sm:text-base" />
                        <span className="font-semibold text-sm sm:text-base">
                          {quantity} in stock
                        </span>
                      </div>
                    ) : (
                      <div className="badge badge-error gap-2 p-3 sm:p-4 shadow-lg">
                        <FaTimesCircle className="text-sm sm:text-base" />
                        <span className="font-semibold text-sm sm:text-base">
                          Out of Stock
                        </span>
                      </div>
                    )}
                  </div>
                </figure>
              </div>
            </div>

            {/* Book Details */}
            <div className="flex-1">
              <div className="space-y-6 sm:space-y-8">
                {/* Title & Author */}
                <div>
                  <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
                    <h1 className="flex-1 text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-800">
                      {bookName}
                    </h1>
                    {user &&
                      !isLibrarian &&
                      (inWishlist ? (
                        <button
                          onClick={removeFromWishlist}
                          data-tip="Remove from Wishlist"
                          className="wish_heart"
                        >
                          <FaHeart className="text-error" />
                        </button>
                      ) : (
                        <button
                          onClick={addToWishlist}
                          data-tip="Add to Wishlist"
                          className="wish_heart"
                        >
                          <FaRegHeart className="text-error" />
                        </button>
                      ))}
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 text-base sm:text-lg">
                    <FaUser className="text-primary" />
                    <span className="font-medium">by {author}</span>
                  </div>
                </div>

                {/* Price */}
                <div className="card bg-linear-to-br from-primary/10 to-secondary/10 border-2 border-primary/20">
                  <div className="card-body p-4 sm:p-6">
                    <div className="flex items-center gap-3">
                      <FaTag className="text-2xl sm:text-3xl text-primary" />
                      <div>
                        <p className="text-xs sm:text-sm text-gray-600 mb-1">
                          Price
                        </p>
                        <p className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary">
                          ৳ {price}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Book Information */}
                <div className="card bg-base-100 shadow-lg">
                  <div className="card-body p-4 sm:p-6">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 flex items-center gap-2">
                      <FaBook className="text-primary" />
                      Book Information
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      {/* Category */}
                      <div className="flex items-start gap-3">
                        <div className="p-2 sm:p-3 bg-primary/10 rounded-lg">
                          <MdCategory className="text-lg sm:text-xl text-primary" />
                        </div>
                        <div>
                          <p className="text-xs sm:text-sm text-gray-500 mb-1">
                            Category
                          </p>
                          <p className="text-sm sm:text-base font-semibold text-gray-800">
                            {category}
                          </p>
                        </div>
                      </div>

                      {/* Subcategory */}
                      <div className="flex items-start gap-3">
                        <div className="p-2 sm:p-3 bg-secondary/10 rounded-lg">
                          <FaLayerGroup className="text-lg sm:text-xl text-secondary" />
                        </div>
                        <div>
                          <p className="text-xs sm:text-sm text-gray-500 mb-1">
                            Subcategory
                          </p>
                          <p className="text-sm sm:text-base font-semibold text-gray-800">
                            {subcategory}
                          </p>
                        </div>
                      </div>

                      {/* Page Count */}
                      <div className="flex items-start gap-3">
                        <div className="p-2 sm:p-3 bg-primary/10 rounded-lg">
                          <FaFileAlt className="text-lg sm:text-xl text-primary" />
                        </div>
                        <div>
                          <p className="text-xs sm:text-sm text-gray-500 mb-1">
                            Pages
                          </p>
                          <p className="text-sm sm:text-base font-semibold text-gray-800">
                            {pageCount} pages
                          </p>
                        </div>
                      </div>

                      {/* Availability */}
                      <div className="flex items-start gap-3">
                        <div className="p-2 sm:p-3 bg-secondary/10 rounded-lg">
                          {quantity > 0 ? (
                            <FaCheckCircle className="text-lg sm:text-xl text-success" />
                          ) : (
                            <FaTimesCircle className="text-lg sm:text-xl text-error" />
                          )}
                        </div>
                        <div>
                          <p className="text-xs sm:text-sm text-gray-500 mb-1">
                            Availability
                          </p>
                          <p
                            className={`text-sm sm:text-base font-semibold ${
                              quantity > 0 ? "text-success" : "text-error"
                            }`}
                          >
                            {quantity > 0 ? "In Stock" : "Out of Stock"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                {description && (
                  <div className="card bg-base-100 shadow-lg">
                    <div className="card-body p-4 sm:p-6">
                      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4 flex items-center gap-2">
                        <FaFileAlt className="text-primary" />
                        Description
                      </h2>
                      <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed">
                        {description}
                      </p>
                    </div>
                  </div>
                )}

                {/* Order Button */}
                {user && !isLibrarian && (
                  <Button
                    handleClick={() => setOpen(true)}
                    className="btn-block"
                    disabled={quantity === 0}
                  >
                    <FaShoppingCart className="text-lg sm:text-xl" />
                    {quantity > 0 ? "Order Now" : "Out of Stock"}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <OrderModal isOpen={open} closeModal={closeModal} book={book} />
    </>
  );
};

export default BookDetails;
