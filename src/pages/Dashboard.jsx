import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
// import { Users, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import { useState } from "react";
import Button from "../components/ui/Button";
import Title from "../components/ui/Title";
import Card from "../components/ui/Card";
import {
  ConfirmLaunchModal,
  ConfirmPauseModal,
  ConfirmStopModal,
  CreateGameModal,
} from "../components/modals";
import { createGame, inviteParticipants } from "../services/gameService";

const Dashboard = () => {
  const user = useSelector((state) => state.auth.user);
  const [isLaunchModalOpen, setIsLaunchModalOpen] = useState(false);
  const [isPauseModalOpen, setIsPauseModalOpen] = useState(false);
  const [isStopModalOpen, setIsStopModalOpen] = useState(false);
  const [isCreateGameModalOpen, setIsCreateGameModalOpen] = useState(false);
  
  // États de la partie pour gérer les boutons conditionnels
  const [gameState, setGameState] = useState({
    isCreated: false,
    isLaunched: false,
    isPaused: false,
    participants: 0,
    maxParticipants: 10
  });
  
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
        `${import.meta.env.VITE_API_URL}/gender-guess-game/submit`,
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

  const handleLaunchClick = () => {
    setIsLaunchModalOpen(true);
  };

  const handleLaunchConfirm = () => {
    // TODO: Implémenter la logique de lancement de partie
    console.log("Partie lancée !");
    setGameState(prev => ({ ...prev, isLaunched: true, isPaused: false }));
    toast.success("Partie lancée avec succès !");
    setIsLaunchModalOpen(false);
  };

  const handleLaunchCancel = () => {
    setIsLaunchModalOpen(false);
  };

  const handlePauseClick = () => {
    setIsPauseModalOpen(true);
  };

  const handlePauseConfirm = () => {
    // TODO: Implémenter la logique de pause de partie
    console.log("Partie mise en pause !");
    setGameState(prev => ({ ...prev, isPaused: true, isLaunched: false }));
    toast.success("Partie mise en pause !");
    setIsPauseModalOpen(false);
  };

  const handlePauseCancel = () => {
    setIsPauseModalOpen(false);
  };

  const handleStopClick = () => {
    setIsStopModalOpen(true);
  };

  const handleStopConfirm = () => {
    // TODO: Implémenter la logique d'arrêt de partie
    console.log("Partie arrêtée !");
    setGameState(prev => ({ ...prev, isLaunched: false, isPaused: false, isCreated: false, participants: 0 }));
    toast.success("Partie arrêtée !");
    setIsStopModalOpen(false);
  };

  const handleStopCancel = () => {
    setIsStopModalOpen(false);
  };

  const handleCreateGame = async (gameData) => {
    try {
      // Créer la partie
      const gameResponse = await createGame({
        gameName: gameData.gameName,
        organizerId: user._id
      });

      // Si des participants sont invités, les inviter
      if (gameData.participantEmails.length > 0) {
        await inviteParticipants(
          gameResponse.game.id,
          user._id,
          gameData.participantEmails
        );
      }

      // Mettre à jour l'état local
      setGameState(prev => ({
        ...prev,
        isCreated: true,
        participants: gameData.participantEmails.length,
        gameId: gameResponse.game.id
      }));

      toast.success(`Partie "${gameData.gameName}" créée avec succès !`);
      console.log('Partie créée:', gameResponse);
    } catch (error) {
      console.error('Erreur lors de la création de la partie:', error);
      throw error; // Re-throw pour que la modal puisse gérer l'erreur
    }
  };

  return (
    <div className="flex items-center justify-center w-full relative">
      {user?.role === "organizer" ? (
        <motion.div
          className="w-full max-w-6xl mx-auto px-4"
          initial="hidden"
          animate="visible"
          variants={titleVariants}
          custom={0}
          transition={{ delay: 1.2 }}
        >
          <div className="text-center mb-6">
            <div className="flex items-center justify-center mb-2">
                <Title
                  level={1}
                  className="text-3xl font-bold text-marron-chaud"
                >
                  Espace Organisateur
                </Title>
            </div>       
            {/* Indicateur d'état de la partie */}
            <div className="mb-4">
              {gameState.isCreated && (
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  {gameState.isLaunched ? "Partie en cours" : gameState.isPaused ? "Partie en pause" : "Partie créée"}
                </div>
              )}
            </div>
            
            <p className="text-gray-600 mb-2">
              Bienvenue{" "}
              <span className="font-semibold text-marron-chaud">
                {user?.username}
              </span>{" "}
              ! Prêt à organiser des parties de folie ? 🎉
            </p>
            
            {/* Compteur de participants */}
            {gameState.isCreated && (
              <p className="text-sm text-gray-500">
                {gameState.participants} / {gameState.maxParticipants} participants
              </p>
            )}
          </div>

          {/* Grille des actions - 2 colonnes pour les boutons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Créer une partie */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={titleVariants}
              custom={1}
            >
              <Card className="h-full flex flex-col">
                <div className="text-center mb-4">
                  <p className="text-sm text-gray-600 mb-4">
                    Créez une partie et invitez vos boomers préférés ! Qui va
                    être le plus nul cette fois ? 😄
                  </p>
                </div>
                <Button
                  size="lg"
                  onClick={() => setIsCreateGameModalOpen(true)}
                  disabled={gameState.isCreated}
                  className={`w-full ${
                    gameState.isCreated 
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed" 
                      : "bg-blue-500 hover:bg-blue-600 text-white"
                  }`}
                >
                  {gameState.isCreated ? "✅ Partie créée" : "➕ Créer ma partie"}
                </Button>
              </Card>
            </motion.div>

            {/* Boutons de gestion de partie */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={titleVariants}
              custom={2}
              className="mb-2"
            >
              <Button
                size="lg"
                onClick={handleLaunchClick}
                disabled={!gameState.isCreated || gameState.isLaunched}
                className={`w-full ${
                  !gameState.isCreated || gameState.isLaunched
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-green-500 hover:bg-green-600 text-white"
                }`}
              >
                {gameState.isLaunched ? "✅ Partie lancée" : "▶️ Lancer la partie"}
              </Button>
            </motion.div>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={titleVariants}
              custom={3}
              className="mb-2"
            >
              <Button
                size="lg"
                onClick={handlePauseClick}
                disabled={!gameState.isLaunched || gameState.isPaused}
                className={`w-full ${
                  !gameState.isLaunched || gameState.isPaused
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-yellow-500 hover:bg-yellow-600 text-white"
                }`}
              >
                {gameState.isPaused ? "⏸️ En pause" : "⏸️ Pause café ☕"}
              </Button>
            </motion.div>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={titleVariants}
              custom={4}
              className="mb-2"
            >
              <Button
                size="lg"
                onClick={handleStopClick}
                disabled={!gameState.isCreated}
                className={`w-full ${
                  !gameState.isCreated
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-red-500 hover:bg-red-600 text-white"
                }`}
              >
                ⏹️ Game Over !
              </Button>
            </motion.div>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={titleVariants}
              custom={5}
              className="mb-2"
            >
              <Button
                size="lg"
                onClick={() => {
                  // TODO: Ouvrir classement des parties
                  console.log("Voir le classement");
                }}
                disabled={!gameState.isCreated}
                className={`w-full ${
                  !gameState.isCreated
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white"
                }`}
              >
                🏆 Voir les scores
              </Button>
            </motion.div>
          </div>
        </motion.div>
      ) : (
        <motion.div
          className="w-full max-w-7xl mx-auto px-4"
          initial="hidden"
          animate="visible"
          variants={titleVariants}
          custom={0}
          transition={{ delay: 1.2 }}
        >
          <div className="text-center mb-6">
            <Title
              level={1}
              className="text-2xl font-bold text-marron-chaud mb-2"
            >
              🧸 Espace Joueur
            </Title>
            <p className="text-sm text-gray-600">
              Coucou{" "}
              <span className="font-semibold text-marron-chaud">
                {user?.username}
              </span>{" "}
              ! Prêt à jouer et montrer tes talents ? 🎯
            </p>
          </div>

          {/* Grille des actions - 3 colonnes pour tout voir */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Vote Fille/Garçon */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={titleVariants}
              custom={1}
            >
              <Card className="h-full flex flex-col">
                <div className="text-center mb-3">
                  <div className="text-3xl mb-1">🤔</div>
                  <p className="text-xs text-gray-600 mb-3">
                    Allez, fais ton choix ! Fille ou garçon ? Montre-moi ton
                    instinct ! 🎯
                  </p>
      </div>
                <div className="flex gap-2">
        <button
          id="its-a-boy"
                    className="flex-1 h-16"
          onClick={handleButtonClick}
        >
          <motion.img
                      className="w-full h-full object-contain"
            src="/src/assets/cmf.png"
                      alt="Garçon"
                      animate={{ y: [0, -8, 0] }}
                      transition={{
                        duration: 2,
                        ease: "easeInOut",
                        repeat: Infinity,
                      }}
          />
        </button>
        <button
          id="its-a-girl"
                    className="flex-1 h-16"
          onClick={handleButtonClick}
        >
          <motion.img
                      className="w-full h-full object-contain"
            src="/src/assets/ski.png"
                      alt="Fille"
                      animate={{ y: [0, -8, 0] }}
                      transition={{
                        duration: 2,
                        ease: "easeInOut",
                        repeat: Infinity,
                      }}
          />
        </button>
      </div>
              </Card>
        </motion.div>

            {/* Jouer aux jeux */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={titleVariants}
            custom={2}
          >
              <Card className="h-full flex flex-col">
                <div className="text-center mb-3">
                  <p className="text-xs text-gray-600 mb-3">
                    C&apos;est parti pour l&apos;aventure ! Montre-moi qui est
                    le champion ! 🏆
                </p>
              </div>
                <Link to="/games" className="flex-1">
                  <Button
                    size="md"
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-700 hover:from-indigo-700 hover:to-purple-800 text-white font-semibold shadow-lg"
                  >
                    🧸 C&apos;est parti !
                  </Button>
                </Link>
              </Card>
          </motion.div>

            {/* Voir le classement */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={titleVariants}
            custom={3}
          >
              <Card className="h-full flex flex-col">
                <div className="text-center mb-3">
                  <p className="text-xs text-gray-600 mb-3">
                    Qui est en tête ? Qui est nul à chier ? Découvre le palmarès
                    ! 🥇
                </p>
              </div>
                <Link to="/leaderboard" className="flex-1">
                  <Button size="md" className="w-full">
                    🏆 Voir les scores
                  </Button>
                </Link>
              </Card>
            </motion.div>
            </div>
          </motion.div>
      )}

      {/* Modales de confirmation */}
      <ConfirmLaunchModal
        isOpen={isLaunchModalOpen}
        onClose={handleLaunchCancel}
        onConfirm={handleLaunchConfirm}
      />

      <ConfirmPauseModal
        isOpen={isPauseModalOpen}
        onClose={handlePauseCancel}
        onConfirm={handlePauseConfirm}
      />

      <ConfirmStopModal
        isOpen={isStopModalOpen}
        onClose={handleStopCancel}
        onConfirm={handleStopConfirm}
      />

      <CreateGameModal
        isOpen={isCreateGameModalOpen}
        onClose={() => setIsCreateGameModalOpen(false)}
        onCreateGame={handleCreateGame}
      />

      <ToastContainer />
    </div>
  );
};

export default Dashboard;
