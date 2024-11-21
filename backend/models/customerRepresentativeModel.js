import mongoose from "mongoose";
let customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  clients: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

export default mongoose.model('customerModel',customerSchema);
