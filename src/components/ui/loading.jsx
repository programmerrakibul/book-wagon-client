import { FaBook } from "react-icons/fa";

const Loading = ({ message = "Loading..." }) => {
  return (
    <div className="flex flex-col justify-center items-center min-h-[60vh] px-4 py-8 sm:py-12 lg:py-16">
      <div className="relative mb-6 sm:mb-8">
        {/* Outer spinning ring */}
        <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 border-4 sm:border-[5px] border-primary/20 border-t-primary rounded-full animate-spin"></div>

        {/* Inner book icon */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <FaBook className="text-2xl sm:text-3xl lg:text-4xl text-primary animate-pulse" />
        </div>
      </div>

      <div className="text-center max-w-md">
        <p className="text-base sm:text-lg lg:text-xl font-semibold mb-2 animate-pulse">
          {message}
        </p>
        <p className="text-xs sm:text-sm">
          Please wait while we fetch your content
        </p>
      </div>

      {/* Animated dots */}
      <div className="flex gap-2 mt-6 sm:mt-8">
        <div
          className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-primary rounded-full animate-bounce"
          style={{ animationDelay: "0ms" }}
        ></div>
        <div
          className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-primary rounded-full animate-bounce"
          style={{ animationDelay: "150ms" }}
        ></div>
        <div
          className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-primary rounded-full animate-bounce"
          style={{ animationDelay: "300ms" }}
        ></div>
      </div>
    </div>
  );
};

export default Loading;
