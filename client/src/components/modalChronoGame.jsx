import React, { useState, useEffect } from 'react';
import Button from './ui/Button';
import { FaTimes } from 'react-icons/fa';
import { useSelector } from 'react-redux';
function ModalChronoGame({ isOpen, onClose }) {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isStopped, setIsStopped] = useState(false);
 const user = useSelector((state) => state.auth.user);

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
      const response = await fetch('http://localhost:5555/diaper-change-game/submit-time', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, timeTaken }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la soumission du temps');
      }

      const data = await response.json();
      console.log('Temps soumis avec succès:', data);
    } catch (error) {
      console.error('Erreur:', error);
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
        <Button onClick={handleStop} variant="secondary">
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