import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "./ui/Button";
import { toast } from "react-toastify";
import { motion } from 'framer-motion';

const ModalItemsQuizBaby = ({ isOpen, onClose, user }) => {
  const [items, setItems] = useState([]);
  console.log(items);
  const [userPrices, setUserPrices] = useState({});

  useEffect(() => {
    if (isOpen) {
      const fetchItems = async () => {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/game-quiz-items-baby/items-quiz-baby`
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
        `${import.meta.env.VITE_API_URL}/game-quiz-items-baby/submit`,
        data
      );
      onClose();
      toast.success("Réponses soumises avec succès");
    } catch (error) {
      console.error("Error submitting responses:", error);
      toast.error(
        "Erreur lors de la soumission des réponses t'es vraiment nul"
      );
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-top-gray-brown-light rounded-lg shadow-lg max-h-screen overflow-y-auto w-[80vw] h-[80vh] relative">
        <button
          className="absolute top-2 right-2 text-gray-700 hover:text-gray-900 text-2xl"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-xl font-bold p-4">Le juste prix</h2>
        <form className="p-5">
          {items?.map((item, index) => (
            <div key={index} className="mb-4">
              <label className="block text-gray-700 mb-1">{item.name}</label>
              <motion.img
                className="mb-2 h-full"
                src={`/src/assets/${item.urlImg}`}
                alt="Teddy Bear"
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
              <input
                type="number"
                className="w-full px-3 py-2 border rounded"
                placeholder="Enter price"
                onChange={(e) => handlePriceChange(item.name, e.target.value)}
              />
            </div>
          ))}
          <Button onClick={handleSubmit}>Valider</Button>
          <Button onClick={onClose} variant="secondary">
            Annuler
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ModalItemsQuizBaby;
