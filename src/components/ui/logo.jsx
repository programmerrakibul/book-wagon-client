import { Link } from "react-router";

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2">
      <img
        src={
          "https://res.cloudinary.com/dqh5dajig/image/upload/v1784829847/logo_x1lwwv.png"
        }
        alt="BookWagon"
        className="h-8"
      />
      <span className="text-lg font-bold">BookWagon</span>
    </Link>
  );
}

export { Logo };
