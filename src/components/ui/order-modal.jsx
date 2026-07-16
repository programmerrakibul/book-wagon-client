import { useState } from "react";
import { MinusIcon, PlusIcon, Loader2Icon } from "lucide-react";
import useAuthStore from "@/store/use-auth-store";
import axiosInstance from "@/lib/axios";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

function OrderModal({ isOpen, closeModal, book, refetch }) {
  const user = useAuthStore((s) => s.user);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  if (!book) return null;

  const name = book.name || book.bookName;
  const image = book.photoUrl || book.image || book.bookImage;
  const totalPrice = (book.price || 0) * quantity;

  const handleOrder = async () => {
    if (!user) return;
    setLoading(true);
    try {
      await axiosInstance.post("/orders", {
        bookId: book._id,
        bookName: name,
        bookImage: image,
        price: book.price,
        quantity,
        totalPrice,
        buyerEmail: user.email,
        buyerName: user.displayName,
      });
      refetch?.();
      closeModal();
    } catch (err) {
      console.error("Order failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Confirm Order</DialogTitle>
          <DialogDescription>Review your order details before confirming.</DialogDescription>
        </DialogHeader>

        <div className="flex gap-4">
          {image && (
            <img src={image} alt={name} className="h-24 w-20 rounded-md object-cover" />
          )}
          <div className="flex flex-col gap-1">
            <h4 className="text-sm font-semibold">{name}</h4>
            {book.author && (
              <p className="text-xs text-muted-foreground">{book.author}</p>
            )}
            <p className="text-sm font-bold">${book.price?.toFixed(2)}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm">Quantity:</span>
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon-xs"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              disabled={quantity <= 1}
            >
              <MinusIcon />
            </Button>
            <span className="w-8 text-center text-sm font-medium">{quantity}</span>
            <Button
              variant="outline"
              size="icon-xs"
              onClick={() => setQuantity((q) => Math.min(book.stock || 10, q + 1))}
            >
              <PlusIcon />
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-between border-t pt-3">
          <span className="text-sm font-medium">Total</span>
          <span className="text-base font-bold">${totalPrice.toFixed(2)}</span>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={closeModal} disabled={loading}>
            Cancel
          </Button>
          <Button onClick={handleOrder} disabled={loading}>
            {loading && <Loader2Icon className="animate-spin" />}
            Confirm Order
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export { OrderModal };
