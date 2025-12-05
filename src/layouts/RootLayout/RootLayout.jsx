import { Outlet } from "react-router";
import Navbar from "../../pages/shared/Navbar/Navbar";

const RootLayout = () => {
  return (
    <>
      <header>
        <Navbar />
      </header>

      <main>
        <Outlet />
      </main>

      {/* <Footer /> */}
    </>
  );
};

export default RootLayout;
