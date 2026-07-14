import { cn } from "@/utils/cn";

const Container = ({ children, className, ...props }) => {
  return (
    <div
      className={cn(`container mx-auto px-5 sm:px-6 lg:px-8`, className)}
      {...props}
    >
      {children}
    </div>
  );
};

export default Container;
