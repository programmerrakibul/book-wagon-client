import AuthLayout from "@/layouts/auth-layout";
import DashboardLayout from "@/layouts/dashboard-layout";
import ProfileLayout from "@/layouts/profile-layout";
import RootLayout from "@/layouts/root-layout";
import AboutUs from "@/pages/AboutUs/AboutUs";
import Login from "@/pages/Auth/Login/Login";
import Register from "@/pages/Auth/Register/Register";
import ContactUs from "@/pages/ContactUs/ContactUs";
import AllOrders from "@/pages/Dashboard/AllOrders/AllOrders";
import EditBook from "@/pages/Dashboard/EditBook/EditBook";
import Invoices from "@/pages/Dashboard/Invoices/Invoices";
import ManageBooks from "@/pages/Dashboard/ManageBooks/ManageBooks";
import ManageUsers from "@/pages/Dashboard/ManageUsers/ManageUsers";
import MyBooks from "@/pages/Dashboard/MyBooks/MyBooks";
import MyOrders from "@/pages/Dashboard/MyOrders/MyOrders";
import Overview from "@/pages/Dashboard/Overview/Overview";
import EditProfile from "@/pages/Dashboard/Profile/EditProfile/EditProfile";
import Profile from "@/pages/Dashboard/Profile/Profile/Profile";
import Wishlist from "@/pages/Dashboard/Wishlist/Wishlist";
import AddBook from "@/pages/Dashboard/add-book/add-book";
import Error from "@/pages/error/error";
import BookDetails from "@/pages/book-details/book-details";
import Books from "@/pages/books/books";
import Home from "@/pages/home/home";
import { createBrowserRouter } from "react-router";
import AdminRoute from "./admin-route";
import LibrarianRoute from "./librarian-route";
import PrivateRoute from "./private-route";

const router = createBrowserRouter([
  // Main routes
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "books",
        element: <Books />,
      },
      {
        path: "book-details/:id",
        element: <BookDetails />,
      },
      {
        path: "about-us",
        element: <AboutUs />,
      },
      {
        path: "contact-us",
        element: <ContactUs />,
      },
    ],
  },

  // Dashboard routes
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <Overview />,
      },
      {
        path: "my-orders",
        element: <MyOrders />,
      },
      {
        path: "my-wishlist",
        element: <Wishlist />,
      },
      {
        path: "all-orders",
        element: (
          <LibrarianRoute>
            <AllOrders />
          </LibrarianRoute>
        ),
      },
      {
        path: "invoices",
        element: <Invoices />,
      },
      {
        path: "add-book",
        element: (
          <LibrarianRoute>
            <AddBook />
          </LibrarianRoute>
        ),
      },
      {
        path: "my-books",
        element: (
          <LibrarianRoute>
            <MyBooks />
          </LibrarianRoute>
        ),
      },
      {
        path: "edit-book/:id",
        element: (
          <LibrarianRoute>
            <EditBook />
          </LibrarianRoute>
        ),
      },
      {
        path: "manage-books",
        element: (
          <AdminRoute>
            <ManageBooks />
          </AdminRoute>
        ),
      },
      {
        path: "manage-users",
        element: (
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        ),
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
