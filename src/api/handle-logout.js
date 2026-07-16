import { logoutUser } from "@/stores/use-auth-store";
import { getAlert } from "@/utils/get-alert";
import { getAuthErrorMessage } from "@/utils/get-auth-error-message";
import { toast } from "sonner";

export const handleLogout = async () => {
  try {
    await logoutUser();

    getAlert({ title: "You have been logged out successfully." });
  } catch (error) {
    const errorMessage = getAuthErrorMessage(error.code);
    toast.error(errorMessage);
  }
};
