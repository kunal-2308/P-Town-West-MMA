import mongoose from "mongoose";

const classSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    slots: { type: Number, required: true },
    bookedSlots: { type: Number, default: 0 },
    instructor: { type: String, required: true },
    category: { type: String, required: true },
    isFull: { type: Boolean, default: false },
    week: { type: Number },
    applicants: [{type:mongoose.Schema.Types.ObjectId,ref:'User'}]
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Class", classSchema);
