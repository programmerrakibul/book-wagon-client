import { cn } from "@/utils/utils";

function Container({ className, children }) {
  return (
    <div className={cn("mx-auto w-full container px-4 sm:px-6 lg:px-8", className)}>
      {children}
    </div>
  );
}

export { Container };
