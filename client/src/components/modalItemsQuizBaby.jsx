import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "./ui/Button";
import { toast, ToastContainer } from 'react-toastify';

const ModalItemsQuizBaby = ({ isOpen, onClose, user }) => {
  const [items, setItems] = useState([]);
  const [userPrices, setUserPrices] = useState({});

  useEffect(() => {
    if (isOpen) {
      const fetchItems = async () => {
        try {
          const response = await axios.get(
            "http://localhost:5555/game-quiz-items-baby/items-quiz-baby"
          );
          setItems(response.data);
        } catch (error) {
          console.error("Error fetching items:", error);
        }
      };
      fetchItems();
    }
  }, [isOpen]);

  const handlePriceChange = (itemName, price) => {
    setUserPrices((prevPrices) => ({
      ...prevPrices,
      [itemName]: price,
    }));
  };

  const handleSubmit = async () => {
    const responses = items.map((item) => ({
      itemName: item.id,
      userPrice: Number(userPrices[item.name]) || 0,
    }));

    const data = {
      userId: user._id,
      responses: responses,
    };

    try {
      await axios.post(
        "http://localhost:5555/game-quiz-items-baby/submit",
        data
      );
      onClose();
    } catch (error) {
      console.error("Error submitting responses:", error);
      toast.error("Erreur lors de la soumission des réponses t'es vraiment nul");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-top-gray-brown-light rounded-lg shadow-lg max-h-screen overflow-y-auto w-[80vw] h-[80vh] relative">
        <button
          className="absolute top-2 right-2 text-gray-700 hover:text-gray-900"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-xl font-bold p-4">Le juste prix</h2>
        <form className="p-5">
          {items?.map((item, index) => (
            <div key={index} className="mb-4">
              <label className="block text-gray-700 mb-1">
                {item.name}
              </label>
              <input
                type="number"
                className="w-full px-3 py-2 border rounded"
                placeholder="Enter price"
                onChange={(e) =>
                  handlePriceChange(item.name, e.target.value)
                }
              />
            </div>
          ))}
          <Button onClick={handleSubmit}>Valider</Button>
          <Button onClick={onClose} variant="secondary">
            Annuler
          </Button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ModalItemsQuizBaby;