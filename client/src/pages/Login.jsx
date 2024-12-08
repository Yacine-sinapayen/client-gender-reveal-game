import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaApple, FaGoogle } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../store/slice/authSlice';

const schema = yup.object().shape({
  email: yup.string().email('Email invalide').required('Email est requis'),
  password: yup.string().required('Mot de passe requis'),
});

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:5555/auth/login', data);
      if (response.status === 200 || response.status === 201) {
        dispatch(loginSuccess({ user: response.data.user, token: response.data.token }));
        toast.success('Connexion réussie');
        setTimeout(() => {
          navigate('/dashboard');
        }, 2000); 
      }
    } catch (error) {
      toast.error('Échec de la connexion');
    }
  };

  const inputClasses = "w-full px-3 py-2 mb-4 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition-all duration-300 hover:border-blue-300 hover:scale-[1.02]";
  const buttonClasses = "w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition-all duration-300";

  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: (i) => ({
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6, 
        ease: "easeOut",
        delay: i * 0.2
      }
    })
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg mx-5">
        <motion.h1 
          className="text-4xl font-bold mb-8 text-center text-gray-900"
          initial="hidden"
          animate="visible"
          variants={titleVariants}
          custom={0}
        >
          Connexion
        </motion.h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <motion.div initial="hidden" animate="visible" variants={titleVariants} custom={1}>
            <input 
              type="email" 
              placeholder="Email" 
              {...register('email')}
              className={inputClasses}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </motion.div>
          <motion.div initial="hidden" animate="visible" variants={titleVariants} custom={2}>
            <input 
              type="password" 
              placeholder="Mot de passe" 
              {...register('password')}
              className={inputClasses}
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </motion.div>
          <motion.div initial="hidden" animate="visible" variants={titleVariants} custom={3}>
            <button 
              type="submit" 
              className={buttonClasses}
            >
              Se connecter
            </button>
          </motion.div>
        </form>
        <div className="mt-6">
          <p className="text-center text-gray-600 mb-4">Ou connectez-vous avec</p>
          <div className="flex justify-center space-x-4">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 bg-gray-200 rounded-full hover:bg-blue-100 transition-colors duration-300"
            >
              <FaApple className="text-gray-800 text-xl" />
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 bg-gray-200 rounded-full hover:bg-blue-100 transition-colors duration-300"
            >
              <FaGoogle className="text-gray-800 text-xl" />
            </motion.button>
          </div>
        </div>
        <p className="mt-8 text-center text-gray-600">
          Vous n'avez pas de compte ? <a href="/register" className="text-blue-500 font-semibold hover:underline">Inscrivez-vous</a>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;