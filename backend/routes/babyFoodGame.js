import express from "express";
import BabyFoodGameResponse from "../models/BabyFoodGameResponse.js";
import User from "../models/User.js";

const router = express.Router();

// POST responses for baby food game
router.post("/submit", async (req, res) => {
  const { userId, potResponses } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).send("User not found");

    const newResponse = new BabyFoodGameResponse({ userId, potResponses });
    await newResponse.save();
    res.status(201).send("Responses submitted");
  } catch (error) {
    res.status(500).send("Error submitting responses");
  }
});

const potsFlavors = [
  {
    potId: 1,
    correctFlavors: ["Banane", "Pomme", "Carotte"]
  },
  {
    potId: 2,
    correctFlavors: ["Pêche", "Poire", "Épinard"]
  },
  {
    potId: 3,
    correctFlavors: ["Mangue", "Patate douce", "Brocoli"]
  }
];
// GET all responses for baby food game
router.get("/get-all-responses", async (req, res) => {
  try {
    const responses = await BabyFoodGameResponse.find();
    res.json(responses);
  } catch (error) {
    res.status(500).send("Error retrieving responses");
  }
});


const allFlavors = [
  "Banane",
  "Pomme",
  "Carotte",
  "Pêche",
  "Poire",
  "Épinard",
  "Mangue",
  "Patate douce",
  "Brocoli"
];
router.get("/get-all-flavors", (req, res) => {
  res.json(allFlavors);
});

// GET ranked scores and assign points based on ranking
router.get("/ranked-scores", async (req, res) => {
  try {
    const allResponses = await BabyFoodGameResponse.find();
    const userScores = {};

    // Calculate total score for each user
    allResponses.forEach((response) => {
      const score = calculateScore(response.potResponses); // Assume this function calculates the score
      if (!userScores[response.userId]) {
        userScores[response.userId] = 0;
      }
      userScores[response.userId] += score;
    });

    const userIds = Object.keys(userScores);
    const users = await User.find({ _id: { $in: userIds } });

    // Sort users by score in descending order
    const sortedScores = users
      .map((user) => ({
        userId: user._id,
        username: user.username,
        score: userScores[user._id] || 0,
      }))
      .sort((a, b) => b.score - a.score);

    // Assign ranking points
    const rankedScores = sortedScores.map((user, index) => ({
      ...user,
      rankingPoints: sortedScores.length - index, // Assign points based on ranking
    }));

    res.json(rankedScores);
  } catch (error) {
    res.status(500).send("Error retrieving ranked scores");
  }
});

// Function to calculate score based on potResponses
function calculateScore(potResponses) {
  let score = 0;

  potResponses.forEach((response) => {
    const pot = potsFlavors.find(p => p.potId === response.potId);
    if (pot) {
      response.flavors.forEach((flavor) => {
        if (pot.correctFlavors.includes(flavor)) {
          score += 1; // Increment score for each correct flavor
        }
      });
    }
  });

  return score;
}

export default router;