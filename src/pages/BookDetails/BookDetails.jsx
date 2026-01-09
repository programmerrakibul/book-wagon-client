import { useParams } from "react-router";
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
  FaRegHeart,
  FaHeart,
} from "react-icons/fa";
import { BsBoxSeam } from "react-icons/bs";
import { MdCategory } from "react-icons/md";
import { formatDistanceToNow } from "date-fns";
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
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Avatar from "../../components/Avatar/Avatar";
import BookDetailsSkeleton from "../../components/skeletons/BookDetailsSkeleton";
import BackButton from "../../components/BackButton/BackButton";

const BookDetails = () => {
  const { id } = useParams();
  const publicAxios = usePublicAxios();
  const secureAxios = useSecureAxios();
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const [comment, setComment] = useState("");
  const [error, setError] = useState(null);

  const { data: book = {}, isLoading: bookLoading } = useQuery({
    queryKey: ["book-details", id],
    queryFn: async () => {
      const { data } = await publicAxios.get(`/books/${id}`);
      return data?.book;
    },
  });

  const {
    data: comments = [],
    isLoading: commentLoading,
    refetch: refetchComments,
  } = useQuery({
    queryKey: ["comments", id],
    queryFn: async () => {
      const { data } = await secureAxios.get(`/comments/${id}`);

      return data;
    },
  });

  const {
    data: isOrdered,
    isLoading: isOrderedLoading,
    refetch: isOrderedRefetch,
  } = useQuery({
    queryKey: ["is-ordered", user?.email, id],
    enabled: !!user?.email,
    queryFn: async () => {
      const { data } = await secureAxios.get(
        `/orders/${id}/user/${user?.email}`
      );

      return data;
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
    return <BookDetailsSkeleton />;
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
    } catch {
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
    } catch {
      toast.error("Remove from wishlist failed! Please try again.");
    }
  };

  const handlePostComment = async () => {
    setError(null);

    if (!comment.trim()) {
      return setError("Please write a comment before posting.");
    }

    const newComment = {
      customerName: user.displayName,
      customerImage: user.photoURL,
      customerEmail: user.email,
      comment: comment.trim(),
      bookId: _id,
    };

    try {
      const { data } = await secureAxios.post("/comments", newComment);

      if (data.success) {
        setError(null);
        setComment("");
        refetchComments();

        getAlert({
          title: `Successfully reviewed for ${bookName} book!`,
        });
      }
    } catch {
      toast.error("Comment failed! Please try  again.");
    } finally {
      setError(null);
    }
  };

  return (
    <>
      <title>{`${bookName} - BookWagon`}</title>

      <section className="py-8 sm:py-12 lg:py-16 bg-linear-to-br from-secondary/5 via-primary/5 to-secondary/5">
        <Container>
          {/* Back Button */}
          <BackButton label="Go Back" />

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
                    <h1 className="flex-1 text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold">
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
                  <div className="flex items-center gap-2 text-base sm:text-lg">
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
                        <p className="text-xs sm:text-sm mb-1">Price</p>
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
                    <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 flex items-center gap-2">
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
                          <p className="text-xs sm:text-sm mb-1">Category</p>
                          <p className="text-sm sm:text-base font-semibold">
                            {category}
                          </p>
                        </div>
                      </div>

                      {/* Subcategory */}
                      {subcategory && (
                        <div className="flex items-start gap-3">
                          <div className="p-2 sm:p-3 bg-secondary/10 rounded-lg">
                            <FaLayerGroup className="text-lg sm:text-xl text-secondary" />
                          </div>
                          <div>
                            <p className="text-xs sm:text-sm mb-1">
                              Subcategory
                            </p>
                            <p className="text-sm sm:text-base font-semibold">
                              {subcategory}
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Page Count */}
                      <div className="flex items-start gap-3">
                        <div className="p-2 sm:p-3 bg-primary/10 rounded-lg">
                          <FaFileAlt className="text-lg sm:text-xl text-primary" />
                        </div>
                        <div>
                          <p className="text-xs sm:text-sm mb-1">Pages</p>
                          <p className="text-sm sm:text-base font-semibold">
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
                          <p className="text-xs sm:text-sm mb-1">
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
                      <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 flex items-center gap-2">
                        <FaFileAlt className="text-primary" />
                        Description
                      </h2>
                      <p className="text-sm sm:text-base lg:text-lg">
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

          {/* Comments Section */}
          <div className="mt-12 sm:mt-16 lg:mt-20">
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body p-4 sm:p-6 lg:p-8">
                {/* Comments Header */}
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-6 sm:mb-8">
                  Reader Reviews ({comments?.length || 0})
                </h2>

                {/* Add Comment Form */}
                {user &&
                  !isLibrarian &&
                  isOrdered &&
                  (isOrderedLoading ? (
                    <Loading />
                  ) : (
                    <div className="mb-8 sm:mb-10">
                      <div className="flex gap-3 sm:gap-4">
                        <div className="avatar shrink-0">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full">
                            <img src={user.photoURL} alt={user.displayName} />
                          </div>
                        </div>
                        <div className="flex-1">
                          <textarea
                            onChange={(e) => setComment(e.target.value)}
                            value={comment}
                            placeholder="Share your thoughts about this book..."
                            className="textarea textarea-bordered w-full text-sm sm:text-base min-h-[100px] sm:min-h-[120px] focus:outline-primary"
                          ></textarea>
                          <ErrorMessage message={error} />
                          <div className="flex justify-end mt-3">
                            <Button handleClick={handlePostComment}>
                              Post Comment
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                {/* Comments List */}
                {commentLoading ? (
                  <Loading />
                ) : comments?.length > 0 ? (
                  <div className="space-y-6 sm:space-y-8">
                    {comments.map((comment, index) => (
                      <div key={index} className="flex gap-3 sm:gap-4">
                        <Avatar
                          src={comment.customerImage}
                          alt={comment.customerName}
                          size="size-10 sm:size-12"
                        />

                        <div className="flex-1">
                          <div className="bg-base-200 rounded-2xl p-4 sm:p-5">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                              <h4 className="font-bold text-sm sm:text-base">
                                {comment.customerName}
                              </h4>
                              <span className="text-xs sm:text-sm">
                                {formatDistanceToNow(
                                  new Date(comment.createdAt),
                                  {
                                    addSuffix: true,
                                  }
                                )}
                              </span>
                            </div>
                            <p className="text-sm sm:text-base leading-relaxed">
                              {comment.comment}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-sm sm:text-base">
                      No reviews yet. Be the first to share your thoughts!
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <OrderModal
        isOpen={open}
        closeModal={closeModal}
        book={book}
        refetch={isOrderedRefetch}
      />
    </>
  );
};

export default BookDetails;
