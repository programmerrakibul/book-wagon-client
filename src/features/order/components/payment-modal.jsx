import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CheckoutElementsProvider } from "@stripe/react-stripe-js/checkout";
import { loadStripe } from "@stripe/stripe-js";
import { useCallback, useState } from "react";
import { useCheckout } from "../hooks/use-orders";
import PaymentForm from "./payment-form";
import PaymentSuccessModal from "./payment-success-modal";

const STRIPE_PUBLISHABLE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

if (!STRIPE_PUBLISHABLE_KEY) {
  throw new Error("Missing Stripe Publishable Key");
}

const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

const elementsOptions = {
  appearance: {
    theme: "stripe",
    variables: {
      colorPrimary: "hsl(var(--primary))",
      colorBackground: "hsl(var(--card))",
      colorText: "hsl(var(--foreground))",
      colorDanger: "hsl(var(--destructive))",
      colorTextSecondary: "hsl(var(--muted-foreground))",
      colorBorder: "hsl(var(--border))",
      borderRadius: "var(--radius)",
    },
    rules: {
      ".Input": {
        borderColor: "hsl(var(--input))",
        backgroundColor: "hsl(var(--card))",
        color: "hsl(var(--foreground))",
      },
      ".Input:focus": {
        borderColor: "hsl(var(--ring))",
      },
    },
  },
};

export default function PaymentModal({ isOpen, onClose, orderId }) {
  const [clientSecret, setClientSecret] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const { mutate, isPending } = useCheckout();

  const openPayment = useCallback(() => {
    mutate(orderId, {
      onSuccess: (data) => {
        console.log(data);
        setClientSecret(data.clientSecret);
      },
    });
  }, [mutate, orderId]);

  const resetModal = () => {
    onClose();
    setTimeout(() => {
      setClientSecret(null);
      setShowSuccess(false);
    }, 300);
  };

  return (
    <Dialog open={isOpen} onOpenChange={resetModal}>
      <DialogContent className="sm:max-w-lg p-6 max-h-[80vh]">
        {!clientSecret ? (
          <>
            <DialogHeader className="px-0">
              <DialogTitle>Secure Checkout</DialogTitle>
              <DialogDescription>
                Are you sure you want to checkout this order now?
              </DialogDescription>
            </DialogHeader>

            <DialogFooter className="pt-3">
              <DialogClose
                render={
                  <Button variant="outline" onClick={onClose}>
                    Later
                  </Button>
                }
              />
              <Button onClick={openPayment}>Proceed Now</Button>
            </DialogFooter>
          </>
        ) : isPending ? (
          <>
            <div className="py-12 text-center">Loading secure checkout...</div>
          </>
        ) : showSuccess ? (
          <PaymentSuccessModal onClose={resetModal} />
        ) : (
            <CheckoutElementsProvider
              stripe={stripePromise}
              options={{
                clientSecret,
                elementsOptions,
                adaptivePricing: { allowed: true },
              }}
            >
              <PaymentForm
                onSuccess={() => setShowSuccess(true)}
                onCancel={resetModal}
              />
            </CheckoutElementsProvider>
        )}
      </DialogContent>
    </Dialog>
  );
}
