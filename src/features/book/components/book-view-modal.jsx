import {
  BookOpen,
  Calendar,
  FileText,
  Layers,
  Package,
  Tag,
  User,
  Weight,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

// eslint-disable-next-line no-unused-vars
function DetailRow({ icon: Icon, label, value }) {
  if (!value && value !== 0) return null;

  return (
    <div className="flex items-start gap-2">
      <Icon className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm font-medium">{value}</p>
      </div>
    </div>
  );
}

function BookViewModal({ open, onOpenChange, book }) {
  if (!book) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Book Details</DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[calc(90vh-6rem)]">
          <div className="flex flex-col gap-6 sm:flex-row p-6">
            <div>
              <img
                src={book.photoUrl}
                alt={book.name}
                className="mx-auto aspect-3/4 w-40 shrink-0 rounded-xl object-cover ring-1 ring-border sm:mx-0"
              />
            </div>

            <div className="flex-1 space-y-4">
              <div>
                <h3 className="text-lg font-semibold">{book.name}</h3>
                <p className="text-sm text-muted-foreground">{book.author}</p>
              </div>

              <div className="flex flex-wrap gap-2">
                <Badge
                  variant={
                    book.status === "PUBLISHED" ? "default" : "secondary"
                  }
                >
                  {book.status}
                </Badge>
                <Badge variant={book.isActive ? "default" : "destructive"}>
                  {book.isActive ? "Active" : "Inactive"}
                </Badge>
              </div>

              {book.description && (
                <p className="text-sm text-muted-foreground line-clamp-4">
                  {book.description}
                </p>
              )}

              <Separator />

              <div className="grid grid-cols-2 gap-4">
                <DetailRow
                  icon={Tag}
                  label="Category"
                  value={book.categoryId?.name}
                />
                <DetailRow
                  icon={Layers}
                  label="Sub-Category"
                  value={book.subcategoryId?.name}
                />
                <DetailRow
                  icon={FileText}
                  label="Format"
                  value={book.formatId?.name}
                />
                <DetailRow
                  icon={Calendar}
                  label="Publication Year"
                  value={book.publicationYear}
                />
                <DetailRow
                  icon={BookOpen}
                  label="Page Count"
                  value={book.pageCount}
                />
                <DetailRow
                  icon={Weight}
                  label="Weight"
                  value={book.weight ? `${book.weight}g` : null}
                />
                <DetailRow icon={Package} label="Stock" value={book.stock} />
                <DetailRow
                  icon={User}
                  label="Librarian"
                  value={book.librarianId?.name}
                />
              </div>

              <Separator />

              <div className="flex items-baseline gap-4">
                <div>
                  <p className="text-xs text-muted-foreground">Price</p>
                  <p className="text-lg font-semibold">{book.price}&#x09F3;</p>
                </div>
                {book.discount > 0 && (
                  <div>
                    <p className="text-xs text-muted-foreground">Discount</p>
                    <p className="text-sm font-medium">{book.discount}%</p>
                  </div>
                )}
                {book.discountedPrice > 0 && (
                  <div>
                    <p className="text-xs text-muted-foreground">Final Price</p>
                    <p className="text-lg font-semibold text-green-600">
                      {book.discountedPrice}&#x09F3;
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

export { BookViewModal };
