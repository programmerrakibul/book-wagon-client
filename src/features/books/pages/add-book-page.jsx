import { useCallback } from "react";
import { useNavigate } from "react-router";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { BookPlus } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Spinner } from "@/components/ui/spinner";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldLabel,
  FieldContent,
  FieldError,
} from "@/components/ui/field";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { createBook } from "@/features/books/services/books.service";
import { uploadImage } from "@/lib/upload-image";
import {
  useCategories,
  useSubCategories,
  useBookFormats,
} from "@/features/books/hooks/use-categories";
import { queryClient } from "@/App";

const addBookSchema = z.object({
  name: z
    .string()
    .min(1, "Book name is required")
    .min(5, "Book name must be at least 5 characters"),
  description: z
    .string()
    .min(1, "Description is required")
    .min(10, "Description must be at least 10 characters"),
  author: z
    .string()
    .min(1, "Author name is required")
    .min(5, "Author name must be at least 5 characters"),
  categoryId: z.string().min(1, "Category is required"),
  subcategoryId: z.string().optional().or(z.literal("")),
  formatId: z.string().min(1, "Format is required"),
  publicationYear: z
    .coerce
    .number({ required_error: "Publication year is required" })
    .min(1000, "Please enter a valid year")
    .max(new Date().getFullYear() + 1, "Year cannot be in the future"),
  pageCount: z
    .coerce
    .number({ required_error: "Page count is required" })
    .min(1, "Page count must be at least 1"),
  weight: z.coerce.number().min(0, "Weight cannot be negative").optional(),
  price: z
    .coerce
    .number({ required_error: "Price is required" })
    .min(0, "Price must be positive"),
  discount: z
    .coerce
    .number()
    .min(0, "Discount cannot be negative")
    .max(100, "Discount cannot exceed 100%")
    .optional(),
  stock: z
    .coerce
    .number({ required_error: "Stock is required" })
    .min(0, "Stock cannot be negative"),
  status: z.string().min(1, "Status is required"),
  bookImage: z.any().refine((files) => files && files.length > 0, "Book cover image is required"),
});

const defaultValues = {
  name: "",
  description: "",
  author: "",
  categoryId: "",
  subcategoryId: "",
  formatId: "",
  publicationYear: "",
  pageCount: "",
  weight: "",
  price: "",
  discount: "",
  stock: "",
  status: "",
  bookImage: null,
};

function AddBookPage() {
  const navigate = useNavigate();
  const { data: categories = [] } = useCategories();
  const { data: bookFormats = [] } = useBookFormats();

  const {
    control,
    handleSubmit,
    watch,
    formState: { isSubmitting },
  } = useForm({
    resolver: zodResolver(addBookSchema),
    defaultValues,
  });

  const watchedCategory = watch("categoryId");

  const { data: subCategories = [] } = useSubCategories({
    categoryId: watchedCategory,
    enabled: !!watchedCategory,
  });

  const createBookMutation = useMutation({
    mutationFn: createBook,
    onSuccess: (data) => {
      if (data.success) {
        toast.success("Book has been added successfully!");
        queryClient.invalidateQueries({ queryKey: ["books"] });
        navigate("/dashboard/my-books");
      } else {
        throw new Error(data.message);
      }
    },
    onError: (error) => {
      const msg = error.response?.data?.message || error.message;
      toast.error(msg || "Failed to add the book. Please try again.");
    },
  });

  const onSubmit = useCallback(
    async (formData) => {
      try {
        const imageFile = formData.bookImage?.[0];
        if (!imageFile) throw new Error("Book cover image is required");

        const photoUrl = await uploadImage(imageFile);

        const { _bookImage, ...payload } = formData;
        payload.photoUrl = photoUrl;

        createBookMutation.mutate(payload);
      } catch (error) {
        toast.error(error.message || "Failed to add the book.");
      }
    },
    [createBookMutation]
  );

  return (
    <>
      <title>Add New Book | BookWagon</title>

      <section className="py-8 sm:py-12 lg:py-16">
        <Container>
          <Heading
            title="Add New Book"
            subtitle="Fill in the details below to add a new book to your library collection"
          />

          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <Controller
                  name="name"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field>
                      <FieldLabel>Book Name</FieldLabel>
                      <FieldContent>
                        <Input
                          {...field}
                          placeholder="Enter book name"
                          disabled={isSubmitting}
                        />
                        <FieldError>{fieldState.error?.message}</FieldError>
                      </FieldContent>
                    </Field>
                  )}
                />

                <Controller
                  name="description"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field>
                      <FieldLabel>Book Description</FieldLabel>
                      <FieldContent>
                        <Textarea
                          {...field}
                          placeholder="Enter a detailed description of the book..."
                          disabled={isSubmitting}
                          className="min-h-28"
                        />
                        <FieldError>{fieldState.error?.message}</FieldError>
                      </FieldContent>
                    </Field>
                  )}
                />

                <Controller
                  name="bookImage"
                  control={control}
                  render={({ field: { onChange }, fieldState }) => (
                    <Field>
                      <FieldLabel>Book Cover Image</FieldLabel>
                      <FieldContent>
                        <Input
                          type="file"
                          accept="image/*"
                          disabled={isSubmitting}
                          onChange={(e) => onChange(e.target.files)}
                        />
                        <FieldError>{fieldState.error?.message}</FieldError>
                      </FieldContent>
                    </Field>
                  )}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Author</CardTitle>
              </CardHeader>
              <CardContent>
                <Controller
                  name="author"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field>
                      <FieldLabel>Author Name</FieldLabel>
                      <FieldContent>
                        <Input
                          {...field}
                          placeholder="Enter author name"
                          disabled={isSubmitting}
                        />
                        <FieldError>{fieldState.error?.message}</FieldError>
                      </FieldContent>
                    </Field>
                  )}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Classification</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <Controller
                  name="categoryId"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field>
                      <FieldLabel>Category</FieldLabel>
                      <FieldContent>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((cat) => (
                              <SelectItem key={cat._id} value={cat._id}>
                                {cat.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FieldError>{fieldState.error?.message}</FieldError>
                      </FieldContent>
                    </Field>
                  )}
                />

                <Controller
                  name="subcategoryId"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field>
                      <FieldLabel>Sub-Category</FieldLabel>
                      <FieldContent>
                        <Select
                          value={field.value || "none"}
                          onValueChange={(val) =>
                            field.onChange(val === "none" ? "" : val)
                          }
                          disabled={!watchedCategory}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select a subcategory" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="none">None</SelectItem>
                            {subCategories.map((sub) => (
                              <SelectItem key={sub._id} value={sub._id}>
                                {sub.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FieldError>{fieldState.error?.message}</FieldError>
                      </FieldContent>
                    </Field>
                  )}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Details</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <Controller
                  name="publicationYear"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field>
                      <FieldLabel>Publication Year</FieldLabel>
                      <FieldContent>
                        <Input
                          {...field}
                          type="number"
                          placeholder="2024"
                          disabled={isSubmitting}
                        />
                        <FieldError>{fieldState.error?.message}</FieldError>
                      </FieldContent>
                    </Field>
                  )}
                />

                <Controller
                  name="pageCount"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field>
                      <FieldLabel>Page Count</FieldLabel>
                      <FieldContent>
                        <Input
                          {...field}
                          type="number"
                          placeholder="300"
                          disabled={isSubmitting}
                        />
                        <FieldError>{fieldState.error?.message}</FieldError>
                      </FieldContent>
                    </Field>
                  )}
                />

                <Controller
                  name="formatId"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field>
                      <FieldLabel>Format</FieldLabel>
                      <FieldContent>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select format" />
                          </SelectTrigger>
                          <SelectContent>
                            {bookFormats.map((fmt) => (
                              <SelectItem key={fmt._id} value={fmt._id}>
                                {fmt.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FieldError>{fieldState.error?.message}</FieldError>
                      </FieldContent>
                    </Field>
                  )}
                />

                <Controller
                  name="stock"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field>
                      <FieldLabel>Stock</FieldLabel>
                      <FieldContent>
                        <Input
                          {...field}
                          type="number"
                          placeholder="10"
                          disabled={isSubmitting}
                        />
                        <FieldError>{fieldState.error?.message}</FieldError>
                      </FieldContent>
                    </Field>
                  )}
                />

                <Controller
                  name="weight"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field>
                      <FieldLabel>Weight (kg)</FieldLabel>
                      <FieldContent>
                        <Input
                          {...field}
                          type="number"
                          step="0.01"
                          placeholder="0.5"
                          disabled={isSubmitting}
                        />
                        <FieldError>{fieldState.error?.message}</FieldError>
                      </FieldContent>
                    </Field>
                  )}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Pricing</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <Controller
                  name="price"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field>
                      <FieldLabel>Price (&#2547;)</FieldLabel>
                      <FieldContent>
                        <Input
                          {...field}
                          type="number"
                          step="0.01"
                          placeholder="0.00"
                          disabled={isSubmitting}
                        />
                        <FieldError>{fieldState.error?.message}</FieldError>
                      </FieldContent>
                    </Field>
                  )}
                />

                <Controller
                  name="discount"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field>
                      <FieldLabel>Discount (%)</FieldLabel>
                      <FieldContent>
                        <Input
                          {...field}
                          type="number"
                          placeholder="0"
                          disabled={isSubmitting}
                        />
                        <FieldError>{fieldState.error?.message}</FieldError>
                      </FieldContent>
                    </Field>
                  )}
                />

                <Controller
                  name="status"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field>
                      <FieldLabel>Status</FieldLabel>
                      <FieldContent>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="PUBLISHED">PUBLISHED</SelectItem>
                            <SelectItem value="UNPUBLISHED">
                              UNPUBLISHED
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FieldError>{fieldState.error?.message}</FieldError>
                      </FieldContent>
                    </Field>
                  )}
                />
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button type="submit" disabled={isSubmitting} className="gap-2">
                {isSubmitting ? (
                  <Spinner />
                ) : (
                  <BookPlus className="size-4" />
                )}
                Add Book to Library
              </Button>
            </div>
          </form>
        </Container>
      </section>
    </>
  );
}

export default AddBookPage;
