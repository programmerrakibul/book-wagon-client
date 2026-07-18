import { Eye, MoreHorizontal, Pencil, Trash2 } from "lucide-react";

import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function BookActionsDropdown({ book, onView, onEdit, onDelete, showEdit = true }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="ghost" size="icon-sm" aria-label="Book actions" />
        }
      >
        <MoreHorizontal className="size-4" />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => onView(book)}>
          <Eye className="size-4" />
          View
        </DropdownMenuItem>

        {showEdit && (
          <DropdownMenuItem onClick={() => onEdit(book)}>
            <Pencil className="size-4" />
            Edit
          </DropdownMenuItem>
        )}

        <DropdownMenuSeparator />

        <ConfirmDialog
          title="Delete Book?"
          description={`This will permanently delete "${book.name}". This action cannot be undone.`}
          confirmLabel="Delete"
          onConfirm={() => onDelete(book._id)}
        >
          <DropdownMenuItem
            variant="destructive"
            onSelect={(e) => e.preventDefault()}
          >
            <Trash2 className="size-4" />
            Delete
          </DropdownMenuItem>
        </ConfirmDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export { BookActionsDropdown };
