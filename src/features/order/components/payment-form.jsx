import { queryClient } from "@/App";
import { Button } from "@/components/ui/button";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  PaymentElement,
  useCheckoutElements,
} from "@stripe/react-stripe-js/checkout";
import { Loader2Icon } from "lucide-react";
import { useState, useTransition } from "react";
import { orderKeys } from "../hooks/use-orders";

export default function PaymentForm({ onSuccess, onCancel }) {
  const checkoutState = useCheckoutElements();
  const [isProcessing, startTransition] = useTransition(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (checkoutState.type !== "success") {
      setError("Checkout not ready yet. Please wait.");
      return;
    }

    setError(null);

    startTransition(async () => {
      try {
        const result = await checkoutState.checkout.confirm({
          redirect: "if_required",
        });

        if (result.type === "error") {
          setError(result.error.message ?? "Payment failed. Please try again.");
        } else {
          queryClient.invalidateQueries({ queryKey: orderKeys.all });
          onSuccess();
        }
      } catch (err) {
        console.error("Confirm error:", err);
        setError("An unexpected error occurred. Please try again.");
      } finally {
        setTimeout(() => setError(null), 3000);
      }
    });
  };

  if (checkoutState.type === "loading") {
    return <div className="py-12 text-center">Loading secure checkout...</div>;
  }

  if (checkoutState.type === "error") {
    return (
      <div className="py-8 text-center text-destructive">
        Failed to load checkout. Please refresh and try again.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex h-full flex-col">
      <DialogHeader className="px-1 pb-4">
        <DialogTitle>Complete your payment</DialogTitle>
      </DialogHeader>

      <ScrollArea className="flex-1 -mx-1 px-1 max-h-[50dvh]">
        <div className="py-6">
          <PaymentElement
            id="payment-element"
            options={{
              layout: "tabs",
              fields: {
                billingDetails: "never",
              },
              wallets: {
                link: "never",
              },
            }}
          />
        </div>

        {error && <p className="text-destructive text-sm mt-3 px-1">{error}</p>}

        <div className="flex gap-3 pt-6 border-t mt-auto">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isProcessing}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isProcessing || checkoutState.type !== "success"}
            className="flex-1"
          >
            {isProcessing ? (
              <>
                <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              "Pay Securely"
            )}
          </Button>
        </div>
      </ScrollArea>
    </form>
  );
}
