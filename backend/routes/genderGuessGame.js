import express from "express";
import GenderGuessResponse from "../models/GenderGuessResponse.js";
import User from "../models/User.js";

const router = express.Router();

// POST response for gender guess game
router.post("/submit", async (req, res) => {
  const { userId, isGirl } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).send("User not found");

    const newResponse = new GenderGuessResponse({ userId, isGirl });
    await newResponse.save();
    res.status(201).send("Response submitted");
  } catch (error) {
    res.status(500).send("Error submitting response");
  }
});

// GET all responses for gender guess game
router.get("/responses", async (req, res) => {
  try {
    const responses = await GenderGuessResponse.aggregate([
      {
        $sort: { createdAt: -1 }
      },
      {
        $group: {
          _id: "$userId",
          mostRecentResponse: { $first: "$$ROOT" }
        }
      },
      {
        $replaceRoot: { newRoot: "$mostRecentResponse" }
      },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "userDetails"
        }
      },
      {
        $unwind: "$userDetails"
      },
      {
        $project: {
          userId: 1,
          isGirl: 1,
          createdAt: 1,
          username: "$userDetails.username"
        }
      }
    ]);
    res.status(200).json(responses);
  } catch (error) {
    res.status(500).send("Error retrieving responses");
  }
});

export default router;