import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true,},
    title: {type: String, required: true,},
    category: { type: String, required: true,},

    department: {
  type: String,
  required: true,
},

assignedEmployee: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "users",
  default: null,
},

assignedAt: {
  type: Date,
  default: null,
},

    description: { type: String, required: true,},
    photos: { type: [String], default: [] },
    location: { type: String, required: true,},
    reportSubmittedAt: { type: Date, default: Date.now,},
    reportClosedAt: { type: Date, default: null,},
    status: { type: String, enum: ["Pending", "In Progress", "Closed"], default: "Pending",},
    feedback: {type: String}
  },
  { timestamps: true });

export const Report = mongoose.model('reports', reportSchema);