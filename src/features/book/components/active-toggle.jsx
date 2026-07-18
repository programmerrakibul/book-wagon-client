import { CheckCircle, XCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useToggleActive } from "@/features/book/hooks/use-books";

function ActiveToggle({ bookId, isActive }) {
  const toggleMutation = useToggleActive();

  return (
    <Button
      variant="ghost"
      size="sm"
      className="gap-1.5"
      disabled={toggleMutation.isPending}
      onClick={() => toggleMutation.mutate({ bookId, isActive: !isActive })}
    >
      {isActive ? (
        <>
          <CheckCircle className="size-4 text-green-600" />
          <span className="text-green-600">Active</span>
        </>
      ) : (
        <>
          <XCircle className="size-4 text-red-500" />
          <span className="text-red-500">Inactive</span>
        </>
      )}
    </Button>
  );
}

export { ActiveToggle };
