import { Container } from "@/components/ui/container";
import { Skeleton } from "@/components/ui/skeleton";

export function DashboardSkeleton() {
  return (
    <Container className="py-6 sm:py-8 lg:py-10 space-y-8">
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        <div className="rounded-xl border p-4 space-y-4">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-[300px] w-full" />
        </div>
        <div className="rounded-xl border p-4 space-y-4">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-[300px] w-full" />
        </div>
      </div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        <div className="rounded-xl border p-4 space-y-4">
          <Skeleton className="h-5 w-32" />
          <div className="space-y-3">
            {Array.from({ length: 5 }, (_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        </div>
        <div className="rounded-xl border p-4 space-y-4">
          <Skeleton className="h-5 w-32" />
          <div className="space-y-3">
            {Array.from({ length: 5 }, (_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
}
