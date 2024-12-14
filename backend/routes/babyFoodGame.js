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

export default router;