import { useForm } from "react-hook-form";
import { FaBook, FaUser, FaCalendar, FaList } from "react-icons/fa";
import { MdCategory } from "react-icons/md";
import { BsFileText, BsBoxSeam } from "react-icons/bs";
import MyInput from "../../../components/MyInput/MyInput";
import MyLabel from "../../../components/MyLabel/MyLabel";
import Button from "../../../components/Button/Button";
import ErrorMessage from "../../../components/ErrorMessage/ErrorMessage";
import Container from "../../shared/Container/Container";
import useAuth from "../../../hooks/useAuth";
import useSecureAxios from "../../../hooks/useSecureAxios";
import { getAlert } from "../../../utilities/getAlert";
import { toast } from "sonner";
import { useState } from "react";
import ActionSpinner from "../../../components/ActionSpinner/ActionSpinner";

const AddBook = () => {
  const [loading, setLoading] = useState(false);
  const secureAxios = useSecureAxios();
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      category: "",
      status: "",
      format: "",
    },
  });

  const onSubmit = async (bookData) => {
    setLoading(true);

    Object.entries(bookData).forEach(([key, value]) => {
      if (typeof value === "string") {
        bookData[key] = value.trim();
      }

      if (["quantity", "pageCount", "publicationYear", "price"].includes(key)) {
        bookData[key] = Number(value);
      }
    });

    bookData.librarianEmail = user.email;

    try {
      const { data } = await secureAxios.post("/books", bookData);

      if (data.insertedId) {
        reset();

        getAlert({ title: "The book has been added successfully!" });
      }
    } catch {
      toast.error("Failed to add the book. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <title>Add New Book - BookWagon</title>

      <section className="bg-linear-to-br from-secondary/10 via-primary/5 to-secondary/10 py-6 sm:py-10 lg:py-16 px-3 sm:px-0">
        <Container>
          {/* Header */}
          <div className="text-center mb-6 sm:mb-10 lg:mb-12 animate-fade-in">
            <div className="inline-block p-3 sm:p-4 bg-primary/10 rounded-full mb-3 sm:mb-4">
              <FaBook className="text-3xl sm:text-4xl lg:text-5xl text-primary" />
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent mb-2 sm:mb-3">
              Add New Book
            </h1>
            <p className="text-xs sm:text-sm lg:text-base text-gray-600 max-w-2xl mx-auto px-4">
              Fill in the details below to add a new book to your library
              collection
            </p>
          </div>

          {/* Form Card */}
          <div className="card bg-secondary/3 shadow-2xl border border-primary/50 rounded-xl sm:rounded-2xl overflow-hidden">
            <div className="card-body p-4 sm:p-6 lg:p-10">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4 sm:space-y-6"
              >
                {/* Section: Basic Information */}
                <div className="space-y-4 sm:space-y-6">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-700 border-l-4 border-primary pl-3 sm:pl-4">
                    Basic Information
                  </h3>

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
                      <FaBook className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors text-sm sm:text-base" />

                      <MyInput
                        id="bookName"
                        disabled={loading}
                        placeholder="Enter book name"
                        className="pl-10"
                        {...register("bookName", {
                          required: "Book name is required",
                          minLength: {
                            value: 5,
                            message: "Book name must be at least 5 characters",
                          },
                          validate: (value) =>
                            value.trim() !== "" || "Book name cannot be empty",
                        })}
                      />
                    </div>

                    <ErrorMessage message={errors.bookName?.message} />
                  </div>
                </div>

                {/* Divider */}
                <div className="divider my-6 sm:my-8"></div>

                {/* Author & Book Image - Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
                  {/* Author */}
                  <div className="space-y-1 sm:space-y-2">
                    <MyLabel
                      htmlFor="author"
                      label={
                        <>
                          Author Name <span className="text-error">*</span>
                        </>
                      }
                    />

                    <div className="relative group">
                      <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors text-sm sm:text-base" />

                      <MyInput
                        id="author"
                        disabled={loading}
                        placeholder="Enter author name"
                        className="pl-10"
                        {...register("author", {
                          required: "Author name is required",
                          minLength: {
                            value: 5,
                            message:
                              "Author name must be at least 5 characters",
                          },
                          validate: (value) =>
                            value.trim() !== "" ||
                            "Author name cannot be empty",
                        })}
                      />
                    </div>

                    <ErrorMessage message={errors.author?.message} />
                  </div>

                  {/* Book Image File */}
                  <div className="space-y-1 sm:space-y-2">
                    <MyLabel
                      htmlFor="bookImage"
                      label={
                        <>
                          Book Cover Image <span className="text-error">*</span>
                        </>
                      }
                    />

                    <MyInput
                      id="bookImage"
                      type="file"
                      disabled={loading}
                      accept="image/*"
                      className="file-input px-0"
                      {...register("bookImage", {
                        required: "Book cover image is required",
                      })}
                    />

                    <ErrorMessage message={errors.bookImage?.message} />
                  </div>
                </div>

                {/* Divider */}
                <div className="divider my-6 sm:my-8"></div>

                {/* Section: Classification */}
                <h3 className="text-base sm:text-lg font-semibold text-gray-700 border-l-4 border-primary pl-3 sm:pl-4 mb-4 sm:mb-6">
                  Classification
                </h3>

                {/* Category & Subcategory - Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  {/* Category */}
                  <div className="space-y-1 sm:space-y-2">
                    <MyLabel
                      htmlFor="category"
                      label={
                        <>
                          Category <span className="text-error">*</span>
                        </>
                      }
                    />
                    <div className="relative">
                      <MdCategory className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm sm:text-base z-10" />

                      <select
                        id="category"
                        className="select pl-10 text-sm sm:text-base bg-white/60 backdrop-blur-lg hover:bg-white/70 focus:bg-white/80 transition-all shadow-sm"
                        defaultValue=""
                        disabled={loading}
                        {...register("category", {
                          required: "Category is required",
                        })}
                      >
                        <option value="" disabled>
                          Select category
                        </option>
                        <option value="Fiction">Fiction</option>
                        <option value="Non-Fiction">Non-Fiction</option>
                        <option value="Science">Science</option>
                        <option value="History">History</option>
                        <option value="Biography">Biography</option>
                        <option value="Self-Help">Self-Help</option>
                        <option value="Technology">Technology</option>
                        <option value="Business">Business</option>
                        <option value="Romance">Romance</option>
                        <option value="Mystery">Mystery</option>
                        <option value="Fantasy">Fantasy</option>
                        <option value="Horror">Horror</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <ErrorMessage message={errors.category?.message} />
                  </div>

                  {/* Subcategory */}
                  <div className="space-y-1 sm:space-y-2">
                    <MyLabel htmlFor="subcategory" label="Subcategory" />
                    <div className="relative group">
                      <MdCategory className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors text-sm sm:text-base" />

                      <MyInput
                        id="subcategory"
                        disabled={loading}
                        placeholder="e.g., Thriller, Adventure"
                        className="pl-10"
                        {...register("subcategory")}
                      />
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="divider my-6 sm:my-8"></div>

                {/* Section: Details */}
                <h3 className="text-base sm:text-lg font-semibold text-gray-700 border-l-4 border-primary pl-3 sm:pl-4 mb-4 sm:mb-6">
                  Book Details
                </h3>

                {/* Publication Year & Page Count - Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  {/* Publication Year */}
                  <div className="space-y-1 sm:space-y-2">
                    <MyLabel
                      htmlFor="publicationYear"
                      label={
                        <>
                          Publication Year <span className="text-error">*</span>
                        </>
                      }
                    />

                    <div className="relative group">
                      <FaCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors text-sm sm:text-base" />

                      <MyInput
                        id="publicationYear"
                        type="number"
                        disabled={loading}
                        placeholder="2024"
                        className="pl-10"
                        {...register("publicationYear", {
                          required: "Publication year is required",
                          min: {
                            value: 1000,
                            message: "Please enter a valid year",
                          },
                          max: {
                            value: new Date().getFullYear() + 1,
                            message: "Year cannot be in the future",
                          },
                        })}
                      />
                    </div>

                    <ErrorMessage message={errors.publicationYear?.message} />
                  </div>

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
                      <BsFileText className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors text-sm sm:text-base" />

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
                </div>

                {/* Format & Quantity - Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  {/* Format */}
                  <div className="space-y-1 sm:space-y-2">
                    <MyLabel
                      htmlFor="format"
                      label={
                        <>
                          Format <span className="text-error">*</span>
                        </>
                      }
                    />

                    <div className="relative">
                      <FaBook className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm sm:text-base z-10" />

                      <select
                        id="format"
                        className="select  pl-10 text-sm sm:text-base bg-white/60 backdrop-blur-lg hover:bg-white/70 focus:bg-white/80 transition-all shadow-sm"
                        disabled={loading}
                        defaultValue=""
                        {...register("format", {
                          required: "Format is required",
                        })}
                      >
                        <option value="" disabled>
                          Select format
                        </option>
                        <option value="Hardcover">Hardcover</option>
                        <option value="Paperback">Paperback</option>
                        <option value="eBook">eBook</option>
                        <option value="Audiobook">Audiobook</option>
                      </select>
                    </div>

                    <ErrorMessage message={errors.format?.message} />
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
                      <BsBoxSeam className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors text-sm sm:text-base" />

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

                {/* Divider */}
                <div className="divider my-6 sm:my-8"></div>

                {/* Section: Pricing & Availability */}
                <h3 className="text-base sm:text-lg font-semibold text-gray-700 border-l-4 border-primary pl-3 sm:pl-4 mb-4 sm:mb-6">
                  Pricing & Availability
                </h3>

                {/* Price & Status - Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
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
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors text-sm sm:text-base font-semibold">
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

                  {/* Status */}
                  <div className="space-y-1 sm:space-y-2">
                    <MyLabel
                      htmlFor="status"
                      label={
                        <>
                          Status <span className="text-error">*</span>
                        </>
                      }
                    />

                    <div className="relative">
                      <FaList className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm sm:text-base z-10" />

                      <select
                        id="status"
                        disabled={loading}
                        className="select select-bordered w-full pl-10 text-sm sm:text-base bg-white/60 backdrop-blur-lg hover:bg-white/70 focus:bg-white/80 transition-all shadow-sm"
                        defaultValue=""
                        {...register("status", {
                          required: "Status is required",
                        })}
                      >
                        <option value="" disabled>
                          Select status
                        </option>
                        <option value="published">Published</option>
                        <option value="unpublished">Unpublished</option>
                      </select>
                    </div>

                    <ErrorMessage message={errors.status?.message} />
                  </div>
                </div>

                {/* Divider */}
                <div className="divider my-6 sm:my-8"></div>

                {/* Section: Description */}
                <h3 className="text-base sm:text-lg font-semibold text-gray-700 border-l-4 border-primary pl-3 sm:pl-4 mb-4 sm:mb-6">
                  Description
                </h3>

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
                    className="textarea w-full sm:min-h-28 text-sm sm:text-base focus:ring-2 focus:ring-primary/20 resize-none"
                    {...register("description", {
                      required: "Description is required",
                      minLength: {
                        value: 10,
                        message: "Description must be at least 10 characters",
                      },
                    })}
                  />

                  <ErrorMessage message={errors.description?.message} />
                </div>

                {/* Submit Button */}
                <div className="pt-6 sm:pt-8">
                  <Button
                    type="submit"
                    disabled={loading}
                    className="btn-block text-sm sm:text-base lg:text-lg py-3 sm:py-4 hover:scale-[1.02] active:scale-[0.98] transition-transform shadow-lg hover:shadow-xl"
                  >
                    {loading ? (
                      <ActionSpinner />
                    ) : (
                      <>
                        <FaBook className="text-lg sm:text-xl" />
                        <span>Add Book to Library</span>
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

export default AddBook;
