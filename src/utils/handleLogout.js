import { logoutUser } from "@/stores/use-auth-store";
import { toast } from "sonner";
import { getAlert } from "./getAlert";
import { getAuthErrorMessage } from "./getAuthErrorMessage";

export const handleLogout = async () => {
  try {
    await logoutUser();

    getAlert({ title: "You have been logged out successfully." });
  } catch (error) {
    const errorMessage = getAuthErrorMessage(error.code);
    toast.error(errorMessage);
  }
};
