// import React, { useState } from "react";
import SideNav from "../SideNav/SideNav";
import Header from "../../pages/Header";
import Footer from "../Footer/Footer";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {

  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* Sidebar */}
      <SideNav/>

      {/* Main content wrapper (Header + Content + Footer) */}
      <div
        className="flex flex-col flex-grow transition-all duration-300 ml-47"
      >
        <Header />
        <main className="flex-grow overflow-auto bg-black">{children}</main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
