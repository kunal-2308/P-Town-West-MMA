import mongoose from "mongoose";

const classSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    date: { type: Date, required: true },
    timeIn: { type: String, required: true },
    timeOut: { type: String, required: true },
    slots: { type: Number, required: true },
    bookedSlots: { type: Number, default: 0 },
    instructor: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    isFull: { type: Boolean, default: false },
    applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Class", classSchema);
