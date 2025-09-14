import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

function Leaderboard() {
  const [scores, setScores] = useState([]);
  const [otherData, setOtherData] = useState([]);
  const [babyFoodScores, setBabyFoodScores] = useState([]);
  const [combinedScores, setCombinedScores] = useState([]);
  const [genderGuessResponses, setGenderGuessResponses] = useState([]);
  console.log(genderGuessResponses);

  useEffect(() => {
    async function fetchGenderGuessResponses() {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/gender-guess-game/responses`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setGenderGuessResponses(data);
      } catch (error) {
        console.error('Error fetching gender guess responses:', error);
      }
    }
    fetchGenderGuessResponses();
  }, []);

  useEffect(() => {
    async function fetchScores() {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/game-quiz-items-baby/ranked-scores`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setScores(data);
      } catch (error) {
        console.error('Error fetching scores:', error);
      }
    }

    fetchScores();
  }, []);

  useEffect(() => {
    async function fetchScores() {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/baby-food-game/ranked-scores`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setBabyFoodScores(data);
      } catch (error) {
        console.error('Error fetching scores:', error);
      }
    }

    fetchScores();
  }, []);

  useEffect(() => {
    async function fetchOtherData() {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/diaper-change-game/ranked-scores`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setOtherData(data);
      } catch (error) {
        console.error('Error fetching other data:', error);
      }
    }

    fetchOtherData();
  }, []);

  useEffect(() => {
    // Combine scores from both datasets
    const combined = [...scores, ...otherData, ...babyFoodScores].reduce((acc, curr) => {
      const existingUser = acc.find(user => user.username === curr.username);
      if (existingUser) {
        existingUser.score += curr.score;
      } else {
        acc.push({ username: curr.username, score: curr.score });
      }
      return acc;
    }, []);

    setCombinedScores(combined);
  }, [scores, otherData, babyFoodScores]);

  const tableVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: (i) => ({
      opacity: 1, 
      x: 0,
      transition: { 
        duration: 0.6, 
        ease: "easeOut",
        delay: i * 0.2
      }
    })
  };

  // Function to get username from userId
  const getUsernameFromUserId = (userId) => {
    // This function should return the username based on the userId
    // For example, it could be a lookup from a pre-fetched list of users
    return "Username"; // Placeholder
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Qui est le meilleur ?</h1>
      
      <motion.div
        initial="hidden"
        animate="visible"
        variants={tableVariants}
        custom={1}
      >
      <h2 className="text-xl font-semibold mb-2">Quiz</h2>
        <table className="min-w-full bg-top-gray-brown-light border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Classement</th>
              <th className="py-2 px-4 border-b">Nom d'utilisateur</th>
              <th className="py-2 px-4 border-b">Score</th>
            </tr>
          </thead>
          <tbody>
            {scores.map((score, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b">{index + 1}</td>
                <td className="py-2 px-4 border-b">{score.username}</td>
                <td className="py-2 px-4 border-b">{score.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={tableVariants}
        custom={2}
      >
      <h2 className="text-xl font-semibold mt-6 mb-2">Diaper Change</h2>
        <table className="min-w-full bg-top-gray-brown-light border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Classement</th>
              <th className="py-2 px-4 border-b">Nom d'utilisateur</th>
              <th className="py-2 px-4 border-b">Score</th>
            </tr>
          </thead>
          <tbody>
            {otherData.map((otherData, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b">{index + 1}</td>
                <td className="py-2 px-4 border-b">{otherData.username}</td>
                <td className="py-2 px-4 border-b">{otherData.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={tableVariants}
        custom={3}
      >
      <h2 className="text-xl font-semibold mt-6 mb-2">Baby Food</h2>
        <table className="min-w-full bg-top-gray-brown-light border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Classement</th>
              <th className="py-2 px-4 border-b">Nom d'utilisateur</th>
              <th className="py-2 px-4 border-b">Score</th>
            </tr>
          </thead>
          <tbody>
            {babyFoodScores.map((babyFoodScores, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b">{index + 1}</td>
                <td className="py-2 px-4 border-b">{babyFoodScores.username}</td>
                <td className="py-2 px-4 border-b">{babyFoodScores.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>

    <motion.div
        initial="hidden"
        animate="visible"
        variants={tableVariants}
        custom={4}
      >     
      <h2 className="text-xl font-semibold mt-6 mb-2">Classement Général</h2>
      <table className="min-w-full bg-top-gray-brown-light border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Classement</th>
            <th className="py-2 px-4 border-b">Nom d'utilisateur</th>
            <th className="py-2 px-4 border-b">Score Total</th>
          </tr>
        </thead>
        <tbody>
          {combinedScores.map((user, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="py-2 px-4 border-b">{index + 1}</td>
              <td className="py-2 px-4 border-b">{user.username}</td>
              <td className="py-2 px-4 border-b">{user.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>

    <motion.div
        initial="hidden"
        animate="visible"
        variants={tableVariants}
        custom={5}
      >
        <h2 className="text-xl font-semibold mt-6 mb-2">Gender Guess Responses</h2>
        <table className="min-w-full bg-top-gray-brown-light border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Nom d'utilisateur</th>
              <th className="py-2 px-4 border-b">Genre</th>
            </tr>
          </thead>
          <tbody>
            {genderGuessResponses.map((response, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b">{response.username}</td>
                <td className="py-2 px-4 border-b">
                  {response.isGirl ? (
                    "Fille"
                  ) : (
                    "Garçon"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
}

export default Leaderboard;