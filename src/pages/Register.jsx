import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { motion } from "framer-motion";
import { FaApple, FaGoogle } from "react-icons/fa";
import { Mail, Lock, User } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Title from "../components/ui/Title";
import Select from "../components/ui/Select";

const schema = yup.object().shape({
  username: yup.string().required("Nom d'utilisateur requis"),
  email: yup.string().email("Email invalide").required("Email est requis"),
  password: yup
    .string()
    .min(6, "Le mot de passe doit contenir au moins 6 caractères")
    .required("Mot de passe est requis"),
  confirmPassword: yup
    .string()
    .oneOf(
      [yup.ref("password"), null],
      "Les mots de passe doivent correspondre"
    )
    .required("La confirmation du mot de passe est requise"),
  role: yup
    .string()
    .oneOf(["player", "organizer"], "Veuillez sélectionner un rôle")
    .required("Un rôle est requis"),
});

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState('');
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/register`,
        data
      );
      if (response.status === 201) {
        toast.success("Utilisateur enregistré");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      toast.error("Une erreur s'est produite lors de l'inscription", error);
    }
  };

  const inputClasses =
    "w-full pl-10 pr-3 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition-all duration-300 hover:border-blue-300 hover:scale-[1.02]";
  const inputContainerClasses = "relative mb-3 flex items-center";
  const fieldContainerClasses = "mb-3";
  const checkboxContainerClasses = "mb-4";

  const roleOptions = [
    { value: '', label: 'Sélectionnez votre rôle' },
    { value: 'player', label: 'Joueur' },
    { value: 'organizer', label: 'Organisateur' },
  ];

  const cardVariants = {
    hidden: {
      opacity: 0,
      x: 100,
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
    <div className="min-h-screen flex items-center justify-center w-full relative">
      {/* Image de l'oursson en arrière-plan */}
      <motion.img
        className="absolute top-4 right-4 w-20 h-20 z-0"
        src="/assets/teddy-bear.png"
        alt="Teddy Bear"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0 }}
      />
      
      <motion.div
        className="w-full max-w-md mx-5 z-10"
        initial="hidden"
        animate="visible"
        variants={cardVariants}
        transition={{ delay: 1.2 }}
      >
        <Card borderColor="rose-pastel">
          <Title level={1} animationDelay={0}>
            Inscrivez-vous
          </Title>
          <form onSubmit={handleSubmit(onSubmit)}>
            <motion.div
              className={fieldContainerClasses}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
            >
              <div className={inputContainerClasses}>
                <User className="absolute left-3 text-gray-400 h-full w-5 justify-self-center-safe"/>
                <input
                  type="text"
                  placeholder="Nom d&apos;utilisateur"
                  {...register("username")}
                  className={inputClasses}
                />
              </div>
              {errors.username && (
                <p className="text-red-500 text-sm">{errors.username.message}</p>
              )}
            </motion.div>

            <motion.div
              className={fieldContainerClasses}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
            >
              <div className={inputContainerClasses}>
                <Mail className="absolute left-3 text-gray-400 h-full w-5 justify-self-center-safe" />
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
              className={fieldContainerClasses}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
            >
              <Select
                options={roleOptions}
                value={selectedRole}
                onChange={(value) => {
                  setSelectedRole(value);
                  // Mettre à jour le formulaire react-hook-form
                  const event = { target: { name: 'role', value } };
                  register('role').onChange(event);
                }}
                placeholder="Sélectionnez votre rôle"
              />
              {errors.role && (
                <p className="text-red-500 text-sm">{errors.role.message}</p>
              )}
            </motion.div>

            <motion.div
              className={fieldContainerClasses}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.8 }}
            >
              <div className={inputContainerClasses}>
                <Lock className="absolute left-3 text-gray-400 h-full w-5" />
                <input
                  type={showPassword ? "text" : "password"}
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
              className={fieldContainerClasses}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 1.0 }}
            >
              <div className={inputContainerClasses}>
                <Lock className="absolute left-3 text-gray-400 h-full w-5" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirmez le mot de passe"
                  {...register("confirmPassword")}
                  className={inputClasses}
                />
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">
                  {errors.confirmPassword.message}
                </p>
              )}
            </motion.div>

            <motion.div
              className={checkboxContainerClasses}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 1.2 }}
            >
              <label className="flex items-center mb-2">
                <input
                  type="checkbox"
                  checked={showPassword}
                  onChange={() => setShowPassword(!showPassword)}
                  className="mr-2"
                />
                Afficher le mot de passe
              </label>
            </motion.div>

            <motion.div
              className="mb-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 1.4 }}
            >
              <Button type="submit" fullWidth={true}>
                S&apos;inscrire
              </Button>
            </motion.div>
          </form>
          <div className="mt-5">
            <p className="text-center text-gray-600 mb-4">
              Ou inscrivez-vous avec
            </p>
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
          <div className="mt-6 text-center text-gris-neutre">
            Vous avez déjà un compte ?
            <p>
              👉{" "}
              <a
                href="/"
                className="text-gradient-rose-bleu text-gradient-rose-bleu-hover font-semibold transition-all duration-300"
              >
                Se connecter
              </a>
            </p>
          </div>
        </Card>
      </motion.div>
      <ToastContainer />
    </div>
  );
}

export default Register;
