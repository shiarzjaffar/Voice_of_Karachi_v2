import mongoose from 'mongoose';

const ngoSchema = new mongoose.Schema({
  fullname: String,
  phone: String,
  email: String,
  password: { type: String, required: true, select: false },
  role: {type: String, default: 'NGO'},
  ngostatus: { type: Number, default: 1 }
});

export const NGO = mongoose.model('NGOs', ngoSchema);