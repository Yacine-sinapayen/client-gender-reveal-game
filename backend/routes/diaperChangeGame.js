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

export default router;