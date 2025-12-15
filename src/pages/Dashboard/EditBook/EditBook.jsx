import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { FaBook, FaSave } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { BsFileText, BsBoxSeam } from "react-icons/bs";
import { useState } from "react";
import { toast } from "sonner";
import MyInput from "../../../components/MyInput/MyInput";
import MyLabel from "../../../components/MyLabel/MyLabel";
import Button from "../../../components/Button/Button";
import ErrorMessage from "../../../components/ErrorMessage/ErrorMessage";
import Container from "../../shared/Container/Container";
import useSecureAxios from "../../../hooks/useSecureAxios";
import ActionSpinner from "../../../components/ActionSpinner/ActionSpinner";
import { getAlert } from "../../../utilities/getAlert";
import Loading from "../../../components/Loading/Loading";
import Heading from "../../../components/Heading/Heading";

const EditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const secureAxios = useSecureAxios();
  const [loading, setLoading] = useState(false);

  const { data: book, isLoading } = useQuery({
    queryKey: ["book", id],
    queryFn: async () => {
      const { data } = await secureAxios.get(`/books/${id}`);
      return data.book;
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    values: book
      ? {
          bookName: book.bookName,
          pageCount: book.pageCount,
          quantity: book.quantity,
          price: book.price,
          description: book.description,
        }
      : {},
  });

  const onSubmit = async (bookData) => {
    setLoading(true);

    Object.entries(bookData).forEach(([key, value]) => {
      if (typeof value === "string") {
        value = value.trim();
      }

      if (["quantity", "pageCount", "price"].includes(key)) {
        bookData[key] = Number(value);
      }
    });

    try {
      const { data } = await secureAxios.patch(`/books/${id}`, bookData);

      if (data.modifiedCount) {
        getAlert({ title: "Book updated successfully!" });
        navigate("/dashboard/my-books");
      }
    } catch {
      toast.error("Failed to update the book. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) {
    return <Loading message="Book is loading..." />;
  }

  return (
    <>
      <title>Edit Book - BookWagon</title>

      <section className="bg-linear-to-br from-secondary/10 via-primary/5 to-secondary/10 py-6 sm:py-10 lg:py-16">
        <Container>
          {/* Header */}
          <Heading
            title="Edit Book"
            subtitle="Update the book information below"
            size="large"
          />

          {/* Form Card */}
          <div className="card bg-base-100 shadow-2xl border border-primary/20 rounded-xl sm:rounded-2xl overflow-hidden">
            <div className="card-body p-4 sm:p-6 lg:p-10">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4 sm:space-y-6"
              >
                {/* Name & Price | Page Count & Quantity - Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
                  {/* Left Column: Name & Price */}
                  <div className="space-y-4 sm:space-y-6">
                    {/* Book Name */}
                    <div className="space-y-1 sm:space-y-2">
                      <MyLabel
                        htmlFor="bookName"
                        label={
                          <>
                            Book Name <span className="text-error">*</span>
                          </>
                        }
                      />

                      <div className="relative group">
                        <FaBook className="absolute left-3 top-1/2 -translate-y-1/2  group-focus-within:text-primary transition-colors text-sm sm:text-base" />

                        <MyInput
                          id="bookName"
                          disabled={loading}
                          placeholder="Enter book name"
                          className="pl-10"
                          {...register("bookName", {
                            required: "Book name is required",
                            minLength: {
                              value: 5,
                              message:
                                "Book name must be at least 5 characters",
                            },
                            validate: (value) =>
                              value.trim() !== "" ||
                              "Book name cannot be empty",
                          })}
                        />
                      </div>

                      <ErrorMessage message={errors.bookName?.message} />
                    </div>

                    {/* Price */}
                    <div className="space-y-1 sm:space-y-2">
                      <MyLabel
                        htmlFor="price"
                        label={
                          <>
                            Price (৳) <span className="text-error">*</span>
                          </>
                        }
                      />

                      <div className="relative group">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2  group-focus-within:text-primary transition-colors text-sm sm:text-base font-semibold">
                          ৳
                        </span>

                        <MyInput
                          id="price"
                          type="number"
                          step="0.01"
                          disabled={loading}
                          placeholder="0.00"
                          className="pl-10"
                          {...register("price", {
                            required: "Price is required",
                            min: {
                              value: 0,
                              message: "Price must be positive",
                            },
                          })}
                        />
                      </div>

                      <ErrorMessage message={errors.price?.message} />
                    </div>
                  </div>

                  {/* Right Column: Page Count & Quantity */}
                  <div className="space-y-4 sm:space-y-6">
                    {/* Page Count */}
                    <div className="space-y-1 sm:space-y-2">
                      <MyLabel
                        htmlFor="pageCount"
                        label={
                          <>
                            Page Count <span className="text-error">*</span>
                          </>
                        }
                      />

                      <div className="relative group">
                        <BsFileText className="absolute left-3 top-1/2 -translate-y-1/2  group-focus-within:text-primary transition-colors text-sm sm:text-base" />

                        <MyInput
                          id="pageCount"
                          type="number"
                          disabled={loading}
                          placeholder="300"
                          className="pl-10"
                          {...register("pageCount", {
                            required: "Page count is required",
                            min: {
                              value: 1,
                              message: "Page count must be at least 1",
                            },
                          })}
                        />
                      </div>

                      <ErrorMessage message={errors.pageCount?.message} />
                    </div>

                    {/* Quantity */}
                    <div className="space-y-1 sm:space-y-2">
                      <MyLabel
                        htmlFor="quantity"
                        label={
                          <>
                            Quantity <span className="text-error">*</span>
                          </>
                        }
                      />

                      <div className="relative group">
                        <BsBoxSeam className="absolute left-3 top-1/2 -translate-y-1/2  group-focus-within:text-primary transition-colors text-sm sm:text-base" />

                        <MyInput
                          id="quantity"
                          type="number"
                          disabled={loading}
                          placeholder="10"
                          className="pl-10"
                          {...register("quantity", {
                            required: "Quantity is required",
                            min: {
                              value: 0,
                              message: "Quantity cannot be negative",
                            },
                          })}
                        />
                      </div>

                      <ErrorMessage message={errors.quantity?.message} />
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-1 sm:space-y-2">
                  <MyLabel
                    htmlFor="description"
                    label={
                      <>
                        Book Description <span className="text-error">*</span>
                      </>
                    }
                  />

                  <textarea
                    id="description"
                    disabled={loading}
                    placeholder="Enter a detailed description of the book..."
                    className="textarea textarea-bordered w-full min-h-28 text-sm sm:text-base"
                    {...register("description", {
                      required: "Description is required",
                      minLength: {
                        value: 10,
                        message: "Description must be at least 10 characters",
                      },
                      validate: (value) =>
                        value.trim() !== "" ||
                        "Book description cannot be empty",
                    })}
                  />

                  <ErrorMessage message={errors.description?.message} />
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-6 sm:pt-8">
                  <button
                    type="button"
                    onClick={() => navigate("/dashboard/my-books")}
                    disabled={loading}
                    className="btn btn-outline btn-error gap-2 sm:flex-1"
                  >
                    <MdCancel className="text-lg" />
                    Cancel
                  </button>
                  <Button
                    type="submit"
                    disabled={loading}
                    className="sm:flex-1 gap-2"
                  >
                    {loading ? (
                      <ActionSpinner />
                    ) : (
                      <>
                        <FaSave className="text-lg" />
                        <span>Update Book</span>
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default EditBook;
