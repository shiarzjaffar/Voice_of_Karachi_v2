import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullname: String,

    phone: String,

    email: String,

    password: {
      type: String,
      required: true,
      select: false,
    },
 

  role: {
    type: String,
    enum: ["Citizen", "Employee", "Admin"],
    default: "Citizen",
  },

  department: {
    type: String,
    default: null,
  },

  approved: {
    type: Boolean,
    default: true,
  },

  employeeId: {
    type: String,
    default: null,
  },

  userstatus: {
    type: Number,
    default: 1,
  },
});

export const User = mongoose.model("users", userSchema);