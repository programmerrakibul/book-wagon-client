import { getAlert } from "./get-alert";

export const loginSuccessMessage = (name) => {
  getAlert({
    title: `Welcome ${name || ""}`,
    showConfirmButton: false,
    timer: 2000,
  });
};
