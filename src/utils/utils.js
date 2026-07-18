import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const getPrice = (book = {}) => {
  const originalPrice = book.price;
  const discount = book.discount > 0;
  const price = discount
    ? (book.discountedPrice ?? originalPrice)
    : originalPrice;

  return price;
};
