import LoginPage from "@/features/auth/pages/login-page";
import RegisterPage from "@/features/auth/pages/register-page";
import AddBookPage from "@/features/books/pages/add-book-page";
import BookDetailsPage from "@/features/books/pages/book-details-page";
import BookListPage from "@/features/books/pages/book-list-page";
import EditBookPage from "@/features/books/pages/edit-book-page";
import ManageBooksPage from "@/features/books/pages/manage-books-page";
import MyBooksPage from "@/features/books/pages/my-books-page";
import OverviewPage from "@/features/dashboard/pages/overview-page";
import AllOrdersPage from "@/features/orders/pages/all-orders-page";
import InvoicesPage from "@/features/orders/pages/invoices-page";
import MyOrdersPage from "@/features/orders/pages/my-orders-page";
import EditProfilePage from "@/features/profile/pages/edit-profile-page";
import ManageUsersPage from "@/features/profile/pages/manage-users-page";
import ProfilePage from "@/features/profile/pages/profile-page";
import AboutPage from "@/features/site/pages/about-page";
import ContactPage from "@/features/site/pages/contact-page";
import HomePage from "@/features/site/pages/home-page";
import NotFoundPage from "@/features/site/pages/not-found-page";
import WishlistPage from "@/features/wishlist/pages/wishlist-page";
import AuthLayout from "@/layouts/auth-layout";
import DashboardLayout from "@/layouts/dashboard-layout";
import ProfileLayout from "@/layouts/profile-layout";
import RootLayout from "@/layouts/root-layout";
import { createBrowserRouter } from "react-router";
import AdminRoute from "./admin-route";
import LibrarianRoute from "./librarian-route";
import PrivateRoute from "./private-route";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "books", element: <BookListPage /> },
      { path: "book-details/:id", element: <BookDetailsPage /> },
      { path: "about-us", element: <AboutPage /> },
      { path: "contact-us", element: <ContactPage /> },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <OverviewPage /> },
      { path: "my-orders", element: <MyOrdersPage /> },
      { path: "my-wishlist", element: <WishlistPage /> },
      {
        path: "all-orders",
        element: (
          <LibrarianRoute>
            <AllOrdersPage />
          </LibrarianRoute>
        ),
      },
      { path: "invoices", element: <InvoicesPage /> },
      {
        path: "add-book",
        element: (
          <LibrarianRoute>
            <AddBookPage />
          </LibrarianRoute>
        ),
      },
      {
        path: "my-books",
        element: (
          <LibrarianRoute>
            <MyBooksPage />
          </LibrarianRoute>
        ),
      },
      {
        path: "edit-book/:id",
        element: (
          <LibrarianRoute>
            <EditBookPage />
          </LibrarianRoute>
        ),
      },
      {
        path: "manage-books",
        element: (
          <AdminRoute>
            <ManageBooksPage />
          </AdminRoute>
        ),
      },
      {
        path: "manage-users",
        element: (
          <AdminRoute>
            <ManageUsersPage />
          </AdminRoute>
        ),
      },
      {
        path: "profile",
        element: <ProfileLayout />,
        children: [
          { index: true, element: <ProfilePage /> },
          { path: "edit", element: <EditProfilePage /> },
        ],
      },
    ],
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      { path: "auth/login", element: <LoginPage /> },
      { path: "auth/register", element: <RegisterPage /> },
    ],
  },
  { path: "*", element: <NotFoundPage /> },
]);

export default router;
