import { cn } from "@/utils/utils";

const Section = ({ className, children, ...props }) => {
  return (
    <section
      className={cn(
        "pt-24 sm:pt-32 pb-16 w-full clear-both min-h-dvh",
        className,
      )}
      {...props}
    >
      {children}
    </section>
  );
};

export default Section;
