import authRoutes from "./routes/auth.js";
import gameQuizItemsBabyRoutes from "./routes/gameQuizItemsBaby.js";
import diaperChangeGameRoutes from "./routes/diaperChangeGame.js"; // Import the new route
import babyFoodGameRoutes from "./routes/babyFoodGame.js"; // Import the new route
import genderGuessGameRoutes from "./routes/genderGuessGame.js"; // Import the new route
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// Allow us to use .env file
dotenv.config();
const app = express();
const MONGODB_URL = process.env.MONGODB_URI;
const PORT = process.env.PORT;

// Middleware for parsing request body
app.use(express.json());

// option 1 Allow all origins with default of cors(*)
app.use(cors({
  origin: 'http://localhost:5173' // Autoriser cette origine spécifique
}));

// Routes
app.use("/auth", authRoutes);
app.use("/game-quiz-items-baby", gameQuizItemsBabyRoutes);
app.use("/diaper-change-game", diaperChangeGameRoutes); // Add the new route
app.use("/baby-food-game", babyFoodGameRoutes); // Add the new route
app.use("/gender-guess-game", genderGuessGameRoutes); // Add the new route

mongoose
  .connect(MONGODB_URL)
  .then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => {
      console.log(`App is listening on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });