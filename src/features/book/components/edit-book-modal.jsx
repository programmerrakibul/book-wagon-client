import { Save } from "lucide-react";
import { useCallback } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Spinner } from "@/components/ui/spinner";
import { useBook, useUpdateBook } from "@/features/book/hooks/use-books";
import { editBookSchema } from "@/features/book/validation/book";
import { uploadImage } from "@/lib/upload-image";
import { BookForm } from "./book-form";

function EditBookModal({ open, onOpenChange, id }) {
  const { data: book, isLoading: bookLoading } = useBook(id);
  const updateBookMutation = useUpdateBook(id);

  const onSubmit = useCallback(
    async (formData) => {
      const { bookImage, ...payload } = formData;
      const imageFile = bookImage?.[0];
      if (imageFile) {
        const photoUrl = await uploadImage(imageFile);
        payload.photoUrl = photoUrl;
      }
      console.log(payload);

      updateBookMutation.mutate(payload, {
        onSuccess: () => onOpenChange(false),
      });
    },
    [updateBookMutation, onOpenChange],
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        style={{ "--dialog-width": "56rem" }}
        className="sm:max-w-2xl lg:max-w-4xl xl:max-w-5xl"
      >
        <DialogHeader>
          <DialogTitle>Edit Book</DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[calc(90vh-4.5rem)]">
          <div className="px-6 pb-6">
            {bookLoading ? (
              <div className="flex items-center justify-center py-16">
                <Spinner className="size-6" />
              </div>
            ) : (
              <BookForm
                schema={editBookSchema}
                defaultValues={{
                  name: book?.name || "",
                  description: book?.description || "",
                  author: book?.author || "",
                  categoryId: book?.categoryId?._id || book?.categoryId || "",
                  subcategoryId:
                    book?.subcategoryId?._id || book?.subcategoryId || "",
                  formatId: book?.formatId?._id || book?.formatId || "",
                  publicationYear: book?.publicationYear || "",
                  pageCount: book?.pageCount || "",
                  weight: book?.weight || "",
                  price: book?.price || "",
                  discount: book?.discount || "",
                  stock: book?.stock || "",
                  status: book?.status || "",
                  bookImage: null,
                }}
                onSubmit={onSubmit}
                submitLabel="Update Book"
                submitIcon={Save}
                isPending={updateBookMutation.isPending}
                imagePreviewUrl={book?.photoUrl}
              />
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

export { EditBookModal };
