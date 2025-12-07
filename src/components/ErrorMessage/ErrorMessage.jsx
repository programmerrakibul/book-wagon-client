const ErrorMessage = ({ message }) => {
  if (!message) return null;

  return (
    <>
      <span className="text-error text-xs sm:text-sm mt-1 block">
        {message}
      </span>
    </>
  );
};

export default ErrorMessage;
