import React from "react";
import { useState } from "react";
import axios from "axios";

const Games = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [items, setItems] = useState([]);
  console.log(items);

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
    { id: 3, title: "Jeu 3", description: "Description du Jeu 3" },
  ];

  const handlePlayClick = async (gameId) => {
    if (gameId === 1) {
      try {
        const response = await axios.get(
          "http://localhost:5555/game-quiz-items-baby/items-quiz"
        );
        setItems(response.data); // Assuming response.data is an array of items
        setIsModalOpen(true);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
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
            <button
              className="mt-4 bg-top-gray-brown-dark text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors w-full"
              onClick={() => handlePlayClick(game.id)}
            >
              Jouer
            </button>
          </div>
        ))}
      </div>

      {/* {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-xl font-bold mb-4">Le juste prix</h2>
            <form>
              {items?.map((item, index) => (
                <div key={index} className="mb-4">
                  <label className="block text-gray-700">{item.name}</label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border rounded"
                    placeholder="Enter price"
                  />
                </div>
              ))}
              <button
                type="button"
                className="bg-blue-600 text-white py-2 px-4 rounded"
                onClick={() => setIsModalOpen(false)}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default Games;
