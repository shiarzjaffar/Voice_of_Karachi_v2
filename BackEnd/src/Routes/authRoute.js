import express from "express";
import nodemailer from "nodemailer";
import { User } from "../Models/User.js";
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const logoPath = resolve(__dirname, "../images/logo.png");

export const authRouter = express.Router();

const otpStore = new Map();
const verifiedEmails = new Set();

const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

authRouter.post("/signup", async (req, res) => {
  try {
    const { email, phone, password } = req.body;

    // Check if email or phone already exists
    const existingUser = await User.findOne({ 
      $or: [{ email }, { phone }] 
    });

    if (existingUser) {
      return res.status(400).json({
        error:
          existingUser.email === email
            ? "Email already taken!"
            : "Phone number already taken!"
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      ...req.body,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "Sign Up Successfully!",
      userId: newUser._id,
    });

  } catch (err) {
    console.error("Signup Error:", err);
    res.status(500).json({ error: "Server error during signup." });
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    let { email, password } = req.body;

    email = email.trim().toLowerCase();
    password = password.trim();

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(400).json({ error: "Invalid email or password!" });
    }

    let isMatch = false;

    const isHashed =
      user.password.startsWith("$2a$") ||
      user.password.startsWith("$2b$") ||
      user.password.startsWith("$2y$") ||
      user.password.startsWith("$2");

    if (isHashed) {
      isMatch = await bcrypt.compare(password, user.password);
    } else {
      if (password === user.password) {
        isMatch = true;

        // Migrate plaintext to bcrypt
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();
      }
    }

    if (!isMatch) {
      return res.status(400).json({ error: "Invalid email or password!" });
    }

    if (user.userstatus === 0) {
      return res.status(403).json({ error: "Account deactivated." });
    }

    req.session.userId = user._id;

    res.json({
      message: "Login successful!",
      userId: user._id,
      email: user.email,
    });

  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ error: "Server error during login." });
  }
});

authRouter.get("/check-session", (req, res) => {
  res.json({ loggedIn: !!req.session.userId, userId: req.session.userId });
});

authRouter.post("/logout", (req, res) => {
  req.session.destroy(err => {
    if (err) return res.status(500).send("Logout failed.");
    res.clearCookie("connect.sid");
    res.send("Logged out successfully.");
  });
});

authRouter.post("/check-email", async (req, res) => {
  const exists = await User.exists({ email: req.body.email });
  res.json({ exists: !!exists });
});

authRouter.post("/check-phone", async (req, res) => {
  const exists = await User.exists({ phone: req.body.phone });
  res.json({ exists: !!exists });
});

authRouter.post("/forgot-password/send", async (req, res) => {
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
          <img src="cid:Logo" alt="Urban Fixed Logo" style="height: 80px; margin-bottom: 10px;" />
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

authRouter.post("/forgot-password/verify", (req, res) => {
  const { email, otp } = req.body;
  const stored = otpStore.get(email);
  if (!stored || stored.otp !== otp || Date.now() > stored.expiresAt)
    return res.status(400).json({ error: "Invalid or expired OTP" });

  verifiedEmails.add(email);
  otpStore.delete(email);
  res.json({ message: "OTP verified successfully" });
});

authRouter.post("/forgot-password/reset", async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    // Check if OTP verified
    if (!verifiedEmails.has(email)) {
      return res.status(403).json({ error: "OTP not verified or expired" });
    }

    // Try to find user in User collection first, then Admin
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Hash the new password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Save hashed password
    user.password = hashedPassword;
    await user.save();

    // Remove email from verified set
    verifiedEmails.delete(email);

    res.json({ message: "Password reset successful" });

  } catch (error) {
    console.error("Reset Password Error:", error);
    res.status(500).json({ error: "Server error while resetting password" });
  }
});

// server.js or routes/auth.js (wherever you handle auth)
authRouter.get('/check-session', (req, res) => {
  if (req.session && req.session.userId) {
    res.json({ loggedIn: true, userId: req.session.userId });
  } else {
    res.json({ loggedIn: false });
  }
});

authRouter.post('/logout', (req, res) => {
  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).send('Failed to log out.');
      }
      res.clearCookie('connect.sid'); // Clear the session cookie
      return res.status(200).send('Logged out successfully.');
    });
  } else {
    res.status(400).send('No active session found.');
  }
});

// 📌 USER PROFILE ROUTE (GET)
authRouter.get("/Profile/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("+password");
    if (!user) {
      return res.status(404).json({ error: "User not found!" });
    }
    res.json(user);
  } catch (error) {
    console.error("Profile Fetch Error:", error);
    res.status(500).json({ error: "Something went wrong!" });
  }
});

// 📌 UPDATE PROFILE ROUTE (PUT)
authRouter.put("/profile/update/:id", async (req, res) => {
  try {
    const { email, phone } = req.body;
    const userId = req.params.id;

    const existingUser = await User.findOne({
      $or: [{ email }, { phone }],
      _id: { $ne: userId },
    });

    if (existingUser) {
      if (existingUser.email === email)
        return res.status(400).json({ message: "Email already taken" });
      if (existingUser.phone === phone)
        return res.status(400).json({ message: "Phone number already taken" });
    }

    const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "Profile updated successfully" });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ message: "Server error, please try again" });
  }
});

// 📌 DELETE ACCOUNT ROUTE (DELETE)
authRouter.delete("/profile/delete/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    await User.findByIdAndDelete(userId);
    res.status(200).json({ message: "Account deleted successfully!" });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ message: "Error deleting user." });
  }
});

authRouter.post("/password/check", async (req, res) => {
  try {
    const { userId, oldPassword } = req.body;

    const user = await User.findById(userId).select("+password");
    if (!user) {
      return res.status(404).json({ error: "User not found!" });
    }

    // Compare old password with hashed password
    const isMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isMatch) {
      return res.status(400).json({ error: "Old password is incorrect!" });
    }

    res.json({ message: "Password verified" });

  } catch (error) {
    console.error("Password check error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

authRouter.put("/password/update", async (req, res) => {
  try {
    const { userId, newPassword } = req.body;

    const user = await User.findById(userId).select("+password");
    if (!user) {
      return res.status(404).json({ error: "User not found!" });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    await user.save();

    res.json({ message: "Password updated successfully!" });

  } catch (error) {
    console.error("Password update error:", error);
    res.status(500).json({ error: "Server error" });
  }
});