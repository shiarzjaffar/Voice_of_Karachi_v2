import express from "express";
import bcrypt from "bcrypt";
import { Admin } from "../Models/Admin.js";
import { User } from "../Models/User.js";
import { Contact } from "../Models/Contact.js";
import { Report } from "../Models/Report.js";
import nodemailer from "nodemailer";;
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import dotenv from "dotenv";
import { NGO } from "../Models/NGO.js";
dotenv.config();

export const adminRouter = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const logoPath = resolve(__dirname, "../images/logo.png");

const otpStore = new Map();
const verifiedEmails = new Set();

const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

adminRouter.post("/forgot-password/send", async (req, res) => {
  const { email } = req.body;
  const otp = generateOTP();
  otpStore.set(email, { otp, expiresAt: Date.now() + 10 * 60 * 1000 });

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "🔐 Your OTP Code - Action Required",
    text: `Your OTP is: ${otp}. It is valid for 10 minutes.`,
    html: `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #0E2A43; padding: 30px;">
      <div style="max-width: 550px; margin: auto; background: #3D6582; border-radius: 12px; padding: 35px; color: #F4F8F9; 
                  box-shadow: 0 0 20px rgba(91, 160, 188, 0.3); border: 1px solid #C4D0D6;">

        <div style="text-align: center; margin-bottom: 20px;">
          <img src="cid:Logo" alt="Urban Fix Logo" style="height: 80px; margin-bottom: 10px;" />
          <h1 style="margin: 0; font-size: 28px; color: #5BA0BC;">
            🔐 Verify Your Email
          </h1>
        </div>

        <p style="font-size: 16px; line-height: 1.6; color: #F4F8F9;">
          Hello there,
        </p>

        <p style="font-size: 16px; line-height: 1.6; color: #C4D0D6;">
          We're excited to help you verify your account. Please use the following One-Time Password (OTP) to complete your email verification:
        </p>

        <div style="text-align: center; margin: 35px 0;">
          <span style="display: inline-block; font-size: 32px; font-weight: 600; 
                       background: #5BA0BC; color: #0E2A43; padding: 14px 28px; 
                       border-radius: 10px; letter-spacing: 3px; 
                       box-shadow: 0 0 12px rgba(91, 160, 188, 0.7);">
            ${otp}
          </span>
        </div>

        <p style="font-size: 15px; color: #C4D0D6;">
          ⚠️ This code will expire in <strong>10 minutes</strong>. Do not share this OTP with anyone, including our team.
        </p>

        <p style="font-size: 15px; color: #C4D0D6;">
          If you did not request this verification, feel free to ignore this email — no action is needed.
        </p>

        <hr style="border: none; border-top: 1px solid #C4D0D6; margin: 35px 0;">

        <p style="font-size: 14px; text-align: center; color: #5BA0BC;">
          Thanks for being with us!<br><strong>— Urban Fix Team</strong>
        </p>

      </div>
    </div>`,
    attachments: [{
      filename: 'logo.png',
      path: logoPath,
      cid: 'Logo'
    }]
  });
  res.json({ message: "OTP sent" });
});

adminRouter.post("/forgot-password/verify", (req, res) => {
  const { email, otp } = req.body;
  const stored = otpStore.get(email);
  if (!stored || stored.otp !== otp || Date.now() > stored.expiresAt)
    return res.status(400).json({ error: "Invalid or expired OTP" });

  verifiedEmails.add(email);
  otpStore.delete(email);
  res.json({ message: "OTP verified successfully" });
});

adminRouter.post("/forgot-password/reset", async (req, res) => {
  const { email, newPassword } = req.body;

  if (!verifiedEmails.has(email)) {
    return res.status(403).json({ error: "OTP not verified or expired" });
  }

  const admin = await Admin.findOne({ email });
  if (!admin) {
    return res.status(404).json({ error: "User not found" });
  }

  try {
    admin.password = await bcrypt.hash(dev, 10);
    await admin.save();
    verifiedEmails.delete(email);

    res.json({ message: "Password reset successful" });
  } catch (err) {
    console.error("Error hashing password:", err);
    res.status(500).json({ error: "Server error while resetting password" });
  }
});


// GET /api/admin/stats/totals
adminRouter.get("/stats/totals", async (req, res) => {
  try {
    const userCount = await User.countDocuments();
    const reportCount = await Report.countDocuments();
    const contactCount = await Contact.countDocuments();
    const NGOCount = await NGO.countDocuments();

    res.json({
      users: userCount,
      reports: reportCount,
      contacts: contactCount,
      NGO : NGOCount,
    });
  } catch (err) {
    console.error("Error fetching stats:", err);
    res.status(500).json({ message: "Failed to fetch stats" });
  }
});

// Admin Login
adminRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await Admin.findOne({ email }).select("+password");
    if (!admin) {
      return res.status(400).json({ error: "Invalid email or password!" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid password!" });
    }

    req.session.adminId = admin._id;
    res.json({ message: "Login successful!", adminId: admin._id, email });
  } catch (err) {
    res.status(500).json({ error: "Server error during login" });
  }
});

// Check Admin Session
adminRouter.get("/check-session", (req, res) => {
  res.json({ loggedIn: !!req.session.adminId, adminId: req.session.adminId });
});

// Admin Logout
adminRouter.post("/logout", (req, res) => {
  req.session.destroy(err => {
    if (err) return res.status(500).send("Logout failed.");
    res.clearCookie("connect.sid");
    res.send("Logged out successfully.");
  });
});

// Get All Users
adminRouter.get("/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// Check Admin Email Exists
adminRouter.post("/check-admin-email", async (req, res) => {
  const { email } = req.body;
  try {
    const admin = await Admin.findOne({ email });
    res.json({ exists: !!admin });
  } catch (err) {
    res.status(500).json({ error: "An error occurred while checking email." });
  }
});

// Delete User by ID
adminRouter.delete("/user-delete/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Toggle User Active Status
adminRouter.put("/user-status/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    user.userstatus = user.userstatus === 1 ? 0 : 1;
    await user.save();

    res.json({
      success: true,
      message: `User ${user.userstatus === 1 ? "Activated" : "Deactivated"} successfully`,
      status: user.userstatus,
    });
  } catch (error) {
    console.error("Error updating user status:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Get Admin Profile
adminRouter.get("/profile/me", async (req, res) => {
  if (!req.session.adminId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const admin = await Admin.findById(req.session.adminId).select("+password");
    res.json(admin);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Update Admin Profile
adminRouter.put("/update-profile", async (req, res) => {
  if (!req.session.adminId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { fullname, email, phone, password } = req.body;

  try {
    const updateData = { fullname, email, phone };

    if (password && password.trim().length > 0) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateData.password = hashedPassword;
    }

    const updatedAdmin = await Admin.findByIdAndUpdate(
      req.session.adminId,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedAdmin) {
      return res.status(404).json({ error: "Admin not found" });
    }

    res.json({ message: "Profile updated successfully", admin: updatedAdmin });
  } catch (error) {
    console.error("Error updating admin profile:", error);
    res.status(500).json({ error: "Server error while updating profile" });
  }
});

adminRouter.put("/change-password", async (req, res) => {
  if (!req.session.adminId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const { oldPassword, newPassword } = req.body;

  try {
    const admin = await Admin.findById(req.session.adminId).select("+password");
    const isMatch = await bcrypt.compare(oldPassword, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Old password is incorrect" });
    }

    admin.password = await bcrypt.hash(newPassword, 10);
    await admin.save();

    res.json({ message: "Password changed successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

(async () => {
  try {
    const defaultEmail = "urbanfix18@gmail.com";
    const defaultPassword = "Urbanfix18";

    const existingAdmin = await Admin.findOne({ email: defaultEmail });
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash(defaultPassword, 10);
      await Admin.create({
        email: defaultEmail,
        password: hashedPassword,
        fullname: "Urban Fix",
        phone: "03102030405",
      });
      console.log("✅ Default admin created.");
    } else {
      console.log("ℹ️ Default admin already exists.");
    }
  } catch (err) {
    console.error("❌ Error creating default admin:", err);
  }
})();