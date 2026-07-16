import { Footer } from "@/components/ui/footer";
import { Navbar } from "@/components/ui/navbar";
import { Outlet } from "react-router";

const RootLayout = () => {
  return (
    <div className="flex min-h-screen flex-col">
        <Navbar />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default RootLayout;
