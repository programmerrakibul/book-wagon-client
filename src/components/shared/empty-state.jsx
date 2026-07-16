/* eslint-disable no-unused-vars */
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";
import { Link } from "react-router";

export function EmptyState({
  icon: Icon = BookOpen,
  title = "Nothing to show yet",
  description = "Try changing your filters or check back soon.",
  action,
}) {
  return (
    <section className="rounded-xl border bg-card px-4 py-12 text-center shadow-sm sm:px-8">
      <Icon
        aria-hidden
        className="mx-auto mb-4 size-10 text-muted-foreground"
      />
      <h2 className="text-lg font-semibold sm:text-xl">{title}</h2>
      <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
        {description}
      </p>
      {action && (
        <Button asChild className="mt-6">
          <Link to={action.to}>{action.label}</Link>
        </Button>
      )}
    </section>
  );
}
