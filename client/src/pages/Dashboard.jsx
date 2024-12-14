import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { GamepadIcon, Trophy } from "lucide-react";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
const Dashboard = () => {
  const user = useSelector((state) => state.auth.user);
  console.log(user);

  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        delay: i * 0.2,
      },
    }),
  };

  const handleButtonClick = async (event) => {
    const isGirl = event.currentTarget.id === "its-a-girl" ? true : false;
    const data = {
      userId: user?._id, // Assuming user object has an id property
      isGirl: isGirl,
    };

    try {
      const response = await fetch(
        "http://localhost:5555/gender-guess-game/submit",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      toast.success("Réponses soumises avec succès");
      console.log("Success:", result);
      const result = await response.json();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-center mb-4 font-bold">
        <h1>Suis-je un garçon ou une fille ? Click sur l'un des deux.</h1>
      </div>
      <div className="flex justify-center items-center h-[20vh] mb-4">
        <button
          id="its-a-boy"
          className="w-1/2 mb-2 h-full"
          onClick={handleButtonClick}
        >
          <motion.img
            className="mb-2"
            src="/src/assets/cmf.png"
            alt="Teddy Bear"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
          />
        </button>
        <button
          id="its-a-girl"
          className="w-1/2 mb-2"
          onClick={handleButtonClick}
        >
          <motion.img
            className="h-full mb-2"
            src="/src/assets/ski.png"
            alt="Teddy Bear"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
          />
        </button>
      </div>
      <div className="flex justify-center items-center">
        <motion.div
          className="bg-top-gray-brown-light rounded-lg shadow-sm p-5 mb-6"
          initial="hidden"
          animate="visible"
          variants={titleVariants}
          custom={1}
        >
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Coucou, {user?.username}!
          </h1>
          <p className="text-gray-600">
            Prêt à découvrir si je suis un petit gars ou une petite fille ?
            Choisissez un jeu et montrez-moi vos talents !
          </p>
        </motion.div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link to="/games">
          <motion.div
            className="bg-top-gray-brown-light rounded-lg shadow-sm p-5 hover:shadow-md transition-shadow"
            initial="hidden"
            animate="visible"
            variants={titleVariants}
            custom={2}
          >
            <div className="flex items-center space-x-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <GamepadIcon className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Jouer aux Jeux
                </h2>
                <p className="text-gray-600">
                  Venez vous amuser et montrez-moi qui est le champion !
                </p>
              </div>
            </div>
          </motion.div>
        </Link>

        <Link to="/leaderboard">
          <motion.div
            className="bg-top-gray-brown-light rounded-lg shadow-sm p-5 hover:shadow-md transition-shadow"
            initial="hidden"
            animate="visible"
            variants={titleVariants}
            custom={3}
          >
            <div className="flex items-center space-x-4">
              <div className="bg-purple-100 p-3 rounded-full">
                <Trophy className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Classement
                </h2>
                <p className="text-gray-600">
                  Voyons qui est en tête et qui a besoin d'un peu plus de
                  pratique !
                </p>
              </div>
            </div>
          </motion.div>
        </Link>
      </div>

      {user?.isOrganizer && (
        <div className="mt-6">
          {/* <Button variant="primary" size="lg">
            Manage Games
          </Button> */}
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default Dashboard;
