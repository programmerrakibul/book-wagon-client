import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BookOpen, ChevronLeft, ChevronRight, Pencil } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

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
import { useBooks } from "@/features/books/hooks/use-books";
import { changeBookStatus } from "@/features/books/services/books.service";
import useAuthStore from "@/store/use-auth-store";

function MyBooksSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 border-b p-4">
          <Skeleton className="h-16 w-12 rounded" />
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-4 w-32 hidden sm:block" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-8 w-20" />
        </div>
      ))}
    </div>
  );
}

function MyBooksPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const user = useAuthStore((s) => s.user);
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isLoading } = useBooks({ page, limit, email: user.email });

  const statusMutation = useMutation({
    mutationFn: ({ bookId, status }) => changeBookStatus(bookId, status),
    onSuccess: (result) => {
      if (result.success) {
        queryClient.invalidateQueries({ queryKey: ["books"] });
        toast.success("Book status updated.");
      } else {
        throw new Error(result.message);
      }
    },
    onError: (err) => {
      toast.error(
        err.response?.data?.message ||
          err.message ||
          "Failed to update status.",
      );
    },
  });

  const books = data?.data || [];
  const { totalPages = 1, totalDocs = 0 } = data?.pagination || {};

  return (
    <>
      <title>My Books | BookWagon</title>

      <section className="py-6 sm:py-8 lg:py-10">
        <Container>
          <Heading title="My Books" subtitle="Manage your book collection" />

          {isLoading ? (
            <MyBooksSkeleton />
          ) : totalDocs > 0 ? (
            <>
              <div className="mt-6 overflow-x-auto rounded-lg border">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="w-16">Image</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead className="hidden sm:table-cell">
                        Description
                      </TableHead>
                      <TableHead>Author</TableHead>
                      <TableHead className="min-w-40">Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {books.map((book) => (
                      <TableRow key={book._id}>
                        <TableCell>
                          <img
                            src={book.photoUrl}
                            alt={book.name}
                            className="h-16 w-12 rounded object-cover shadow"
                          />
                        </TableCell>
                        <TableCell>
                          <span className="line-clamp-1 text-sm font-medium sm:text-base">
                            {book.name}
                          </span>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          <p className="line-clamp-1 text-sm">
                            {book.description}
                          </p>
                        </TableCell>
                        <TableCell className="text-sm">{book.author}</TableCell>
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
                            <SelectTrigger className="w-36">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="PUBLISHED">
                                PUBLISHED
                              </SelectItem>
                              <SelectItem value="UNPUBLISHED">
                                UNPUBLISHED
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              navigate(`/dashboard/edit-book/${book._id}`)
                            }
                            className="gap-1"
                          >
                            <Pencil className="size-3.5" />
                            Edit
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {totalPages > 1 && (
                <nav
                  aria-label="My books pagination"
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
                You haven't added any books yet.
              </EmptyDescription>
              <Button
                onClick={() => navigate("/dashboard/add-book")}
                className="mt-2"
              >
                Add Your First Book
              </Button>
            </Empty>
          )}
        </Container>
      </section>
    </>
  );
}

export default MyBooksPage;
