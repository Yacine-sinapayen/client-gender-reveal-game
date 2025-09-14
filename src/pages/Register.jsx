import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const schema = yup.object().shape({
  username: yup.string().required("Nom d'utilisateur est requis"),
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
    .required("Confirmation du mot de passe est requise"),
  role: yup
    .string()
    .oneOf(["player", "organizer"], "Veuillez sélectionner un rôle")
    .required("Un rôle est requis"),
});

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  
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
    "w-full px-3 py-2 mb-4 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition-all duration-300 hover:border-blue-300 hover:scale-[1.02]";
  const buttonClasses =
    "bg-top-gray-brown-dark w-full py-2 px-4 text-white font-semibold rounded-md hover:bg-blue-600 transition-all duration-300";

  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        delay: i * 0.2, // Delay each element by 0.2s
      },
    }),
  };

  return (
    <div className="flex flex-col">
      <div className="flex justify-center items-center">
        <motion.img
          className="w-1/2 mb-2"
          src="/src/assets/freindly.png"
          alt="Teddy Bear"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      </div>
      <div className="flex items-center justify-center w-full">
        <div className="p-3 bg-top-gray-brown-light rounded-lg shadow-lg">
          <motion.h1
            className="text-4xl mb-8 text-center text-gray-900"
            initial="hidden"
            animate="visible"
            variants={titleVariants}
            custom={0}
          >
            Inscrivez-vous
          </motion.h1>

          <form onSubmit={handleSubmit(onSubmit)}>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={titleVariants}
              custom={1}
            >
              <input
                type="text"
                placeholder="Nom d'utilisateur"
                {...register("username")}
                className={inputClasses}
              />
              {errors.username && (
                <p className="text-red-500 text-sm">
                  {errors.username.message}
                </p>
              )}
            </motion.div>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={titleVariants}
              custom={2}
            >
              <input
                type="email"
                placeholder="Email"
                {...register("email")}
                className={inputClasses}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </motion.div>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={titleVariants}
              custom={3}
            >
              <select
                {...register("role")}
                className={inputClasses}
                defaultValue=""
              >
                <option value="" disabled>
                  Sélectionnez votre rôle
                </option>
                <option value="player">Joueur</option>
                <option value="organizer">Organisateur</option>
              </select>
              {errors.role && (
                <p className="text-red-500 text-sm">{errors.role.message}</p>
              )}
            </motion.div>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={titleVariants}
              custom={4}
            >
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Mot de passe"
                {...register("password")}
                className={inputClasses}
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </motion.div>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={titleVariants}
              custom={5}
            >
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Confirmez le mot de passe"
                {...register("confirmPassword")}
                className={inputClasses}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">
                  {errors.confirmPassword.message}
                </p>
              )}
            </motion.div>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={titleVariants}
              custom={6}
            >
              <label className="flex items-center mb-4">
                <input
                  type="checkbox"
                  checked={showPassword}
                  onChange={() => setShowPassword(!showPassword)} // Bascule l'état
                  className="mr-2"
                />
                Afficher le mot de passe
              </label>
            </motion.div>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={titleVariants}
              custom={7}
            >
              <button type="submit" className={buttonClasses}>
                S'inscrire
              </button>
            </motion.div>
          </form>

          <p className="mt-8 text-center text-gray-600">
            Vous avez déjà un compte ?{" "}
            <a
              href="/"
              className="text-font-dark font-semibold hover:underline"
            >
              Se connecter
            </a>
          </p>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
}

export default Register;
