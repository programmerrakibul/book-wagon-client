import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonLayout({ variant = "cards", count = 6 }) {
  if (variant === "table")
    return (
      <div className="space-y-3 rounded-xl border p-4">
        {Array.from({ length: count }, (_, i) => (
          <Skeleton key={i} className="h-12 w-full" />
        ))}
      </div>
    );

  if (variant === "details")
    return (
      <div className="grid gap-8 lg:grid-cols-2">
        <Skeleton className="h-96 w-full rounded-xl" />
        <div className="space-y-4">
          {Array.from({ length: 6 }, (_, i) => (
            <Skeleton key={i} className="h-8 w-full" />
          ))}
        </div>
      </div>
    );

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className="overflow-hidden rounded-xl border">
          <Skeleton className="aspect-3/2 h-[clamp(150px,35vw,270px)] sm:h-44 md:h-48 lg:h-56 w-full" />
          <div className="space-y-3 p-4">
            <Skeleton className="h-5 w-4/5" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/5" />
          </div>
        </div>
      ))}
    </div>
  );
}
