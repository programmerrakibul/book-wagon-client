const Avatar = ({ src, alt, size = "size-10" }) => {
  return (
    <>
      <div className="avatar">
        <div
          className={`rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 ${size}`}
        >
          <img src={src} alt={alt} referrerPolicy="no-referrer" />
        </div>
      </div>
    </>
  );
};

export default Avatar;
