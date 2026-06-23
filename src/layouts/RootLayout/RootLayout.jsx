import Footer from "@/pages/shared/Footer/Footer";
import Navbar from "@/pages/shared/Navbar/Navbar";
import { Outlet } from "react-router";

const RootLayout = () => {
  return (
    <>
      <header className="sticky top-0 z-50">
        <Navbar />
      </header>

      <main className="space-y-16 md:space-y-20">
        <Outlet />
      </main>

      <Footer />
    </>
  );
};

export default RootLayout;
