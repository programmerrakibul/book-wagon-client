import { cn } from "@/utils/utils";

function ErrorMessage({ message, className }) {
  if (!message) return null;

  return (
    <p className={cn("text-destructive text-sm", className)}>{message}</p>
  );
}

export { ErrorMessage };
