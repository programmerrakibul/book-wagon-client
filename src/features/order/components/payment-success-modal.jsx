import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

export default function PaymentSuccessModal({ onClose }) {
  return (
    <div className="py-8 text-center">
      <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
        <CheckCircle2 className="w-10 h-10 text-green-600" />
      </div>
      <h2 className="text-2xl font-semibold mb-2">Payment Successful!</h2>
      <p className="text-muted-foreground mb-6">Thank you for your purchase.</p>

      <Button onClick={onClose} className="w-full">
        Done
      </Button>
    </div>
  );
}
