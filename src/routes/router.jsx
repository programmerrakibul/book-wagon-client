import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout/RootLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      // Define child routes here
    ],
  },
]);

export default router;
