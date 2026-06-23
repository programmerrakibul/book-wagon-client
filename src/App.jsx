import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router";
import { Toaster } from "sonner";
import router from "./routes/router";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Toaster closeButton richColors position="top-right" />
        <RouterProvider router={router} />
      </QueryClientProvider>
    </>
  );
}

export default App;
