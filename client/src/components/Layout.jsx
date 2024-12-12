import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container mx-auto px-4 py-4 h-[70vh] flex items-center">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;