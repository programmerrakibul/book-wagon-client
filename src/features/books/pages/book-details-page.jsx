import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import {
  ArrowLeft,
  BookOpen,
  Calendar,
  CheckCircle,
  FileText,
  Heart,
  Layers,
  Package,
  ShoppingCart,
  Tag,
  User,
  Weight,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { OrderModal } from "@/components/ui/order-modal";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { useBook } from "@/features/books/hooks/use-books";
import axiosInstance from "@/lib/axios";
import useAuthStore from "@/store/use-auth-store";

function DetailsSkeleton() {
  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:gap-12">
      <div className="flex-1 lg:max-w-md">
        <Skeleton className="aspect-3/4 w-full rounded-xl" />
      </div>
      <div className="flex-1 space-y-6">
        <Skeleton className="h-10 w-3/4" />
        <Skeleton className="h-6 w-1/3" />
        <Skeleton className="h-24 w-full rounded-xl" />
        <div className="grid grid-cols-2 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </div>
        <Skeleton className="h-32 w-full rounded-xl" />
        <Skeleton className="h-12 w-full" />
      </div>
    </div>
  );
}

function BookDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const user = useAuthStore((s) => s.user);
  const [orderOpen, setOrderOpen] = useState(false);
  const [comment, setComment] = useState("");
  const [commentError, setCommentError] = useState("");

  const { data: book, isLoading: bookLoading } = useBook(id);

  const { data: commentsData = {}, isLoading: commentLoading } = useQuery({
    queryKey: ["comments", id],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/comments/${id}`);
      return data || {};
    },
  });

  const { data: isOrdered, isLoading: isOrderedLoading } = useQuery({
    queryKey: ["is-ordered", user?.email, id],
    enabled: !!user?.email,
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/orders/check-ordered/${id}`);
      return data?.data || false;
    },
  });

  const { data: isFavorite, refetch: refetchFavorite } = useQuery({
    queryKey: ["isFavorite", id, user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const { data } = await axiosInstance.get(
        `/favorites/is-in-favorites/${id}`,
      );
      return data?.data;
    },
  });

  const toggleFavorite = useMutation({
    mutationFn: async () => {
      if (isFavorite) {
        const { data } = await axiosInstance.delete(`/favorites/${id}`);
        return { action: "removed", success: data.success };
      } else {
        const { data } = await axiosInstance.post(`/favorites/${id}`);
        return { action: "added", success: data.success };
      }
    },
    onSuccess: (result) => {
      refetchFavorite();
      toast.success(
        result.action === "added"
          ? "Added to wishlist."
          : "Removed from wishlist.",
      );
    },
    onError: () => {
      toast.error("Wishlist update failed. Please try again.");
    },
  });

  const postComment = async () => {
    setCommentError("");
    if (!comment.trim()) {
      setCommentError("Please write a comment before posting.");
      return;
    }
    try {
      const { data } = await axiosInstance.post(`/comments/${id}`, {
        comment: comment.trim(),
      });
      if (data.success) {
        setComment("");
        queryClient.invalidateQueries({ queryKey: ["comments", id] });
        toast.success(`Review posted for ${book.name}!`);
      } else {
        toast.error(data.message || "Comment failed. Please try again.");
      }
    } catch {
      toast.error("Comment failed. Please try again.");
    }
  };

  if (bookLoading) {
    return (
      <section className="bg-linear-to-br from-secondary/5 via-primary/5 to-secondary/5 py-8 sm:py-12 lg:py-16">
        <Container>
          <DetailsSkeleton />
        </Container>
      </section>
    );
  }

  if (!book) {
    return (
      <section className="py-8 sm:py-12 lg:py-16">
        <Container>
          <p className="text-center text-muted-foreground">Book not found.</p>
        </Container>
      </section>
    );
  }

  const comments = commentsData?.data || [];
  const isLibrarian = book.librarianId?.email === user?.email;

  return (
    <>
      <title>{`${book.name || "Book Details"} | BookWagon`}</title>

      <section className="bg-linear-to-br from-secondary/5 via-primary/5 to-secondary/5 py-8 sm:py-12 lg:py-16">
        <Container>
          <Button
            variant="ghost"
            size="sm"
            className="mb-6"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft />
            Go Back
          </Button>

          <div className="flex flex-col gap-6 lg:flex-row lg:gap-12">
            <div className="flex-1 lg:sticky lg:top-24 lg:max-w-md lg:self-start">
              <Card className="overflow-hidden">
                <div className="relative">
                  <img
                    src={book.photoUrl}
                    alt={book.name}
                    className="aspect-3/4 w-full object-cover"
                  />
                  <div className="absolute top-3 right-3">
                    {book.stock > 0 ? (
                      <Badge variant="default" className="gap-1 px-3 py-1">
                        <Package className="size-3" />
                        {book.stock} in stock
                      </Badge>
                    ) : (
                      <Badge variant="destructive" className="gap-1 px-3 py-1">
                        <XCircle className="size-3" />
                        Out of Stock
                      </Badge>
                    )}
                  </div>
                </div>
              </Card>
            </div>

            <div className="flex-1 space-y-6 sm:space-y-8">
              <div>
                <div className="flex items-start gap-3 sm:gap-4">
                  <h1 className="flex-1 text-2xl font-bold sm:text-3xl lg:text-4xl xl:text-5xl">
                    {book.name}
                  </h1>
                  {user && !isLibrarian && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => toggleFavorite.mutate()}
                      disabled={toggleFavorite.isPending}
                    >
                      <Heart
                        className={`size-5 ${
                          isFavorite
                            ? "fill-red-500 text-red-500"
                            : "text-muted-foreground"
                        }`}
                      />
                    </Button>
                  )}
                </div>
                <div className="mt-2 flex items-center gap-2 text-base sm:text-lg">
                  <User className="size-4 text-primary" />
                  <span className="font-medium">by {book.author}</span>
                </div>
              </div>

              <Card className="bg-linear-to-br from-primary/10 to-secondary/10 border-2 border-primary/20">
                <CardContent className="flex items-center gap-3 p-4 sm:p-6">
                  <Tag className="size-7 text-primary sm:size-8" />
                  <div>
                    <p className="text-xs text-muted-foreground sm:text-sm">
                      Price
                    </p>
                    <p className="text-3xl font-bold text-primary sm:text-4xl lg:text-5xl">
                      &#2547; {book.price}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 sm:p-6">
                  <h2 className="mb-4 flex items-center gap-2 text-lg font-bold sm:text-xl sm:mb-6">
                    <BookOpen className="size-5 text-primary" />
                    Book Information
                  </h2>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
                    <div className="flex items-start gap-3">
                      <div className="rounded-lg bg-primary/10 p-2 sm:p-3">
                        <Layers className="size-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground sm:text-sm">
                          Category
                        </p>
                        <p className="text-sm font-semibold sm:text-base">
                          {book.categoryId?.name}
                        </p>
                      </div>
                    </div>

                    {book.subcategoryId && (
                      <div className="flex items-start gap-3">
                        <div className="rounded-lg bg-secondary/10 p-2 sm:p-3">
                          <Layers className="size-5 text-secondary" />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground sm:text-sm">
                            Sub-Category
                          </p>
                          <p className="text-sm font-semibold sm:text-base">
                            {book.subcategoryId.name}
                          </p>
                        </div>
                      </div>
                    )}

                    <div className="flex items-start gap-3">
                      <div className="rounded-lg bg-primary/10 p-2 sm:p-3">
                        <FileText className="size-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground sm:text-sm">
                          Format
                        </p>
                        <p className="text-sm font-semibold sm:text-base">
                          {book.formatId?.name}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="rounded-lg bg-primary/10 p-2 sm:p-3">
                        <Weight className="size-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground sm:text-sm">
                          Weight
                        </p>
                        <p className="text-sm font-semibold sm:text-base">
                          {book.weight} kg
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="rounded-lg bg-primary/10 p-2 sm:p-3">
                        <Calendar className="size-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground sm:text-sm">
                          Published
                        </p>
                        <p className="text-sm font-semibold sm:text-base">
                          in {book.publicationYear}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="rounded-lg bg-primary/10 p-2 sm:p-3">
                        <FileText className="size-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground sm:text-sm">
                          Pages
                        </p>
                        <p className="text-sm font-semibold sm:text-base">
                          {book.pageCount} pages
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="rounded-lg bg-secondary/10 p-2 sm:p-3">
                        {book.stock > 0 ? (
                          <CheckCircle className="size-5 text-emerald-600" />
                        ) : (
                          <XCircle className="size-5 text-red-600" />
                        )}
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground sm:text-sm">
                          Availability
                        </p>
                        <p
                          className={`text-sm font-semibold sm:text-base ${
                            book.stock > 0 ? "text-emerald-600" : "text-red-600"
                          }`}
                        >
                          {book.stock > 0 ? "In Stock" : "Out of Stock"}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {book.description && (
                <Card>
                  <CardContent className="p-4 sm:p-6">
                    <h2 className="mb-3 flex items-center gap-2 text-lg font-bold sm:text-xl sm:mb-4">
                      <FileText className="size-5 text-primary" />
                      Description
                    </h2>
                    <p className="text-sm leading-relaxed sm:text-base lg:text-lg">
                      {book.description}
                    </p>
                  </CardContent>
                </Card>
              )}

              {user && !isLibrarian && (
                <Button
                  className="w-full"
                  onClick={() => setOrderOpen(true)}
                  disabled={book.stock === 0}
                >
                  <ShoppingCart />
                  {book.stock > 0 ? "Order Now" : "Out of Stock"}
                </Button>
              )}
            </div>
          </div>

          <Separator className="my-12 sm:my-16" />

          <Card>
            <CardContent className="p-4 sm:p-6 lg:p-8">
              <h2 className="mb-6 text-xl font-bold sm:text-2xl lg:text-3xl sm:mb-8">
                Reader Reviews ({comments.length || 0})
              </h2>

              {user && !isLibrarian && isOrdered && (
                <div className="mb-8 sm:mb-10">
                  {isOrderedLoading ? (
                    <div className="flex justify-center py-4">
                      <Spinner />
                    </div>
                  ) : (
                    <div className="flex gap-3 sm:gap-4">
                      <div className="size-10 shrink-0 overflow-hidden rounded-full sm:size-12">
                        <img
                          src={user.photoURL}
                          alt={user.displayName}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <Textarea
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          placeholder="Share your thoughts about this book..."
                          className="min-h-[100px] sm:min-h-[120px]"
                        />
                        {commentError && (
                          <p className="mt-1 text-sm text-destructive">
                            {commentError}
                          </p>
                        )}
                        <div className="mt-3 flex justify-end">
                          <Button onClick={postComment}>Post Comment</Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {commentLoading ? (
                <div className="flex justify-center py-8">
                  <Spinner />
                </div>
              ) : comments.length > 0 ? (
                <div className="space-y-6 sm:space-y-8">
                  {comments.map((c, index) => (
                    <div key={index} className="flex gap-3 sm:gap-4">
                      <div className="size-10 shrink-0 overflow-hidden rounded-full sm:size-12">
                        <img
                          src={c.customerImage}
                          alt={c.customerName}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="rounded-2xl bg-muted/50 p-4 sm:p-5">
                          <div className="mb-2 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                            <h4 className="text-sm font-bold sm:text-base">
                              {c.customerName}
                            </h4>
                            <span className="text-xs text-muted-foreground sm:text-sm">
                              {formatDistanceToNow(new Date(c.createdAt), {
                                addSuffix: true,
                              })}
                            </span>
                          </div>
                          <p className="text-sm leading-relaxed sm:text-base">
                            {c.comment}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center">
                  <p className="text-sm text-muted-foreground sm:text-base">
                    No reviews yet. Be the first to share your thoughts!
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </Container>
      </section>

      <OrderModal
        isOpen={orderOpen}
        closeModal={() => setOrderOpen(false)}
        book={book}
        refetch={() =>
          queryClient.invalidateQueries({
            queryKey: ["is-ordered", user?.email, id],
          })
        }
      />
    </>
  );
}

export default BookDetailsPage;
