import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Assuming the token is stored in localStorage
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="w-full flex justify-end p-4">
        <button 
          onClick={handleLogout} 
          className="py-2 px-4 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition-all duration-300"
        >
          Déconnexion
        </button>
      </div>
      <motion.h1 
        className="text-4xl font-bold text-center text-gray-900"
        initial={{ opacity: 0, scale: 0.8, rotateX: -45 }}
        animate={{ opacity: 1, scale: 1, rotateX: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        Bienvenue sur la page d'accueil
      </motion.h1>
    </div>
  );
};

export default Home;