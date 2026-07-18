import { useQueryClient } from "@tanstack/react-query";
import { BookOpen } from "lucide-react";
import { useCallback, useState } from "react";

import { BookActionsDropdown } from "@/features/book/components/book-actions-dropdown";
import { BookViewModal } from "@/features/book/components/book-view-modal";

import { DataTable } from "@/components/shared/data-table";
import { EmptyState } from "@/components/shared/empty-state";
import { Pagination } from "@/components/shared/pagination";
import { SkeletonLayout } from "@/components/shared/skeleton-layout";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { EditBookModal } from "@/features/book/components/edit-book-modal";
import { useBooks, useDeleteBook } from "@/features/book/hooks/use-books";
import useAuthStore from "@/store/use-auth-store";
import useBookFilters, { setPage } from "@/store/use-book-filters";

import { ActiveToggle } from "../components/active-toggle";
import StatusDropdown from "../components/status-dropdown";

function MyBooksPage() {
  const queryClient = useQueryClient();
  const user = useAuthStore((s) => s.user);
  const [editId, setEditId] = useState(null);
  const [viewBook, setViewBook] = useState(null);
  const page = useBookFilters((s) => s.page);

  const { data, isLoading } = useBooks({ page, email: user.email });

  const deleteMutation = useDeleteBook();

  const books = data?.data || [];
  const { totalPages = 1, totalDocs = 0 } = data?.pagination || {};

  const handleEdit = useCallback((book) => {
    setEditId(book._id);
  }, []);

  const columns = [
    {
      key: "image",
      header: "Image",
      className: "w-16",
      cell: (row) => (
        <img
          src={row.photoUrl}
          alt={row.name}
          className="h-14 w-10 rounded-md object-cover ring-1 ring-border"
        />
      ),
    },
    {
      key: "name",
      header: "Name",
      cell: (row) => (
        <span className="line-clamp-2 w-[170px] whitespace-break-spaces truncate text-sm font-medium">
          {row.name}
        </span>
      ),
    },
    {
      key: "description",
      header: "Description",
      className: "hidden sm:table-cell",
      cell: (row) => (
        <p className="line-clamp-2 w-xs whitespace-break-spaces truncate text-xs text-muted-foreground">
          {row.description}
        </p>
      ),
    },
    {
      key: "author",
      header: "Author",
      className: "hidden md:table-cell",
      cell: (row) => <span className="text-sm">{row.author}</span>,
    },
    {
      key: "status",
      header: "Status",
      className: "min-w-36",
      cell: (row) => <StatusDropdown bookId={row._id} status={row.status} />,
    },
    {
      key: "actions",
      header: "Actions",
      className: "text-right",
      cell: (row) => (
        <BookActionsDropdown
          book={row}
          onView={setViewBook}
          onEdit={handleEdit}
          onDelete={deleteMutation.mutate}
          showEdit
        />
      ),
    },
  ];

  const emptyState = (
    <EmptyState
      icon={BookOpen}
      title="No Books Found"
      description="You haven't added any books yet."
      action={{ label: "Add Your First Book", to: "/dashboard/add-book" }}
    />
  );

  const renderCard = (row) => (
    <div className="flex gap-4 rounded-xl border bg-card p-4">
      <img
        src={row.photoUrl}
        alt={row.name}
        className="h-24 w-16 shrink-0 rounded-md object-cover ring-1 ring-border"
      />
      <div className="flex flex-1 flex-col justify-between">
        <div>
          <h3 className="line-clamp-1 text-sm font-medium">{row.name}</h3>
          <p className="line-clamp-2 text-xs text-muted-foreground">
            {row.description}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">{row.author}</p>
        </div>
        <div className="flex items-center justify-between gap-2">
          <StatusDropdown bookId={row._id} status={row.status} />
          <BookActionsDropdown
            book={row}
            onView={setViewBook}
            onEdit={handleEdit}
            onDelete={deleteMutation.mutate}
            showEdit
          />
        </div>
      </div>
    </div>
  );

  const handlePageChange = useCallback((page) => {
    setPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      <title>My Books | BookWagon</title>

      <section className="py-6 sm:py-8 lg:py-10">
        <Container>
          <Heading title="My Books" subtitle="Manage your book collection" />

          {isLoading ? (
            <div className="mt-6">
              <SkeletonLayout variant="table" count={10} />
            </div>
          ) : (
            <>
              <div className="mt-6">
                <DataTable
                  columns={columns}
                  data={books}
                  emptyState={emptyState}
                  renderCard={renderCard}
                />
              </div>

              <Pagination
                page={page}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />

              {totalDocs > 0 && (
                <p className="mt-4 text-center text-xs text-muted-foreground">
                  Showing {books.length} of {totalDocs} books
                </p>
              )}
            </>
          )}
        </Container>
      </section>

      <EditBookModal
        open={!!editId}
        onOpenChange={(open) => {
          if (!open) {
            setEditId(null);
            queryClient.invalidateQueries({ queryKey: ["books"] });
          }
        }}
        id={editId}
      />

      <BookViewModal
        open={!!viewBook}
        onOpenChange={(open) => {
          if (!open) setViewBook(null);
        }}
        book={viewBook}
      />
    </>
  );
}

export default MyBooksPage;
