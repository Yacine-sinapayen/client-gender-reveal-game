import React, { useState } from "react";
import { useSelector } from "react-redux";
import Button from "../components/ui/Button";
import ModalChronoGame from "../components/modalChronoGame";
import ModalItemsQuizBaby from "../components/modalItemsQuizBaby";
import ModalGoutGame from "../components/modalGoutGame";
const Games = () => {
  const user = useSelector((state) => state.auth.user);
  // A terme les jeux seront dynamiques et alimenter par le back. l'organisateur de la genderReveal sera en charge de les ajouter. pourra créer ces propre jeu et quiz.
  const games = [
    {
      id: 1,
      title: "Le juste prix",
      description:
        "Il reste encore des choses à acheter à maman et papa, mais ils ne connaissent pas tous les prix des articles. Aide-le à trouver le juste prix pour chaque article.",
    },
    {
      id: 2,
      title: "Qui a du caca kaki collé au cucul",
      description: "Combien de temps tu as mis pour changer la couche ?",
    },
    { id: 3, title: "Après l'odorat le goût", description: "Découvrez parmi les aliments qu'on te propose, lesquels sont dans les pots." },
  ];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTimerModalOpen, setIsTimerModalOpen] = useState(false);
  const [isGoutModalOpen, setIsGoutModalOpen] = useState(false);

  const handlePlayClick = (gameId) => {
    if (gameId === 1) {
      setIsModalOpen(true);
    } else if (gameId === 2) {
      setIsTimerModalOpen(true);
    } else if (gameId === 3) {
      setIsGoutModalOpen(true);
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {games.map((game) => (
          <div
            key={game.id}
            className="bg-top-gray-brown-light rounded-lg shadow-sm p-5 hover:shadow-md transition-shadow"
          >
            <h2 className="text-xl font-semibold text-gray-900">
              {game.title}
            </h2>
            <p className="text-gray-600">{game.description}</p>
            <Button onClick={() => handlePlayClick(game.id)}>
              {game.buttonName ?? "Jouer"}
            </Button>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <ModalItemsQuizBaby
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          user={user}
        />
      )}

      {isTimerModalOpen && (
        <ModalChronoGame
          isOpen={isTimerModalOpen}
          onClose={() => setIsTimerModalOpen(false)}
          user={user}
        />
      )}

      {isGoutModalOpen && (
        <ModalGoutGame
          isOpen={isGoutModalOpen}
          onClose={() => setIsGoutModalOpen(false)}
          user={user}
        />
      )}
    </div>
  );
};

export default Games;
