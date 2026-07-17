import { useMutation, useQuery } from "@tanstack/react-query";
import { BookOpen, ChevronLeft, ChevronRight, Trash2 } from "lucide-react";
import { useState } from "react";
import { useSearchParams } from "react-router";
import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import {
  Empty,
  EmptyDescription,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Heading } from "@/components/ui/heading";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axiosInstance from "@/lib/axios";
import useAuthStore from "@/store/use-auth-store";

function ManageBooksSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 border-b p-4">
          <Skeleton className="size-12 rounded" />
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-8 w-20" />
        </div>
      ))}
    </div>
  );
}

function ManageBooksPage() {
  const user = useAuthStore((s) => s.user);
  const [searchParams] = useSearchParams();
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);
  const limit = 10;

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["manage-books", "admin", user?.email, page, limit],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/books", {
        params: { email: user.email, page, limit },
      });
      return data || {};
    },
    enabled: !!user?.email,
  });

  const statusMutation = useMutation({
    mutationFn: ({ bookId, status }) =>
      axiosInstance.patch(`/books/${bookId}`, { status }),
    onSuccess: () => {
      refetch();
      toast.success("Book status updated.");
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Failed to update status.");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (bookId) => axiosInstance.delete(`/books/${bookId}`),
    onSuccess: () => {
      refetch();
      toast.success("Book deleted successfully.");
    },
    onError: () => {
      toast.error("Failed to delete book.");
    },
  });

  const books = data?.data || [];
  const { totalPages = 1, totalDocs = 0 } = data?.pagination || {};

  return (
    <>
      <title>Manage Books | BookWagon</title>

      <section className="py-6 sm:py-8 lg:py-10">
        <Container>
          <Heading
            title="Manage Books"
            subtitle="Manage all librarians book collection"
          />

          {isLoading ? (
            <ManageBooksSkeleton />
          ) : totalDocs > 0 ? (
            <>
              <div className="mt-6 overflow-x-auto rounded-lg border">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="w-12">#</TableHead>
                      <TableHead className="w-16">Image</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Author</TableHead>
                      <TableHead className="min-w-40">Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {books.map((book, index) => (
                      <TableRow key={book._id}>
                        <TableCell className="font-semibold">
                          {(page - 1) * limit + index + 1}
                        </TableCell>
                        <TableCell>
                          <img
                            src={book.photoUrl || book.bookImage}
                            alt={book.name || book.bookName}
                            className="h-16 w-12 rounded object-cover shadow"
                          />
                        </TableCell>
                        <TableCell className="font-medium">
                          {book.name || book.bookName}
                        </TableCell>
                        <TableCell>{book.author}</TableCell>
                        <TableCell>
                          <Select
                            value={book.status}
                            onValueChange={(val) =>
                              statusMutation.mutate({
                                bookId: book._id,
                                status: val,
                              })
                            }
                          >
                            <SelectTrigger className="w-36 capitalize">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="published">
                                Published
                              </SelectItem>
                              <SelectItem value="unpublished">
                                Unpublished
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell className="text-right">
                          <AlertDialog>
                            <AlertDialogTrigger
                              render={
                                <Button
                                  variant="destructive"
                                  size="sm"
                                  className="gap-1"
                                />
                              }
                            >
                              <Trash2 className="size-3.5" />
                              Delete
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Are you sure?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action cannot be undone. This will
                                  permanently delete this book.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() =>
                                    deleteMutation.mutate(book._id)
                                  }
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {totalPages > 1 && (
                <nav
                  aria-label="Manage books pagination"
                  className="mt-6 flex items-center justify-center gap-3"
                >
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={page <= 1}
                    onClick={() => setPage((p) => p - 1)}
                  >
                    <ChevronLeft />
                    Previous
                  </Button>
                  <span className="text-sm text-muted-foreground">
                    Page {page} of {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={page >= totalPages}
                    onClick={() => setPage((p) => p + 1)}
                  >
                    Next
                    <ChevronRight />
                  </Button>
                </nav>
              )}
            </>
          ) : (
            <Empty className="mt-8">
              <EmptyMedia variant="icon">
                <BookOpen />
              </EmptyMedia>
              <EmptyTitle>No Books Found</EmptyTitle>
              <EmptyDescription>
                There are no books in the system yet.
              </EmptyDescription>
            </Empty>
          )}
        </Container>
      </section>
    </>
  );
}

export default ManageBooksPage;
