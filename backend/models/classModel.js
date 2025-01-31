import mongoose from "mongoose";

const classSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    title: { type: String, required: true },
    type: { type: String, required: true },
    instructor: { type: String, required: true },
    startTime: { type: String, required: true },
    duration: { type: Number, required: true },
    capacity: { type: Number, required: true },
    description: { type: String, required: true },
    difficulty: { type: String, enum: ["Beginner", "Intermediate", "Advanced"], required: true },
    recurringDays: { type: [String], enum: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"] },
    isRecurring: { type: Boolean, default: false },
    recurrenceWeeks: { type: Number, default: 1 },
    color: { type: String, default: "#1976d2" },
    // currentBookings: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Class", classSchema);
