import React, { useState, useEffect } from 'react';
import Button from './ui/Button';
import { FaTimes } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';

function ModalChronoGame({ isOpen, onClose, user }) {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isStopped, setIsStopped] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsRunning(true);
    }
  }, [isOpen]);

  const handleStop = () => {
    setIsRunning(false);
    setIsStopped(true);
  };

  useEffect(() => {
    let timer;
    if (isOpen && isRunning) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }

    return () => {
      clearInterval(timer);
    };
  }, [isOpen, isRunning]);

  const handleSubmitTime = async () => {
    const userId = user._id;
    const timeTaken = time;

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/diaper-change-game/submit-time`, {
        userId,
        timeTaken,
      });

      onClose();
      toast.success('Temps soumis avec succès');
    } catch (error) {
      console.error('Erreur:', error);
      toast.error('Erreur lors de la soumission du temps');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center w-full h-full">
      <div className="bg-white rounded-lg shadow-lg p-5">
        <button onClick={onClose}>
          <FaTimes />
        </button>
        <h2 className="text-xl font-bold">Chronomètre</h2>
        <p>Temps écoulé: {time} secondes</p>
        <Button onClick={handleStop}>
          Arrêter le chrono
        </Button>
        {isStopped && (
          <Button onClick={handleSubmitTime}>
            Envoyer le temps
          </Button>
        )}
      </div>
    </div>
  );
}

export default ModalChronoGame;