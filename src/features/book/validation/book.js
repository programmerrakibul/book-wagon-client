import z from "zod";

export const addBookSchema = z.object({
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
  bookImage: z
    .any()
    .refine(
      (files) => files && files.length > 0,
      "Book cover image is required",
    ),
});

export const editBookSchema = addBookSchema.partial();
