import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/utils/utils";

function Loading({ message, fullPage = true }) {
  if (fullPage) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-3">
        <Spinner className="size-8" />
        {message && <p className="text-sm text-muted-foreground">{message}</p>}
      </div>
    );
  }

  return (
    <div className={cn("flex items-center gap-3 py-8 justify-center")}>
      <Spinner className="size-6" />
      {message && <p className="text-sm text-muted-foreground">{message}</p>}
    </div>
  );
}

export { Loading };
