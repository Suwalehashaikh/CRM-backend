import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    role: {
      type: String,
      required: true,
      enum: ["Admin", "Counsellor", "Hr"],
    },

    isVerified: {
      type: Boolean,
      default: true,
    },

    otp: {
      type: String,
      default: null,
    },

    students: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
        default: null
      },
    ],

    profilePhoto: {
      type: String,
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2TgOv9CMmsUzYKCcLGWPvqcpUk6HXp2mnww&s",
    },
  },
  { timestamps: true }
);

export const Employee = mongoose.model("Employee", employeeSchema);
