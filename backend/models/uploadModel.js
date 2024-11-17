import mongoose from "mongoose";

const uploadSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  filepath: { type: String, required: true },
  mimetype: { type: String, required: true },
  size: { type: Number, required: true },
  uploadedAt: { type: Date, default: Date.now },
});

const Upload = mongoose.model("Upload", uploadSchema);
export default Upload;
