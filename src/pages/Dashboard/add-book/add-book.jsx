import ActionSpinner from "@/components/ActionSpinner/ActionSpinner";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import Heading from "@/components/Heading/Heading";
import MyInput from "@/components/MyInput/MyInput";
import MyLabel from "@/components/MyLabel/MyLabel";
import Button from "@/components/ui/button";
import Container from "@/components/ui/container";
import {
  useBookFormats,
  useCategories,
  useSubCategories,
} from "@/hooks/use-categories";
import axiosInstance from "@/lib/axios";
import { getAlert } from "@/utils/getAlert";
import { uploadImage } from "@/utils/uploadImage";
import { Controller, useForm } from "react-hook-form";
import { BsBoxSeam, BsFileText, BsPercent } from "react-icons/bs";
import {
  FaBook,
  FaCalendar,
  FaList,
  FaUser,
  FaWeightHanging,
} from "react-icons/fa";
import { MdCategory } from "react-icons/md";
import { toast } from "sonner";
import FormField from "./form-field";
import SelectField from "./select-field";

const AddBook = () => {
  const { data: categories = [], isLoading: categoryLoading } = useCategories();
  const { data: bookFormats = [], isLoading: bookFormatLoading } =
    useBookFormats();

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
    watch,
  } = useForm({
    defaultValues: {
      name: "",
      description: "",
      author: "",
      categoryId: "",
      subcategoryId: "",
      formatId: "",
      status: "PUBLISHED",
      publicationYear: new Date().getFullYear(),
      pageCount: 0,
      price: 0,
      discount: 0,
      stock: 0,
      weight: 0,
    },
  });

  const watchedCategory = watch("categoryId");

  const { data: subCategories = [], isLoading: subCategoryLoading } =
    useSubCategories({
      categoryId: watchedCategory,
      enabled: !!watchedCategory,
    });

  const basicFields = [
    {
      name: "name",
      label: "Book Name",
      type: "text",
      placeholder: "Enter book name",
      icon: FaBook,
      rules: {
        required: "Book name is required",
        minLength: {
          value: 5,
          message: "Book name must be at least 5 characters",
        },
      },
    },
    {
      name: "description",
      label: "Book Description",
      type: "textarea",
      placeholder: "Enter a detailed description of the book...",
      icon: BsFileText,
      rules: {
        required: "Description is required",
        minLength: {
          value: 10,
          message: "Description must be at least 10 characters",
        },
      },
    },
  ];

  const authorImageFields = [
    {
      name: "author",
      label: "Author Name",
      type: "text",
      placeholder: "Enter author name",
      icon: FaUser,
      rules: {
        required: "Author name is required",
        minLength: {
          value: 5,
          message: "Author name must be at least 5 characters",
        },
      },
    },
  ];

  const classificationFields = [
    {
      name: "categoryId",
      label: "Category",
      type: "select",
      placeholder: "Select a category",
      icon: MdCategory,
      options: categories.map((c) => ({ value: c._id, label: c.name })),
      loading: categoryLoading,
      rules: { required: "Category is required" },
    },
    {
      name: "subcategoryId",
      label: "SubCategory",
      type: "select",
      placeholder: "Select a subcategory",
      icon: MdCategory,
      options: subCategories.map((s) => ({ value: s._id, label: s.name })),
      disabled: !watchedCategory,
      loading: subCategoryLoading,
      rules: {},
    },
  ];

  const detailsFields = [
    {
      name: "publicationYear",
      label: "Publication Year",
      type: "number",
      placeholder: "2024",
      icon: FaCalendar,
      rules: {
        required: "Publication year is required",
        min: { value: 1000, message: "Please enter a valid year" },
        max: {
          value: new Date().getFullYear() + 1,
          message: "Year cannot be in the future",
        },
      },
    },
    {
      name: "pageCount",
      label: "Page Count",
      type: "number",
      placeholder: "300",
      icon: BsFileText,
      rules: {
        required: "Page count is required",
        min: { value: 1, message: "Page count must be at least 1" },
      },
    },
    {
      name: "formatId",
      label: "Format",
      type: "select",
      placeholder: "Select format",
      icon: FaBook,
      options: bookFormats.map((f) => ({ value: f._id, label: f.name })),
      loading: bookFormatLoading,
      rules: { required: "Format is required" },
    },
    {
      name: "stock",
      label: "Stock",
      type: "number",
      placeholder: "10",
      icon: BsBoxSeam,
      rules: {
        required: "Stock is required",
        min: { value: 0, message: "Stock cannot be negative" },
      },
    },
  ];

  const pricingFields = [
    {
      name: "price",
      label: "Price (৳)",
      type: "number",
      placeholder: "0.00",
      step: "0.01",
      min: "0.00",
      rules: {
        required: "Price is required",
        min: { value: 0, message: "Price must be positive" },
      },
    },
    {
      name: "discount",
      label: "Discount (%)",
      type: "number",
      placeholder: "0",
      min: "0",
      max: "100",
      icon: BsPercent,
      rules: {
        min: { value: 0, message: "Discount cannot be negative" },
        max: { value: 100, message: "Discount cannot exceed 100%" },
      },
    },
    {
      name: "status",
      label: "Status",
      type: "select",
      placeholder: "Select status",
      icon: FaList,
      options: [
        { value: "PUBLISHED", label: "PUBLISHED" },
        { value: "UNPUBLISHED", label: "UNPUBLISHED" },
      ],
      rules: { required: "Status is required" },
    },
  ];

  const weightField = {
    name: "weight",
    label: "Weight (kg)",
    type: "number",
    placeholder: "0.5",
    icon: FaWeightHanging,
    step: "0.01",
    rules: {
      min: { value: 0, message: "Weight cannot be negative" },
    },
  };

  const onSubmit = async (formData) => {
    try {
      const imageFile = formData.bookImage?.[0];
      if (!imageFile) throw new Error("Book cover image is required");

      const photoUrl = await uploadImage(imageFile);

      delete formData.bookImage;

      const payload = {
        ...formData,
        photoUrl,
      };

      const { data } = await axiosInstance.post("/books", payload);

      if (data.success) {
        reset();
        getAlert({ title: "The book has been added successfully!" });
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error("Error adding book: ", error);
      const errorMessage = error.response?.data?.message || error.message;
      toast.error(errorMessage || "Failed to add the book. Please try again.");
    }
  };

  return (
    <>
      <title>Add New Book - BookWagon</title>

      <section className="bg-linear-to-br from-secondary/10 via-primary/5 to-secondary/10 py-6 sm:py-10 lg:py-16 px-3 sm:px-0">
        <Container>
          <Heading
            title="Add New Book"
            subtitle="Fill in the details below to add a new book to your library collection"
          />

          <div className="card bg-secondary/3 shadow-2xl border border-primary/50 rounded-xl sm:rounded-2xl overflow-hidden">
            <div className="card-body p-4 sm:p-6 lg:p-10">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-6 sm:space-y-8"
              >
                {/* Basic Information */}
                <div className="space-y-6">
                  <h3 className="text-base sm:text-lg font-semibold border-l-4 border-primary pl-3 sm:pl-4">
                    Basic Information
                  </h3>

                  {basicFields.map((field) =>
                    field.type === "textarea" ? (
                      <Controller
                        name={field.name}
                        control={control}
                        key={field.name}
                        rules={field.rules}
                        render={({ field, fieldState }) => (
                          <>
                            <textarea
                              id={field.name}
                              disabled={isSubmitting}
                              placeholder="Enter a detailed description of the book..."
                              className="textarea w-full sm:min-h-28 text-sm sm:text-base focus:ring-2 focus:ring-primary/20 resize-none"
                              {...field}
                            />
                            <ErrorMessage message={fieldState.error?.message} />
                          </>
                        )}
                      />
                    ) : (
                      <FormField
                        key={field.name}
                        control={control}
                        disabled={isSubmitting}
                        {...field}
                      />
                    ),
                  )}

                  {/* Book Image */}
                  <div className="space-y-1 sm:space-y-2">
                    <MyLabel
                      htmlFor="bookImage"
                      label={
                        <>
                          Book Cover Image <span className="text-error">*</span>
                        </>
                      }
                    />
                    <Controller
                      name="bookImage"
                      control={control}
                      rules={{ required: "Book cover image is required" }}
                      render={({ field: { onChange }, fieldState }) => (
                        <>
                          <MyInput
                            id="bookImage"
                            type="file"
                            accept="image/*"
                            disabled={isSubmitting}
                            className="file-input px-0"
                            onChange={(e) => onChange(e.target.files)}
                          />
                          <ErrorMessage message={fieldState.error?.message} />
                        </>
                      )}
                    />
                  </div>
                </div>

                <div className="divider my-6 sm:my-8" />

                {/* Author + Image Grid (already handled above) */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {authorImageFields.map((field) => (
                    <FormField
                      key={field.name}
                      control={control}
                      disabled={isSubmitting}
                      {...field}
                    />
                  ))}
                </div>

                <div className="divider my-6 sm:my-8" />

                {/* Classification */}
                <div>
                  <h3 className="text-base sm:text-lg font-semibold border-l-4 border-primary pl-3 sm:pl-4 mb-4 sm:mb-6">
                    Classification
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {classificationFields.map((field) => (
                      <SelectField
                        key={field.name}
                        control={control}
                        disabled={isSubmitting}
                        {...field}
                      />
                    ))}
                  </div>
                </div>

                <div className="divider my-6 sm:my-8" />

                {/* Book Details */}
                <div>
                  <h3 className="text-base sm:text-lg font-semibold border-l-4 border-primary pl-3 sm:pl-4 mb-4 sm:mb-6">
                    Book Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {detailsFields.map((field) =>
                      field.type === "select" ? (
                        <SelectField
                          key={field.name}
                          control={control}
                          disabled={isSubmitting}
                          {...field}
                        />
                      ) : (
                        <FormField
                          key={field.name}
                          control={control}
                          disabled={isSubmitting}
                          {...field}
                        />
                      ),
                    )}
                  </div>

                  {/* Weight */}
                  <div className="mt-6">
                    <FormField
                      control={control}
                      disabled={isSubmitting}
                      {...weightField}
                    />
                  </div>
                </div>

                <div className="divider my-6 sm:my-8" />

                {/* Pricing & Availability */}
                <div>
                  <h3 className="text-base sm:text-lg font-semibold border-l-4 border-primary pl-3 sm:pl-4 mb-4 sm:mb-6">
                    Pricing &amp; Availability
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {pricingFields.map((field) =>
                      field.type === "select" ? (
                        <SelectField
                          key={field.name}
                          control={control}
                          disabled={isSubmitting}
                          {...field}
                        />
                      ) : (
                        <FormField
                          key={field.name}
                          control={control}
                          disabled={isSubmitting}
                          {...field}
                        />
                      ),
                    )}
                  </div>
                </div>

                {/* Submit */}
                <div className="pt-6 sm:pt-8 text-end">
                  <Button type="submit" disabled={isSubmitting} className="">
                    {isSubmitting ? (
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
