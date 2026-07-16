import { cn } from "@/utils/cn";

const Button = ({
  children,
  handleClick,
  disable = false,
  className,
  ...rest
}) => {
  return (
    <button
      disabled={disable}
      onClick={handleClick}
      className={cn(
        "btn bg-linear-to-br from-primary/60 text-neutral dark:text-white border-none shadow-none",
        "hover:from-primary/75 to-secondary/60 hover:to-secondary/75",
        "duration-300 transition-colors",
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
