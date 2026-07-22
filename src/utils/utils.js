import { clsx } from "clsx";
import { toast } from "sonner";
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

export const copyToClipboard = async (text, description = "Transaction ID") => {
  const value = text?.trim();

  if (!value) return;

  try {
    await navigator.clipboard.writeText(value);

    toast.success(`${description} copied to clipboard`);
  } catch (err) {
    toast.error("Failed to copy to clipboard");
    console.error("Copy failed:", err);
  }
};

export const getInitials = (text) => {
  const value = text?.trim() || "Unknown";

  return value.charAt(0).toUpperCase();
};

export const getCallbackUrl = () => {
  const url = new URL(window.location).href;

  return encodeURIComponent(url);
};
