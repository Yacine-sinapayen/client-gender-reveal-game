import mongoose from "mongoose";

const babyFoodGameResponseSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    potResponses: [
        {
            potId: Number,
            selectedItems: [String],
        }
    ],
    date: {
        type: Date,
        default: Date.now,
    }
});

const BabyFoodGameResponse = mongoose.model("BabyFoodGameResponse", babyFoodGameResponseSchema);

export default BabyFoodGameResponse;