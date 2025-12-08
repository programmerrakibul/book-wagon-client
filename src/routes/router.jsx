import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout/RootLayout";
import Home from "../pages/Home/Home";
import Books from "../pages/Books/Books";
import AuthLayout from "../layouts/AuthLayout/AuthLayout";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";
import Overview from "../pages/Dashboard/Overview/Overview";
import AddBook from "../pages/Dashboard/AddBook/AddBook";
import ProfileLayout from "../layouts/ProfileLayout/ProfileLayout";
import Profile from "../pages/Dashboard/Profile/Profile/Profile";
import EditProfile from "../pages/Dashboard/Profile/EditProfile/EditProfile";
import DashboardLayout from "../layouts/DashboardLayout/DashboardLayout";
import MyBooks from "../pages/Dashboard/MyBooks/MyBooks";
import EditBook from "../pages/Dashboard/EditBook/EditBook";
import ManageBooks from "../pages/Dashboard/ManageBooks/ManageBooks";

const router = createBrowserRouter([
  // Main routes
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "books",
        element: <Books />,
      },
    ],
  },

  // Dashboard routes
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <Overview />,
      },
      {
        path: "add-book",
        element: <AddBook />,
      },
      {
        path: "my-books",
        element: <MyBooks />,
      },
      {
        path: "edit-book/:id",
        element: <EditBook />,
      },
      {
        path: "manage-books",
        element: <ManageBooks />,
      },
      // Profile Layout
      {
        path: "profile",
        element: <ProfileLayout />,
        children: [
          {
            index: true,
            element: <Profile />,
          },
          {
            path: "edit",
            element: <EditProfile />,
          },
        ],
      },
    ],
  },

  // Auth routes
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "auth/login",
        element: <Login />,
      },
      {
        path: "auth/register",
        element: <Register />,
      },
    ],
  },
]);

export default router;
