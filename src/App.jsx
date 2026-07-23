import router from "@/routes/router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { RouterProvider } from "react-router";
import { Toaster } from "./components/ui/sonner";

// eslint-disable-next-line react-refresh/only-export-components
export const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          value={{ light: "light", dark: "dark" }}
        >
          <RouterProvider router={router} />
          <Toaster closeButton richColors position="top-center" />
        </ThemeProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
