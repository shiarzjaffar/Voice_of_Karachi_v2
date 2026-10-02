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


authRouter.post("/employee/register", async (req, res) => {
  try {
    const {
      fullname,
      email,
      phone,
      password,
      department,
    } = req.body;

    // Check duplicate email or phone
    const existingUser = await User.findOne({
      $or: [{ email }, { phone }],
    });

    if (existingUser) {
      return res.status(400).json({
        error:
          existingUser.email === email
            ? "Email already taken!"
            : "Phone number already taken!",
      });
    }

const employees = await User.find(
  { role: "Employee" },
  "employeeId"
);

let highest = 0;

employees.forEach(emp => {
  const match = emp.employeeId?.match(/\d+/);

  if (match) {
    highest = Math.max(highest, Number(match[0]));
  }
});

const employeeId = `EMP${String(highest + 1).padStart(3, "0")}`;

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const employee = await User.create({
      fullname,
      email,
      phone,
      password: hashedPassword,

      role: "Employee",
      department,
      employeeId,

      approved: false,
      userstatus: 1,
    });

res.status(201).json({
  message: "Employee registration submitted successfully.",
  employeeId: employee.employeeId,
});

} catch (error) {

    console.error("====================================");
    console.error("Employee Registration Error");
    console.error("====================================");

    console.error(error);

    console.error(error.stack);

    res.status(500).json({
        error: error.message,
    });

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
req.session.department = user.department;

res.json({
  message: "Login successful!",

  user: {
    _id: user._id,
    fullname: user.fullname,
    email: user.email,
    phone: user.phone,

    role: user.role,
    department: user.department,
    employeeId: user.employeeId,

    approved: user.approved,
    userstatus: user.userstatus,
  },
});

  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ error: "Server error during login." });
  }
});

authRouter.get("/check-session", async (req, res) => {
  try {
    if (!req.session.userId) {
      return res.json({ loggedIn: false });
    }

    const user = await User.findById(req.session.userId).select(
      "_id fullname email phone role department employeeId approved userstatus"
    );

    if (!user) {
      return res.json({ loggedIn: false });
    }

    res.json({
      loggedIn: true,
      user,
    });
  } catch (error) {
    console.error("Check Session Error:", error);
    res.status(500).json({
      loggedIn: false,
      error: "Server error",
    });
  }
});

  
authRouter.post("/employee/login", async (req, res) => {
  try {
    let { email, password } = req.body;

    email = email.trim().toLowerCase();
    password = password.trim();

    // Find employee
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(400).json({
        error: "Invalid email or password!",
      });
    }

    // Check password
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

        // Convert old plaintext password to bcrypt
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();
      }
    }

    if (!isMatch) {
      return res.status(400).json({
        error: "Invalid email or password!",
      });
    }

    // Check if account is active
if (user.userstatus === 0) {
  return res.status(403).json({
    error: "Account deactivated.",
  });
}

// Only employees can login here
if (user.role !== "Employee") {
  return res.status(403).json({
    error: "Only employees can access the Employee Portal.",
  });
}

// Employee must be approved by admin
if (!user.approved) {
  return res.status(403).json({
    error: "Your employee account is awaiting admin approval.",
  });
}

// Create session
req.session.userId = user._id;
req.session.department = user.department;

// Send response
res.json({
  message: "Employee login successful!",
  user: {
    _id: user._id,
    fullname: user.fullname,
    email: user.email,
    phone: user.phone,
    role: user.role,
    department: user.department,
    employeeId: user.employeeId,
    approved: user.approved,
    userstatus: user.userstatus,
  },
});

  } catch (error) {
    console.error("Employee Login Error:", error);
    res.status(500).json({
      error: "Server error during login.",
    });
  }
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
  try {
    let { email } = req.body;

    email = email?.trim().toLowerCase();

    if (!email) {
      return res.status(400).json({
        error: "Email is required.",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        error: "No account found with this email.",
      });
    }

    const otp = generateOTP();

    otpStore.set(email, {
      otp,
      expiresAt: Date.now() + 10 * 60 * 1000,
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Voice of Karachi - Password Reset OTP",

      text: `Your Voice of Karachi password reset OTP is: ${otp}. It is valid for 10 minutes.`,

      html: `
        <div style="font-family: Arial, sans-serif; padding: 30px;">
          <div style="max-width: 550px; margin: auto; padding: 30px; border-radius: 12px;">
            
            <h2 style="text-align:center;">
              Voice of Karachi
            </h2>

            <h3>Password Reset</h3>

            <p>
              Use the following OTP to reset your password:
            </p>

            <div style="text-align:center; font-size:32px; font-weight:bold; margin:30px;">
              ${otp}
            </div>

            <p>
              This OTP will expire in 10 minutes.
            </p>

            <p>
              If you did not request a password reset, you can ignore this email.
            </p>

          </div>
        </div>
      `,
    });

    res.json({
      message: "OTP sent successfully.",
    });

  } catch (error) {
    console.error("Forgot Password Send Error:", error);

    res.status(500).json({
      error: "Unable to send OTP.",
    });
  }
});

authRouter.post("/forgot-password/verify", (req, res) => {
  try {
    let { email, otp } = req.body;

    email = email?.trim().toLowerCase();
    otp = otp?.trim();

    if (!email || !otp) {
      return res.status(400).json({
        error: "Email and OTP are required.",
      });
    }

    const stored = otpStore.get(email);

    if (!stored) {
      return res.status(400).json({
        error: "OTP not found or expired.",
      });
    }

    if (Date.now() > stored.expiresAt) {
      otpStore.delete(email);

      return res.status(400).json({
        error: "OTP has expired.",
      });
    }

    if (stored.otp !== otp) {
      return res.status(400).json({
        error: "Invalid OTP.",
      });
    }

    verifiedEmails.add(email);
    otpStore.delete(email);

    res.json({
      message: "OTP verified successfully.",
    });

  } catch (error) {
    console.error("OTP Verification Error:", error);

    res.status(500).json({
      error: "Server error while verifying OTP.",
    });
  }
});

authRouter.post("/forgot-password/reset", async (req, res) => {
  try {
    let { email, newPassword } = req.body;

    email = email?.trim().toLowerCase();

    if (!email || !newPassword) {
      return res.status(400).json({
        error: "Email and new password are required.",
      });
    }

    if (newPassword.length < 8) {
      return res.status(400).json({
        error: "Password must be at least 8 characters long.",
      });
    }

    if (!verifiedEmails.has(email)) {
      return res.status(403).json({
        error: "OTP not verified or expired.",
      });
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(404).json({
        error: "User not found.",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update ONLY the password
    const result = await User.updateOne(
      { _id: user._id },
      {
        $set: {
          password: hashedPassword,
        },
      }
    );

    if (result.modifiedCount !== 1) {
      return res.status(500).json({
        error: "Password was not updated.",
      });
    }

    verifiedEmails.delete(email);

    res.json({
      message: "Password reset successful.",
    });

  } catch (error) {
    console.error("Reset Password Error:", error);

    res.status(500).json({
      error: "Server error while resetting password.",
    });
  }
});

// server.js or routes/auth.js (wherever you handle auth)


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

    console.log("Existing email/phone:", existingUser);

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

    if (!userId || !newPassword) {
      return res.status(400).json({
        error: "User ID and new password are required.",
      });
    }

    if (newPassword.length < 8) {
      return res.status(400).json({
        error: "Password must be at least 8 characters long.",
      });
    }

    const user = await User.findById(userId).select("+password");

    if (!user) {
      return res.status(404).json({
        error: "User not found!",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          password: hashedPassword,
        },
      }
    );

    res.json({
      message: "Password updated successfully!",
    });

  } catch (error) {
    console.error("Password update error:", error);

    res.status(500).json({
      error: "Server error while updating password.",
    });
  }
});