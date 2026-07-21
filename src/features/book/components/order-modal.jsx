import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon, MinusIcon, PlusIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { useForm, useWatch } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FormField } from "@/components/ui/form-field";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import PaymentModal from "@/features/order/components/payment-modal";
import { useCreateOrder } from "@/features/order/hooks/use-orders";
import { createOrderSchema } from "@/features/order/validation/order";

function OrderModal({ open, onOpenChange, book }) {
  const createOrderMutation = useCreateOrder();
  const [orderId, setOrderId] = useState(null);

  const defaultValues = useMemo(
    () => ({
      bookId: book?._id || "",
      quantity: 1,
      phoneNumber: "",
      address: "",
    }),
    [book?._id],
  );

  const form = useForm({
    resolver: zodResolver(createOrderSchema),
    defaultValues,
  });

  const { control, handleSubmit, setValue, reset, formState } = form;
  const quantity = useWatch({ name: "quantity", control });

  const fields = useMemo(
    () => [
      {
        name: "phoneNumber",
        label: "Phone Number",
        type: "input",
        placeholder: "01XXXXXXXXX",
      },
      {
        name: "address",
        label: "Delivery Address",
        type: "textarea",
        placeholder: "House #, Road #, Area, City",
      },
    ],
    [],
  );

  if (!book) return null;

  const name = book.name;
  const image = book.photoUrl;
  const price =
    book.discount > 0 ? book.discountedPrice || book.price : book.price;

  const handleQuantityChange = (delta) => {
    const next = Math.min(book.stock || 10, Math.max(1, quantity + delta));
    setValue("quantity", next, { shouldValidate: true });
  };

  const onSubmit = (data) => {
    createOrderMutation.mutate(data, {
      onSuccess: ({ data }) => {
        setOrderId(data._id);

        onOpenChange(false);
        reset(defaultValues);
      },
    });
  };

  const handleOpenChange = (val) => {
    onOpenChange(val);
    if (!val) reset(defaultValues);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="sm:max-w-md max-h-[80dvh]">
          <DialogHeader>
            <DialogTitle>Confirm Order</DialogTitle>
            <DialogDescription>
              Review your order details and provide delivery information.
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="overflow-y-auto max-h-[calc(80dvh-76.5px)]">
            <div className="p-6">
              <div className="flex gap-4">
                {image && (
                  <img
                    src={image}
                    alt={name}
                    className="h-24 w-20 rounded-md object-cover"
                  />
                )}
                <div className="flex flex-col gap-1">
                  <h4 className="text-sm font-semibold">{name}</h4>
                  {book.author && (
                    <p className="text-xs text-muted-foreground">
                      {book.author}
                    </p>
                  )}
                  <p className="text-sm font-bold">&#2547; {price}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 mt-3">
                <span className="text-sm">Quantity:</span>
                <div className="flex items-center gap-1">
                  <Button
                    variant="outline"
                    size="icon-xs"
                    type="button"
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                  >
                    <MinusIcon />
                  </Button>
                  <span className="w-8 text-center text-sm font-medium">
                    {quantity}
                  </span>
                  <Button
                    variant="outline"
                    size="icon-xs"
                    type="button"
                    onClick={() => handleQuantityChange(1)}
                  >
                    <PlusIcon />
                  </Button>
                </div>
                {formState.errors.quantity && (
                  <p className="text-sm text-destructive">
                    {formState.errors.quantity.message}
                  </p>
                )}
              </div>

              <Separator className="my-4" />

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Total</span>
                <span className="text-base font-bold">
                  &#2547; {((price || 0) * quantity).toFixed(2)}
                </span>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {fields.map((f) => (
                  <FormField
                    key={f.name}
                    field={f}
                    control={control}
                    disabled={createOrderMutation.isPending}
                  />
                ))}

                <DialogFooter>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => handleOpenChange(false)}
                    disabled={createOrderMutation.isPending}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={createOrderMutation.isPending}
                  >
                    {createOrderMutation.isPending && (
                      <Loader2Icon className="animate-spin" />
                    )}
                    Confirm Order
                  </Button>
                </DialogFooter>
              </form>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      <PaymentModal
        orderId={orderId}
        isOpen={!!orderId}
        onClose={() => setOrderId(null)}
      />
    </>
  );
}

export { OrderModal };
