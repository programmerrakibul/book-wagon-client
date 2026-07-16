const MyInput = ({
  type = "text",
  placeholder = "",
  id = "",
  className = "",
  disabled = false,
  ...props
}) => {
  return (
    <>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className={`input ${className}`}
        disabled={disabled}
        {...props}
      />
    </>
  );
};

export default MyInput;
