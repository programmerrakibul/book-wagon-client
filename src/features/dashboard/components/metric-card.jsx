import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/utils/utils";

function MetricCard({
  title,
  value,
  icon,
  description,
  trend,
  className,
  isLoading,
}) {
  return (
    <Card className={cn("flex flex-col", className)}>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {icon && (
          <div className="flex size-9 items-center justify-center rounded-lg bg-primary/15 text-muted-foreground">
            {icon}
          </div>
        )}
      </CardHeader>
      <CardContent className="space-y-1">
        {isLoading ? (
          <Spinner className={"size-6"} />
        ) : (
          <div className="text-2xl font-bold">{value}</div>
        )}
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
        {trend != null && (
          <p
            className={cn(
              "text-xs font-medium",
              trend >= 0 ? "text-green-600" : "text-red-600",
            )}
          >
            {trend >= 0 ? "+" : ""}
            {trend}%
          </p>
        )}
      </CardContent>
    </Card>
  );
}

export { MetricCard };
