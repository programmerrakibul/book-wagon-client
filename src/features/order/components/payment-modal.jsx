import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { CheckoutElementsProvider } from "@stripe/react-stripe-js/checkout";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
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
  const checkoutMutation = useCheckout();

  const openPayment = async () => {
    checkoutMutation.mutate(orderId, {
      onSuccess: (data) => {
        console.log(data);
        setClientSecret(data.clientSecret);
      },
    });
  };

  const resetModal = () => {
    onClose();
    setTimeout(() => {
      setClientSecret(null);
      setShowSuccess(false);
    }, 300);
  };

  return (
    <Dialog open={isOpen} onOpenChange={resetModal}>
      <DialogContent className="sm:max-w-lg p-6">
        {!clientSecret ? (
          <div className="text-center py-8 transition-all duration-300 ease-in-out">
            <Button onClick={openPayment} size="lg">
              Load Secure Checkout
            </Button>
          </div>
        ) : checkoutMutation.isPending ? (
          <>
            <div className="py-12 text-center">Loading secure checkout...</div>
          </>
        ) : showSuccess ? (
          <PaymentSuccessModal onClose={resetModal} />
        ) : (
          <CheckoutElementsProvider
            stripe={stripePromise}
            options={{ clientSecret, elementsOptions }}
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
