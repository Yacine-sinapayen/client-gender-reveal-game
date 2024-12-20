import React, { useState, useEffect } from "react";
import Button from "./ui/Button";
import { toast, ToastContainer } from "react-toastify";

import axios from "axios";

function ModalGoutGame({ isOpen, onClose, user }) {
  const [itemsFlavors, setItemsFlavors] = useState([]);
  const [selectedFlavors, setSelectedFlavors] = useState({
    pot1: [],
    pot2: [],
    pot3: [],
  });

  const handleCheckboxChange = (pot, flavor) => {
    setSelectedFlavors((prevState) => {
      const currentFlavors = prevState[pot];
      if (currentFlavors.includes(flavor)) {
        return {
          ...prevState,
          [pot]: currentFlavors.filter((item) => item !== flavor),
        };
      } else if (currentFlavors.length < 4) {
        return {
          ...prevState,
          [pot]: [...currentFlavors, flavor],
        };
      }
      return prevState;
    });
  };

  const handleSubmit = async () => {
    try {
      const potResponses = Object.keys(selectedFlavors).map((pot, index) => ({
        potId: index + 1, // Assuming pot1 corresponds to potId 1, etc.
        selectedItems: selectedFlavors[pot],
        correctItems: [], // Assuming you will fill this with correct items later
      }));

      const response = await axios.post(
        "/baby-food-game/submit",
        { userId: user._id, potResponses }
      );
      onClose();
      toast.success("Réponses soumises avec succès");
    } catch (error) {
      console.error("Error submitting responses:", error);
      toast.error("Erreur lors de la soumission des réponses.");
    }
  };

  useEffect(() => {
    if (isOpen) {
      const fetchItemsFlavors = async () => {
        try {
          const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/baby-food-game/get-all-flavors`
          );
          setItemsFlavors(response.data);
        } catch (error) {
          console.error("Error fetching items:", error);
        }
      };
      fetchItemsFlavors();
    }
  }, [isOpen]);

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-top-gray-brown-light rounded-lg shadow-lg max-h-screen overflow-y-auto w-[80vw] h-[80vh] relative">
        <button
          className="absolute top-2 right-2 text-gray-700 hover:text-gray-900 text-2xl"
          onClick={onClose}
        >
          &times;
        </button>{" "}
        <h2 className="text-xl font-bold p-4">Après l'odorat le goût</h2>
        <form className="p-4">
          {["pot1", "pot2", "pot3"].map((pot, index) => (
            <div key={pot} className="mb-4">
              <h3 className="font-bold">{"Pot " + (index + 1)}</h3>
              {itemsFlavors.map((flavor) => (
                <div key={flavor} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`${pot}-${flavor}`}
                    checked={selectedFlavors[pot].includes(flavor)}
                    onChange={() => handleCheckboxChange(pot, flavor)}
                    disabled={
                      !selectedFlavors[pot].includes(flavor) &&
                      selectedFlavors[pot].length >= 4
                    }
                  />
                  <label htmlFor={`${pot}-${flavor}`} className="ml-2">
                    {flavor}
                  </label>
                </div>
              ))}
            </div>
          ))}
          <Button type="button" onClick={handleSubmit}>
            Valider mes réponses
          </Button>
        </form>
      </div>
    </div>
  );
}

export default ModalGoutGame;
