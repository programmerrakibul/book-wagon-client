import { RouterProvider } from "react-router";
import router from "./routes/router";
import { Toaster } from "sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ThemeProvider from "./Providers/ThemeProvider";

const queryClient = new QueryClient();

function App() {
  return (
    <>
        <ThemeProvider>
          <QueryClientProvider client={queryClient}>
            <Toaster closeButton richColors position="top-right" />
            <RouterProvider router={router} />
          </QueryClientProvider>
        </ThemeProvider>
    </>
  );
}

export default App;
