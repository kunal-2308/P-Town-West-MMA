import mongoose, { mongo } from 'mongoose'

const adminSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    phoneNumber: {
      type: String,
      required: true,
      match: [/^\d{10}$/, "Phone number must be exactly 10 digits"],
    },
    role: { type: String, default: "admin" },
  });
  

export default mongoose.model('Admin',adminSchema);