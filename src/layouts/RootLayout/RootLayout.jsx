import { Outlet } from "react-router";
import Navbar from "../../pages/shared/Navbar/Navbar";
import Footer from "../../pages/shared/Footer/Footer";

const RootLayout = () => {
  return (
    <>
      <header>
        <Navbar />
      </header>

      <main>
        <Outlet />
      </main>

      <Footer />
    </>
  );
};

export default RootLayout;
