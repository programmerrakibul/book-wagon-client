import { RouterProvider } from "react-router";
import router from "./routes/router";
import AuthProvider from "./Providers/AuthProvider";

function App() {
  return (
    <>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </>
  );
}

export default App;
