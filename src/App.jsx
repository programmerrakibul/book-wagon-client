import { RouterProvider } from "react-router";
import router from "./routes/router";
import AuthProvider from "./Providers/AuthProvider";
import { Toaster } from "sonner";

function App() {
  return (
    <>
      <AuthProvider>
        <Toaster closeButton richColors position="top-right" />
        <RouterProvider router={router} />
      </AuthProvider>
    </>
  );
}

export default App;
