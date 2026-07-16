import { cn } from "@/utils/utils";

function Heading({ title, subtitle, size = "default" }) {
  return (
    <div className="space-y-1">
      <h1
        className={cn(
          "font-bold tracking-tight text-foreground",
          size === "large" ? "text-3xl sm:text-4xl" : "text-2xl sm:text-3xl"
        )}
      >
        {title}
      </h1>
      {subtitle && (
        <p className="text-muted-foreground">{subtitle}</p>
      )}
    </div>
  );
}

export { Heading };
