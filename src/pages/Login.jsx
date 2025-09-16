import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { motion } from "framer-motion";
import { FaApple, FaGoogle } from "react-icons/fa";
import { Mail, Lock } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../store/slices/authSlice";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Title from "../components/ui/Title";

const schema = yup.object().shape({
  email: yup.string().email("Email invalide").required("Email est requis"),
  password: yup.string().required("Mot de passe requis"),
});

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        data
      );
      if (response.status === 200 || response.status === 201) {
        dispatch(
          loginSuccess({ user: response.data.user, token: response.data.token })
        );
        toast.success("Connexion réussie");
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    } catch {
      toast.error("Échec de la connexion");
    }
  };

  const inputClasses =
    "w-full pl-10 pr-3 py-2 mb-4 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition-all duration-300 hover:border-blue-300 hover:scale-[1.02]";
  const inputContainerClasses = "relative mb-4 flex items-center";

  const cardVariants = {
    hidden: {
      opacity: 0,
      x: 100, // Commence 100px vers la droite
    },
    visible: {
      opacity: 1,
      x: 0, // Revient à sa position normale
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 100,
        duration: 0.6,
      },
    },
  };

  return (
    <div className="flex items-center justify-center w-full">
      <motion.div
        className="w-full max-w-md mx-5"
        initial="hidden"
        animate="visible"
        variants={cardVariants}
      >
        <Card borderColor="rose-pastel">
          <Title level={1} animationDelay={0}>
            Connexion
          </Title>
          <form onSubmit={handleSubmit(onSubmit)}>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            >
              <div className={inputContainerClasses}>
                <Mail className="absolute left-3 bottom-2 text-gray-400 h-full w-5 justify-self-center-safe" />
                <input
                  type="email"
                  placeholder="Email"
                  {...register("email")}
                  className={inputClasses}
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
            >
              <div className={inputContainerClasses}>
                <Lock className="absolute left-3 bottom-2 text-gray-400 h-full w-5" />
                <input
                  type="password"
                  placeholder="Mot de passe"
                  {...register("password")}
                  className={inputClasses}
                />
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
            >
              <Button type="submit" fullWidth={true}>
                Se connecter
              </Button>
            </motion.div>
          </form>
          <div className="mt-6">
            <p className="text-center text-gray-600 mb-4">
              Ou connectez-vous avec
            </p>
            <div className="flex justify-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 bg-gray-200 rounded-full hover:bg- coblue-100 transition-colors duration-300"
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
          <div className="mt-8 text-center text-gris-neutre">
            Pas encore de compte ?
            <p>
              👉{" "}
              <a
                href="/register"
                className="text-gradient-rose-bleu text-gradient-rose-bleu-hover font-semibold transition-all duration-300"
              >
                Inscrivez-vous
              </a>
            </p>
          </div>
        </Card>
      </motion.div>
      <ToastContainer />
    </div>
  );
}

export default Login;
