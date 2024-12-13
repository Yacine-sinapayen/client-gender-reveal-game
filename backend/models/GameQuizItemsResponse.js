import mongoose from "mongoose";

const gameResponseSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    itemName: {
        type: String,
        required: true,
    },
    userPrice: {
        type: Number,
        required: true,
    },
    actualPrice: {
        type: Number,
        required: true,
    }
});

const GameResponse = mongoose.model("GameResponse", gameResponseSchema);

export default GameResponse;