import mongoose from "mongoose";

const diaperChangeResponseSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    timeTaken: {
        type: Number, // Time in seconds
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    }
});

const DiaperChangeResponse = mongoose.model("DiaperChangeResponse", diaperChangeResponseSchema);

export default DiaperChangeResponse;