import { Button } from "@/components/ui/button";
import useAuthStore from "@/store/use-auth-store";
import { cn } from "@/utils/utils";
import { HeartIcon } from "lucide-react";
import { startTransition, useOptimistic } from "react";
import { toast } from "sonner";
import { useIsFavorite, useToggleFavorite } from "../hooks/use-favorites";

const FavoriteButton = ({ email, id, className }) => {
  const user = useAuthStore((s) => s.user);
  const toggleFavorite = useToggleFavorite(id);
  const { data: isFavorite = false } = useIsFavorite(id, user?.email);
  const [optimisticFavorite, setOptimisticFavorite] = useOptimistic(
    isFavorite,
    (_current, nextValue) => nextValue,
  );

  if (email === user?.email) return null;

  const handleToggle = (e) => {
    e.stopPropagation();

    if (!user) {
      toast.info("Please sign in to add to wishlist.");
      return;
    }

    startTransition(async () => {
      setOptimisticFavorite(!optimisticFavorite);
      await toggleFavorite.mutateAsync();
    });
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleToggle}
      disabled={toggleFavorite.isPending}
      className={cn(className)}
    >
      <HeartIcon
        className={cn(
          "size-5",
          optimisticFavorite && "fill-red-500 text-red-500",
          !optimisticFavorite && "text-muted-foreground",
        )}
      />
    </Button>
  );
};

export default FavoriteButton;
