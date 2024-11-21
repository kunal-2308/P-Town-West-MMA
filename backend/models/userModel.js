import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    // password: { type: String, required: true }, //guest feature remove this
    phoneNumber: {
      type: String,
      required: true,
      match: [/^\d{10}$/, "Phone number must be exactly 10 digits"],
    },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    favorites: [{ type: String }], 
    bookedClasses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Class" }], 
    CR : {
      type : mongoose.Schema.Types.ObjectId,
      ref:'customerModel',
      required:true
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);
