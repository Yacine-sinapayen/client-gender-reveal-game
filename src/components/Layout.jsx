import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Navbar />
      <main className=" container mx-auto px-4 py-4 flex items-center">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;