import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Save, X } from "lucide-react";
import { useCallback, useEffect } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import {
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Heading } from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import {
  useBookFormats,
  useCategories,
  useSubCategories,
} from "@/features/books/hooks/use-categories";
import axiosInstance from "@/lib/axios";

const editBookSchema = z.object({
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
  publicationYear: z.coerce
    .number({ required_error: "Publication year is required" })
    .min(1000, "Please enter a valid year")
    .max(new Date().getFullYear() + 1, "Year cannot be in the future"),
  pageCount: z.coerce
    .number({ required_error: "Page count is required" })
    .min(1, "Page count must be at least 1"),
  weight: z.coerce.number().min(0, "Weight cannot be negative").optional(),
  price: z.coerce
    .number({ required_error: "Price is required" })
    .min(0, "Price must be positive"),
  discount: z.coerce
    .number()
    .min(0, "Discount cannot be negative")
    .max(100, "Discount cannot exceed 100%")
    .optional(),
  stock: z.coerce
    .number({ required_error: "Stock is required" })
    .min(0, "Stock cannot be negative"),
  status: z.string().min(1, "Status is required"),
});

function EditBookPageSkeleton() {
  return (
    <div className="space-y-6">
      {Array.from({ length: 3 }).map((_, i) => (
        <Card key={i}>
          <CardContent className="space-y-4 p-6">
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-9 w-full" />
            <Skeleton className="h-9 w-full" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function EditBookPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: categories = [] } = useCategories();
  const { data: bookFormats = [] } = useBookFormats();

  const { data: book, isLoading: bookLoading } = useQuery({
    queryKey: ["books", "detail", id],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/books/${id}`);
      return data?.data ?? {};
    },
    enabled: Boolean(id),
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm({
    resolver: zodResolver(editBookSchema),
    defaultValues: {
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
    },
  });

  useEffect(() => {
    if (book) {
      reset({
        name: book.name || "",
        description: book.description || "",
        author: book.author || "",
        categoryId: book.categoryId?._id || book.categoryId || "",
        subcategoryId: book.subcategoryId?._id || book.subcategoryId || "",
        formatId: book.formatId?._id || book.formatId || "",
        publicationYear: book.publicationYear || "",
        pageCount: book.pageCount || "",
        weight: book.weight || "",
        price: book.price || "",
        discount: book.discount || "",
        stock: book.stock || "",
        status: book.status || "",
      });
    }
  }, [book, reset]);

  const watchedCategory = useWatch({ name: "categoryId", control });

  const { data: subCategories = [] } = useSubCategories({
    categoryId: watchedCategory,
    enabled: !!watchedCategory,
  });

  const updateBookMutation = useMutation({
    mutationFn: (payload) => axiosInstance.patch(`/books/${id}`, payload),
    onSuccess: (res) => {
      if (res.data.success) {
        toast.success("Book updated successfully!");
        navigate("/dashboard/my-books");
      } else {
        throw new Error(res.data.message);
      }
    },
    onError: (error) => {
      const msg = error.response?.data?.message || error.message;
      toast.error(msg || "Failed to update the book.");
    },
  });

  const onSubmit = useCallback(
    (formData) => {
      updateBookMutation.mutate(formData);
    },
    [updateBookMutation],
  );

  if (bookLoading) {
    return (
      <section className="py-8 sm:py-12 lg:py-16">
        <Container>
          <Heading
            title="Edit Book"
            subtitle="Update the book information below"
          />
          <div className="mt-8">
            <EditBookPageSkeleton />
          </div>
        </Container>
      </section>
    );
  }

  return (
    <>
      <title>Edit Book | BookWagon</title>

      <section className="py-8 sm:py-12 lg:py-16">
        <Container>
          <Heading
            title="Edit Book"
            subtitle="Update the book information below"
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

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/dashboard/my-books")}
                disabled={isSubmitting}
                className="gap-2"
              >
                <X className="size-4" />
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting} className="gap-2">
                {isSubmitting ? <Spinner /> : <Save className="size-4" />}
                Update Book
              </Button>
            </div>
          </form>
        </Container>
      </section>
    </>
  );
}

export default EditBookPage;
