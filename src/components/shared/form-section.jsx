import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormField } from "@/components/ui/form-field";
import { cn } from "@/utils/utils";

function FormSection({
  title,
  fields,
  control,
  disabled,
  columns = 1,
  className,
}) {
  return (
    <Card
      className={cn(
        "overflow-hidden rounded-xl border border-border/50 shadow-xs",
        className,
      )}
    >
      <CardHeader className="border-b border-border/50 bg-muted/30 px-6 py-4">
        <CardTitle className="text-sm font-semibold tracking-wide uppercase text-muted-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent
        className={cn(
          "px-6 py-5",
          columns > 1 && "grid grid-cols-1 gap-x-6 gap-y-5 md:grid-cols-2",
          columns === 1 && "space-y-5",
          columns === 3 && "grid-cols-1! sm:grid-cols-2 lg:grid-cols-3",
        )}
      >
        {fields.map((f) => (
          <FormField
            key={f.name}
            field={f}
            control={control}
            disabled={disabled}
          />
        ))}
      </CardContent>
    </Card>
  );
}

export { FormSection };
