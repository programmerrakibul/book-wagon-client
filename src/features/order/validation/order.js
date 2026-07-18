import z from "zod";

export const createOrderSchema = z.object({
  bookId: z
    .string("Please provide a valid book ID!")
    .trim()
    .min(1, "Book ID is required!"),

  quantity: z.coerce
    .number("Please provide a valid quantity!")
    .min(1, "Quantity must be at least 1")
    .max(9999, "Quantity cannot exceed 9999"),

  phoneNumber: z
    .string("Please provide a valid Phone Number!")
    .trim()
    .min(1, "Phone Number is required!"),

  address: z
    .string("Please provide a valid address!")
    .min(3, "Address must be at least 3 characters long")
    .max(100, "Address cannot exceed 100 characters"),
});
