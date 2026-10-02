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
  from: `"Voice of Karachi" <${process.env.EMAIL_USER}>`,
  to: email,
  subject: "Voice of Karachi - Password Reset OTP",

  text: `Your Voice of Karachi password reset OTP is ${otp}. This code expires in 10 minutes. If you did not request a password reset, you can ignore this email.`,

  html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Voice of Karachi - Password Reset</title>
</head>

<body
  style="
    margin:0;
    padding:0;
    background-color:#f4f7f7;
    font-family:Arial, Helvetica, sans-serif;
  "
>

<table
  width="100%"
  cellpadding="0"
  cellspacing="0"
  border="0"
  bgcolor="#f4f7f7"
  style="background-color:#f4f7f7;"
>
  <tr>
    <td align="center" style="padding:40px 15px;">

      <!-- MAIN CARD -->
      <table
        width="600"
        cellpadding="0"
        cellspacing="0"
        border="0"
        bgcolor="#ffffff"
        style="
          width:100%;
          max-width:600px;
          background-color:#ffffff;
          border:1px solid #e5e7eb;
        "
      >

        <!-- HEADER -->
        <tr>
          <td
            align="center"
            bgcolor="#075E54"
            style="
              background-color:#075E54;
              padding:32px 20px;
            "
          >

            <div
              style="
                font-size:28px;
                line-height:34px;
                font-weight:bold;
                color:#ffffff;
              "
            >
              Voice of Karachi
            </div>

            <div
              style="
                margin-top:6px;
                font-size:14px;
                line-height:20px;
                color:#d9f5ef;
              "
            >
              Government of Sindh
            </div>

            <div
              style="
                margin-top:3px;
                font-size:12px;
                line-height:18px;
                color:#c7ebe5;
              "
            >
              Digital Civic Engagement Platform
            </div>

          </td>
        </tr>


        <!-- CONTENT -->
        <tr>
          <td
            style="
              padding:40px 35px;
              color:#1f2937;
            "
          >

            <div
              style="
                font-size:24px;
                line-height:30px;
                font-weight:bold;
                color:#111827;
              "
            >
              Password Reset
            </div>

            <div
              style="
                margin-top:12px;
                font-size:15px;
                line-height:24px;
                color:#4b5563;
              "
            >
              We received a request to reset the password
              for your Voice of Karachi account.
            </div>


            <!-- OTP SECTION -->
            <table
              width="100%"
              cellpadding="0"
              cellspacing="0"
              border="0"
              bgcolor="#f0fdfa"
              style="
                margin-top:30px;
                background-color:#f0fdfa;
                border:1px solid #99f6e4;
              "
            >
              <tr>
                <td
                  align="center"
                  style="padding:28px 20px;"
                >

                  <div
                    style="
                      font-size:12px;
                      line-height:18px;
                      font-weight:bold;
                      color:#0f766e;
                      letter-spacing:1px;
                    "
                  >
                    YOUR VERIFICATION CODE
                  </div>

                  <div
                    style="
                      margin-top:15px;
                      padding:14px 20px;
                      background-color:#ffffff;
                      border:1px solid #ccfbf1;
                      font-size:36px;
                      line-height:44px;
                      font-weight:bold;
                      letter-spacing:8px;
                      color:#075E54;
                    "
                  >
                    ${otp}
                  </div>

                  <div
                    style="
                      margin-top:14px;
                      font-size:13px;
                      line-height:20px;
                      color:#64748b;
                    "
                  >
                    This code expires in 10 minutes.
                  </div>

                </td>
              </tr>
            </table>


            <!-- SECURITY NOTICE -->
            <table
              width="100%"
              cellpadding="0"
              cellspacing="0"
              border="0"
              style="margin-top:25px;"
            >
              <tr>

                <td
                  width="5"
                  bgcolor="#0f766e"
                  style="background-color:#0f766e;"
                >
                </td>

                <td
                  bgcolor="#f8fafc"
                  style="
                    padding:15px 18px;
                    background-color:#f8fafc;
                  "
                >

                  <div
                    style="
                      font-size:13px;
                      line-height:20px;
                      color:#475569;
                    "
                  >
                    <strong>Security notice:</strong>
                    Never share this verification code with anyone.
                    Voice of Karachi will never ask you for your OTP
                    by phone, message, or email.
                  </div>

                </td>

              </tr>
            </table>


            <!-- IGNORE MESSAGE -->
            <div
              style="
                margin-top:25px;
                font-size:13px;
                line-height:20px;
                color:#64748b;
              "
            >
              If you did not request a password reset,
              you can safely ignore this email.
            </div>

          </td>
        </tr>


        <!-- FOOTER -->
        <tr>
          <td
            align="center"
            bgcolor="#f8fafc"
            style="
              padding:25px 20px;
              background-color:#f8fafc;
              border-top:1px solid #e5e7eb;
            "
          >

            <div
              style="
                font-size:15px;
                line-height:20px;
                font-weight:bold;
                color:#334155;
              "
            >
              Voice of Karachi
            </div>

            <div
              style="
                margin-top:5px;
                font-size:12px;
                line-height:18px;
                color:#64748b;
              "
            >
              Digital Civic Engagement Platform
            </div>

            <div
              style="
                margin-top:12px;
                font-size:11px;
                line-height:17px;
                color:#94a3b8;
              "
            >
              This is an automated email. Please do not reply.
            </div>

          </td>
        </tr>

      </table>

    </td>
  </tr>
</table>

</body>
</html>
`
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
    admin.password = await bcrypt.hash(newPassword, 10);
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

    const employeeCount = await User.countDocuments({
      role: "Employee",
    });

    const pendingCount = await Report.countDocuments({
      status: "Pending",
    });

    const completedCount = await Report.countDocuments({
      status: "Closed",
    });

    res.json({
      users: userCount,
      reports: reportCount,
      contacts: contactCount,
      NGO: NGOCount,
      employees: employeeCount,
      pending: pendingCount,
      completed: completedCount,
    });

  } catch (err) {

    console.error("Error fetching stats:", err);

    res.status(500).json({
      message: "Failed to fetch stats",
    });

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

adminRouter.get("/employees", async (req, res) => {
  try {
const employees = await User.find({
  role: "Employee",
})
  .select(
    "employeeId fullname email phone department approved userstatus role createdAt"
  )
  .sort({ createdAt: -1 });

    res.json(employees);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to load employees.",
    });
  }
});

adminRouter.patch("/employees/:id/approve", async (req, res) => {
  try {
    const employee = await User.findByIdAndUpdate(
      req.params.id,
      {
        approved: true,
        userstatus: 1,
      },
      {
        new: true,
      }
    );

    if (!employee) {
      return res.status(404).json({
        error: "Employee not found.",
      });
    }

    res.json({
      message: "Employee approved successfully.",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Server error.",
    });
  }
});

adminRouter.get("/dashboard/recent-complaints", async (req, res) => {
  try {

    const complaints = await Report.find()
      .select("category location status createdAt")
      .sort({ createdAt: -1 })
      .limit(5);

    res.json(complaints);

  } catch (err) {

    console.error(err);

    res.status(500).json({
      error: "Failed to load recent complaints.",
    });

  }
});

adminRouter.patch("/employees/:id/reject", async (req, res) => {
  try {
    const employee = await User.findByIdAndUpdate(
      req.params.id,
      {
        approved: false,
        userstatus: 0,
      },
      {
        new: true,
      }
    );

    if (!employee) {
      return res.status(404).json({
        error: "Employee not found.",
      });
    }

    res.json({
      message: "Employee rejected successfully.",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Server error.",
    });
  }
});

(async () => {
  try {
    const defaultEmail = "admin@voiceofkarachi.com";
    const defaultPassword = "Voice@2026";

    const existingAdmin = await Admin.findOne({ email: defaultEmail });
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash(defaultPassword, 10);
      await Admin.create({
        email: defaultEmail,
        password: hashedPassword,
        fullname: "Voice of Karachi Administrator",
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