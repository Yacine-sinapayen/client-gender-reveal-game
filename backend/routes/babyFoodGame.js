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

// DELETE all responses for baby food game
router.delete("/delete-all-responses", async (req, res) => {
  try {
    await BabyFoodGameResponse.deleteMany({});
    res.status(200).send("All responses deleted");
  } catch (error) {
    res.status(500).send("Error deleting responses");
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

// Function to calculate score based on correct answers
function calculateScore(selectedItems, correctFlavors) {
  const correctCount = selectedItems.filter(item => correctFlavors.includes(item)).length;
  switch (correctCount) {
    case 1:
      return 1;
    case 2:
      return 3;
    case 3:
      return 5;
    case 4:
      return 6;
    default:
      return 0;
  }
}

// GET user scores for baby food game
router.get("/ranked-scores", async (req, res) => {
  try {
    const responses = await BabyFoodGameResponse.find();
    const scores = await Promise.all(responses.map(async response => {
      let totalScore = 0;
      response.potResponses.forEach(potResponse => {
        const pot = potsFlavors.find(p => p.potId === potResponse.potId);
        if (pot) {
          totalScore += calculateScore(potResponse.selectedItems, pot.correctFlavors);
        }
      });

      // Fetch the username from the User model
      const user = await User.findById(response.userId);
      const username = user ? user.username : "Unknown";

      // Calculate ranking points (example logic)
      const rankingPoints = totalScore * 10; // Adjust this logic as needed

      return {
        userId: response.userId,
        username: username,
        score: totalScore,
        rankingPoints: rankingPoints
      };
    }));
    res.json(scores);
  } catch (error) {
    res.status(500).send("Error calculating scores");
  }
});

export default router;