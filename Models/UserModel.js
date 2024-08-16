import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    // Change cartData from String to Map or Object
    cartData: {
      type: Map, // or type: Object
      of: Number, // Ensure the values in the Map/Object are numbers (quantities)
      default: {}, // Initialize with an empty object by default
    },
  },
  { minimize: false }
);

const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;
