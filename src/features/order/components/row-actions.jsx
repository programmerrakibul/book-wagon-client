import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { Button } from "@/components/ui/button";
import {
  OrderStatuses,
  PaymentStatuses,
} from "@/features/shared/constants/statuses";
import { CreditCardIcon, XCircleIcon } from "lucide-react";
import { useCheckout, useUpdateOrderStatus } from "../hooks/use-orders";

const RowActions = ({ row }) => {
  const updateOrderStatusMutation = useUpdateOrderStatus();
  const checkoutMutation = useCheckout();

  return (
    <div className="flex items-center justify-end gap-2">
      {row.status === OrderStatuses.PENDING ? (
        <>
          {PaymentStatuses.UNPAID === row.paymentStatus && (
            <Button
              size="sm"
              onClick={() => checkoutMutation.mutate(row._id)}
              disabled={checkoutMutation.isPending}
            >
              <CreditCardIcon className="size-3.5" />
              Pay Now
            </Button>
          )}

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
            <Button size="sm" variant="destructive">
              <XCircleIcon className="size-3.5" />
              Cancel
            </Button>
          </ConfirmDialog>
        </>
      ) : (
        <span>No Actions</span>
      )}
    </div>
  );
};

export default RowActions;
