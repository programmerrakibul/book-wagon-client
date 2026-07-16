import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export const getAlert = async ({
  icon = "success",
  title = "Completed",
  timer = 3000,
  ...props
}) => {
  MySwal.fire({
    icon: icon,
    title: title,
    timer: timer,
    ...props,
  });

  return MySwal;
};
