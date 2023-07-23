import { Outlet } from "react-router-dom";
import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import ScrollButton from "../components/ScrollButton";

function Layout() {
  return (
    <div>
      <Navbar />
      <main className="">
        <Outlet />
      </main>
      <ScrollButton/>
      <Footer />
    </div>
  );
}

export default Layout;
