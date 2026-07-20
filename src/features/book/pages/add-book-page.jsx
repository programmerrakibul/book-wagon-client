import { BookPlus } from "lucide-react";
import { useCallback } from "react";
import { toast } from "sonner";

import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { BookForm } from "@/features/book/components/book-form";
import { defaultValues } from "@/features/book/constants";
import { useCreateBook } from "@/features/book/hooks/use-books";
import { addBookSchema } from "@/features/book/validation/book";
import { uploadImage } from "@/lib/upload-image";

function AddBookPage() {
  const createBookMutation = useCreateBook();

  const onSubmit = useCallback(
    async (formData) => {
      try {
        const imageFile = formData.bookImage?.[0];
        if (!imageFile) throw new Error("Book cover image is required");

        const photoUrl = await uploadImage(imageFile);

        const { _bookImage, ...payload } = formData;
        payload.photoUrl = photoUrl;

        createBookMutation.mutate(payload);
      } catch (error) {
        toast.error(error.message || "Failed to add the book.");
      }
    },
    [createBookMutation],
  );

  return (
    <>
      <title>Add New Book | BookWagon</title>

      <section className="py-8 sm:py-12 lg:py-16">
        <Container className="max-w-5xl">
          <Heading
            title="Add New Book"
            subtitle="Fill in the details below to add a new book to your library collection"
          />

          <div className="mt-8">
            <BookForm
              schema={addBookSchema}
              defaultValues={defaultValues}
              onSubmit={onSubmit}
              submitLabel="Add Book to Library"
              submitIcon={BookPlus}
              isPending={createBookMutation.isPending}
            />
          </div>
        </Container>
      </section>
    </>
  );
}

export default AddBookPage;
