import { useQueryClient } from "@tanstack/react-query";
import { BookOpen, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";

import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { DataTable } from "@/components/shared/data-table";
import { EmptyState } from "@/components/shared/empty-state";
import { Pagination } from "@/components/shared/pagination";
import { SkeletonLayout } from "@/components/shared/skeleton-layout";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { EditBookModal } from "@/features/book/components/edit-book-modal";
import { useBooks, useDeleteBook } from "@/features/book/hooks/use-books";
import useAuthStore from "@/store/use-auth-store";
import StatusDropdown from "../components/status-dropdown";

function MyBooksPage() {
  const queryClient = useQueryClient();
  const user = useAuthStore((s) => s.user);
  const [page, setPage] = useState(1);
  const [editId, setEditId] = useState(null);
  const limit = 10;

  const { data, isLoading } = useBooks({ page, limit, email: user.email });

  const deleteMutation = useDeleteBook();

  const books = data?.data || [];
  const { totalPages = 1, totalDocs = 0 } = data?.pagination || {};

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
        <div className="flex items-center justify-end gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setEditId(row._id)}
            className="gap-1"
          >
            <Pencil className="size-3.5" />
            <span className="hidden sm:inline">Edit</span>
          </Button>
          <ConfirmDialog
            title="Delete Book?"
            description={`This will permanently delete "${row.name}". This action cannot be undone.`}
            confirmLabel="Delete"
            onConfirm={() => deleteMutation.mutate(row._id)}
          >
            <Button variant="destructive" size="sm" className="gap-1">
              <Trash2 className="size-3.5" />
              <span className="hidden sm:inline">Delete</span>
            </Button>
          </ConfirmDialog>
        </div>
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
          <div className="flex items-center gap-1.5">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setEditId(row._id)}
              className="gap-1"
            >
              <Pencil className="size-3.5" />
            </Button>
            <ConfirmDialog
              title="Delete Book?"
              description={`This will permanently delete "${row.name}". This action cannot be undone.`}
              confirmLabel="Delete"
              onConfirm={() => deleteMutation.mutate(row._id)}
            >
              <Button variant="destructive" size="sm" className="gap-1">
                <Trash2 className="size-3.5" />
              </Button>
            </ConfirmDialog>
          </div>
        </div>
      </div>
    </div>
  );

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
                onPageChange={setPage}
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
    </>
  );
}

export default MyBooksPage;
