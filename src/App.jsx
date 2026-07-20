import router from "@/routes/router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router";
import { Toaster } from "./components/ui/sonner";

// eslint-disable-next-line react-refresh/only-export-components
export const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <Toaster closeButton richColors position="top-center" />
      </QueryClientProvider>
    </>
  );
}

export default App;
