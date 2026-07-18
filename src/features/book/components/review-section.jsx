import { formatDistanceToNow } from "date-fns";
import { MessageSquare } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import {
  useComments,
  usePostComment,
} from "@/features/book/hooks/use-comments";
import useAuthStore from "@/store/use-auth-store";
import { toast } from "sonner";

function ReviewForm({ bookId, bookName }) {
  const user = useAuthStore((s) => s.user);
  const [comment, setComment] = useState("");
  const [commentError, setCommentError] = useState("");
  const postCommentMutation = usePostComment(bookId, bookName);

  const handleSubmit = () => {
    if (!user) {
      toast.error("Please sign in to post a comment.");
      return;
    }

    setCommentError("");
    if (!comment.trim()) {
      setCommentError("Please write a comment before posting.");
      return;
    }

    postCommentMutation.mutate(comment.trim(), {
      onSuccess: () => setComment(""),
    });
  };

  return (
    <div className="mb-8 sm:mb-10">
      <div className="flex gap-3 sm:gap-4">
        <div className="size-10 shrink-0 overflow-hidden rounded-full sm:size-12">
          {user ? (
            <img
              src={user?.photoURL}
              alt={user?.displayName}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="text-xl font-bold w-full h-full flex items-center justify-center text-card bg-card-foreground/40">
              U
            </span>
          )}
        </div>
        <div className="flex-1">
          <Textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your thoughts about this book..."
            className="min-h-[100px] sm:min-h-[120px]"
          />
          {commentError && (
            <p className="mt-1 text-sm text-destructive">{commentError}</p>
          )}
          <div className="mt-3 flex justify-end">
            <Button
              onClick={handleSubmit}
              disabled={postCommentMutation.isPending}
            >
              {postCommentMutation.isPending ? (
                <Spinner className="mr-2 size-4" />
              ) : null}
              Post Comment
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function CommentItem({ c }) {

  const { userId, comment} = c

  return (
    <div className="flex gap-3 sm:gap-4">
      <div className="size-10 shrink-0 overflow-hidden rounded-full sm:size-12">
        <img
          src={userId.photoUrl}
          alt={userId.name}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex-1">
        <div className="rounded-2xl bg-muted/50 p-4 sm:p-5">
          <div className="mb-2 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
            <h4 className="text-sm font-bold sm:text-base">{userId.name}</h4>
            <span className="text-xs text-muted-foreground sm:text-sm">
              {formatDistanceToNow(new Date(c.createdAt), { addSuffix: true })}
            </span>
          </div>
          <p className="text-sm leading-relaxed sm:text-base">{comment}</p>
        </div>
      </div>
    </div>
  );
}

function ReviewSection({ bookId, bookName }) {
  const { data: commentsData = {}, isLoading: commentLoading } =
    useComments(bookId);
  const comments = commentsData?.data || [];

  return (
    <Card className="max-w-5xl mx-auto">
      <CardContent className="p-4 sm:p-6 lg:p-8">
        <h2 className="mb-6 text-xl font-bold sm:text-2xl lg:text-3xl sm:mb-8">
          Reader Reviews ({comments.length || 0})
        </h2>

        <ReviewForm bookId={bookId} bookName={bookName} />

        {commentLoading ? (
          <div className="flex justify-center py-8">
            <Spinner />
          </div>
        ) : comments.length > 0 ? (
          <div className="space-y-6 sm:space-y-8">
            {comments.map((c, index) => (
              <CommentItem key={index} c={c} />
            ))}
          </div>
        ) : (
          <div className="py-12 text-center">
            <MessageSquare className="mx-auto mb-3 size-8 text-muted-foreground/40" />
            <p className="text-sm text-muted-foreground sm:text-base">
              No reviews yet. Be the first to share your thoughts!
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export { ReviewSection };
