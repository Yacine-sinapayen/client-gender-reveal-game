import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5555';

// Créer une nouvelle partie
export const createGame = async (gameData) => {
  try {
    const response = await axios.post(`${API_URL}/games/create`, {
      gameName: gameData.gameName,
      organizerId: gameData.organizerId
    });
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la création de la partie:', error);
    throw error;
  }
};

// Inviter des participants à une partie
export const inviteParticipants = async (gameId, organizerId, participantEmails) => {
  try {
    const response = await axios.post(`${API_URL}/games/${gameId}/invite`, {
      organizerId,
      participantEmails
    });
    return response.data;
  } catch (error) {
    console.error('Erreur lors de l\'invitation des participants:', error);
    throw error;
  }
};

// Démarrer une partie
export const startGame = async (gameId, organizerId) => {
  try {
    const response = await axios.put(`${API_URL}/games/${gameId}/start`, {
      organizerId
    });
    return response.data;
  } catch (error) {
    console.error('Erreur lors du démarrage de la partie:', error);
    throw error;
  }
};

// Mettre en pause une partie
export const pauseGame = async (gameId, organizerId) => {
  try {
    const response = await axios.put(`${API_URL}/games/${gameId}/pause`, {
      organizerId
    });
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la mise en pause de la partie:', error);
    throw error;
  }
};

// Arrêter une partie
export const stopGame = async (gameId, organizerId) => {
  try {
    const response = await axios.put(`${API_URL}/games/${gameId}/stop`, {
      organizerId
    });
    return response.data;
  } catch (error) {
    console.error('Erreur lors de l\'arrêt de la partie:', error);
    throw error;
  }
};

// Obtenir les parties de l'organisateur
export const getOrganizerGames = async (organizerId) => {
  try {
    const response = await axios.get(`${API_URL}/games/my-games/${organizerId}`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des parties:', error);
    throw error;
  }
};

// Obtenir les détails d'une partie
export const getGameDetails = async (gameId) => {
  try {
    const response = await axios.get(`${API_URL}/games/${gameId}`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des détails de la partie:', error);
    throw error;
  }
};
