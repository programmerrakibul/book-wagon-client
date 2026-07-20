import { Button } from "@/components/ui/button";
import { loginWithGoogle } from "@/store/use-auth-store";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { postUser } from "../services/auth.service";

const GoogleLogin = ({ label = "Sign in with Google" }) => {
  const navigate = useNavigate();

  const handleGoogle = async () => {
    try {
      const user = await loginWithGoogle();
      await postUser(user);
      toast.success("Signed in with Google!");
      navigate("/");
    } catch (err) {
      toast.error(err.message || "Google sign-in failed");
    }
  };

  return (
    <>
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-card px-2 text-muted-foreground">
            or continue with
          </span>
        </div>
      </div>

      <Button
        type="button"
        variant="outline"
        className="w-full"
        onClick={handleGoogle}
      >
        {label}
      </Button>
    </>
  );
};

export default GoogleLogin;
