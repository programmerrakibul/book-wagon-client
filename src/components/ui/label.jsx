const MyLabel = ({ htmlFor, className = "", label = "", ...props }) => {
  return (
    <>
      <label htmlFor={htmlFor} className={`label ${className}`} {...props}>
        {label}
      </label>
    </>
  );
};

export default MyLabel;
