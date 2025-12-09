const Heading = ({
  title = "",
  subtitle = "",
  align = "center",
  size = "hero",
  className = "",
}) => {
  const sizeClasses = {
    hero: "text-2xl sm:text-3xl lg:text-4xl xl:text-5xl",
    large: "text-2xl sm:text-3xl lg:text-4xl",
    medium: "text-xl sm:text-2xl lg:text-3xl",
    small: "text-lg sm:text-xl lg:text-2xl",
  };

  const margin = {
    hero: "mb-8 sm:mb-12 lg:mb-16",
    large: "mb-6 sm:mb-8 lg:mb-10",
    medium: "mb-4 sm:mb-6 lg:mb-8",
    small: "mb-3 sm:mb-4 lg:mb-6",
  };

  return (
    <div
      className={`text-${align} ${className} w-full max-w-3xl mx-auto space-y-3 ${margin[size]}`}
    >
      <h2
        className={`font-bold bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent mb-3 sm:mb-4 ${sizeClasses[size]}`}
      >
        {title}
      </h2>
      {subtitle !== "" && <p className="text-base sm:text-lg">{subtitle}</p>}
    </div>
  );
};

export default Heading;
