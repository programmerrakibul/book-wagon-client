import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router";
import { Toaster } from "sonner";
import router from "./routes/router";

// eslint-disable-next-line react-refresh/only-export-components
export const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <Toaster closeButton richColors position="top-right" />
      </QueryClientProvider>
    </>
  );
}

export default App;
