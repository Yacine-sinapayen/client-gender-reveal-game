import express from "express";
import GameResponse from "../models/GameQuizItemsResponse.js";
import User from "../models/User.js";

const router = express.Router();

// POST responses
router.post("/submit", async (req, res) => {
  const { userId, responses } = req.body; // responses is an array of { itemName, userPrice }

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).send("User not found");

    const gameResponses = responses.map((response) => ({
      userId,
      itemName: response.itemName,
      userPrice: response.userPrice,
      actualPrice: getActualPrice(response.itemName), // Assume this function returns the actual price
    }));
    console.log("gameResponses", gameResponses);

    await GameResponse.insertMany(gameResponses);
    res.status(201).send("Responses submitted");
  } catch (error) {
    res.status(500).send("Error submitting responses");
  }
});

// GET score
router.get("/get-score/:userId", async (req, res) => {
  const { userId } = req.params;
  console.log("userId", userId);

  try {
    const responses = await GameResponse.find({ userId });
    console.log("responses", responses);
    if (!responses.length) return res.status(404).send("No responses found");

    const score = responses.reduce((total, response) => {
      const difference = Math.abs(response.userPrice - response.actualPrice);
      return total + (100 - difference); // Example scoring logic
    }, 0);
    console.log("score", score);

    res.json({ score });
  } catch (error) {
    res.status(500).send("Error calculating score");
  }
});

// Delete all responses for a user
router.delete("/delete-responses/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const result = await GameResponse.deleteMany({ userId });
    if (result.deletedCount === 0) {
      return res.status(404).send("No responses found to delete");
    }
    res.status(200).send("All responses deleted");
  } catch (error) {
    res.status(500).send("Error deleting responses");
  }
});

// GET all users scores
router.get("/get-all-users-scores-quiz-baby", async (req, res) => {
  try {
    const allResponses = await GameResponse.find();
    const userScores = {};

    allResponses.forEach((response) => {
      const difference = Math.abs(response.userPrice - response.actualPrice);
      const score = 100 - difference;

      if (!userScores[response.userId]) {
        userScores[response.userId] = 0;
      }
      userScores[response.userId] += score;
    });

    const userIds = Object.keys(userScores);
    const users = await User.find({ _id: { $in: userIds } });

    const sortedScores = users
      .map((user) => {
        return {
          userId: user._id,
          username: user.username, // Assurez-vous que le modèle User a un champ 'username'
          score: userScores[user._id] || 0,
        };
      })
      .sort((a, b) => b.score - a.score);

    res.json(sortedScores);
  } catch (error) {
    res.status(500).send("Error retrieving scores");
  }
});

// GET check if user has already responded
router.get("/has-already-responded/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const responseExists = await GameResponse.exists({ userId });
    if (responseExists) {
      return res.status(200).send("User has responded");
    } else {
      return res.status(404).send("User has not responded");
    }
  } catch (error) {
    res.status(500).send("Error checking user responses");
  }
});

// GET ranked scores and assign points based on ranking
router.get("/ranked-scores", async (req, res) => {
  try {
    const allResponses = await GameResponse.find();
    const userScores = {};

    // Calculate total score for each user
    allResponses.forEach((response) => {
      const difference = Math.abs(response.userPrice - response.actualPrice);
      const score = 100 - difference;

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

const prices = {
  poussette: 300,
  chaise_haute: 100,
  lit_bébé: 200,
  table_à_langer: 150,
  biberons: 20,
  trotteur: 70,
  porte_bébé: 100,
  bain_bébé: 30,
  mobile_pour_lit: 40,
  siège_auto: 250,
  linge_de_bébé: 30,
  parc_bébé: 150,
  couches_pampers_pack: 50,
  pyjama_bébé: 15,
  "jouets_d'éveil": 40,
};

// GET prices
router.get("/items-quiz-baby", (req, res) => {
  const priceArray = Object.keys(prices).map((itemId) => ({
    id: itemId,
    name: itemId
      .replace(/_/g, " ")
      .replace(/^\w/, (c) => c.toUpperCase()), 
     urlImg : itemId + ".png", 
  }));

  res.json(priceArray);
});

function getActualPrice(itemName) {
  // This function should return the actual price of the item
  // You can hardcode the prices or fetch them from a database
  return prices[itemName] || 0;
}

export default router;
