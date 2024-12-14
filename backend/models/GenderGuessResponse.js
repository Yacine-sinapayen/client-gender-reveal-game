import mongoose from "mongoose";

const genderGuessResponseSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    isGirl: {
        type: Boolean,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    }
});

const GenderGuessResponse = mongoose.model("GenderGuessResponse", genderGuessResponseSchema);

export default GenderGuessResponse;