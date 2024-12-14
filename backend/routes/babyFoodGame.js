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


export default router;