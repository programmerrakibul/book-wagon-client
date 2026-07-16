import { ArrowLeft } from "lucide-react";
import { Link } from "react-router";

import { Button } from "@/components/ui/button";

function BackButton({ to = "/", label = "Go Back" }) {
  return (
    <Button variant="ghost" asChild>
      <Link to={to}>
        <ArrowLeft className="size-4" />
        {label}
      </Link>
    </Button>
  );
}

export { BackButton };
