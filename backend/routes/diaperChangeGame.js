import express from "express";
import DiaperChangeResponse from "../models/DiaperChangeGameResponse.js";
import User from "../models/User.js";

const router = express.Router();

// POST time taken to change diaper
router.post("/submit-time", async (req, res) => {
  const { userId, timeTaken } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).send("User not found");

    const newResponse = new DiaperChangeResponse({ userId, timeTaken });
    await newResponse.save();
    res.status(201).send("Time submitted");
  } catch (error) {
    res.status(500).send("Error submitting time");
  }
});

// GET all times for a user
router.get("/diaper-game-get-times/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const times = await DiaperChangeResponse.find({ userId });
    if (!times.length) return res.status(404).send("No times found");

    res.json(times);
  } catch (error) {
    res.status(500).send("Error retrieving times");
  }
});

// GET all times for all users
router.get("/diaper-game-get-all-users-times", async (req, res) => {
  try {
    const times = await DiaperChangeResponse.find();
    res.json(times);
  } catch (error) {
    res.status(500).send("Error retrieving times");
  }
});

// GET ranked scores and assign points based on ranking
router.get("/ranked-scores", async (req, res) => {
  try {
    const allResponses = await DiaperChangeResponse.find();
    const userScores = {};

    // Calculate total score for each user
    allResponses.forEach((response) => {
      const score = response.timeTaken; // Assuming lower time is better
      if (!userScores[response.userId]) {
        userScores[response.userId] = 0;
      }
      userScores[response.userId] += score;
    });

    const userIds = Object.keys(userScores);
    const users = await User.find({ _id: { $in: userIds } });

    // Sort users by score in ascending order (lower time is better)
    const sortedScores = users
      .map((user) => ({
        userId: user._id,
        username: user.username,
        score: userScores[user._id] || 0,
      }))
      .sort((a, b) => a.score - b.score);

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

export default router;