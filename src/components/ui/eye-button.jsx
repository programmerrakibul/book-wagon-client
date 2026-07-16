import { Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";

function EyeButton({ showPassword, setShowPassword }) {
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      onClick={() => setShowPassword((prev) => !prev)}
      tabIndex={-1}
    >
      {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
    </Button>
  );
}

export { EyeButton };
