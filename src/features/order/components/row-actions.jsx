import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { Button } from "@/components/ui/button";
import { useUpdateOrderStatus } from "@/features/order/hooks/use-orders";
import {
  OrderStatuses,
  PaymentStatuses,
} from "@/features/shared/constants/statuses";
import { CreditCardIcon, XCircleIcon } from "lucide-react";
import { useState } from "react";
import PaymentModal from "./payment-modal";

const RowActions = ({ row }) => {
  const updateOrderStatusMutation = useUpdateOrderStatus();
  const [isOpen, setIsOpen] = useState(false);
  const canPerformAction =
    row.paymentStatus === PaymentStatuses.PAID ||
    row.status !== OrderStatuses.PENDING;

  return (
    <div className="flex items-center justify-end gap-2">
      <Button
        size="sm"
        onClick={() => setIsOpen(true)}
        disabled={canPerformAction}
      >
        <CreditCardIcon className="size-3.5" />
        Pay Now
      </Button>

      <PaymentModal
        orderId={row._id}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />

      <ConfirmDialog
        title="Cancel Order?"
        description="This action cannot be undone. The order will be permanently cancelled."
        confirmLabel="Yes, Cancel"
        onConfirm={() =>
          updateOrderStatusMutation.mutate({
            id: row._id,
            status: OrderStatuses.CANCELLED,
          })
        }
      >
        <Button size="sm" variant="destructive" disabled={canPerformAction}>
          <XCircleIcon className="size-3.5" />
          Cancel
        </Button>
      </ConfirmDialog>
    </div>
  );
};

export default RowActions;
