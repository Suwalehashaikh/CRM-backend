import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    counsellorDetail: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      default: null,
    },
   
  },
  { timestamps: true }
);

export default mongoose.model("Student", studentSchema);
