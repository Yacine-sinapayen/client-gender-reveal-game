import React, { useEffect, useState } from 'react';

function Leaderboard() {
  const [scores, setScores] = useState([]);
  const [otherData, setOtherData] = useState([]);
  const [babyFoodScores, setBabyFoodScores] = useState([]);
  const [combinedScores, setCombinedScores] = useState([]);

  useEffect(() => {
    async function fetchScores() {
      try {
        const response = await fetch('http://localhost:5555/game-quiz-items-baby/ranked-scores');
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
        const response = await fetch('http://localhost:5555/baby-food-game/ranked-scores');
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
        const response = await fetch('http://localhost:5555/diaper-change-game/ranked-scores');
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

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Qui est le meilleur ?</h1>
      
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
    </div>
  );
}

export default Leaderboard;