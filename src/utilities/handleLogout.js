import { toast } from "sonner";
import { getAlert } from "./getAlert";
import { getAuthErrorMessage } from "./getAuthErrorMessage";

export const handleLogout = async (logOutUser) => {
  try {
    await logOutUser();
    getAlert({ title: "You have been logged out successfully." });
  } catch (error) {
    const errorMessage = getAuthErrorMessage(error.code);
    toast.error(errorMessage);
    console.error("Error logging out:", error);
  }

  return null;
};
