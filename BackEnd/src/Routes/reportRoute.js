import express from "express";
import { Report } from "../Models/Report.js";
import upload from "../../config/multer.js";

export const reportRouter = express.Router();

reportRouter.post("/create", upload.array("photos", 10),
  async (req, res) => {
    try {
      const photoPaths = req.files.map((file) => file.filename);

      const newReport = await Report.create({
        userId: req.body.userId,
        title: req.body.title,
        category: req.body.category,
        description: req.body.description,
        location: req.body.location,
        photos: photoPaths,
      });

      res.json({ msg: "Report created successfully", report: newReport });
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: "Server error" });
    }
  }
);

reportRouter.get("/fetch", async (req, res) => {
  try {
    const reports = await Report.find()
      .populate("userId", "fullname email phone")
      .sort({ createdAt: -1 });
    res.json(reports);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

reportRouter.get("/user/:id", async (req, res) => {
  try {
    const reports = await Report.find({ userId: req.params.id }).sort({
      createdAt: -1,
    });

    res.json(reports);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

reportRouter.get("/:id", async (req, res) => {
  try {

    const report = await Report.findById(req.params.id)
      .populate("userId", "fullname email phone");

    if (!report) {
      return res.status(404).json({
        msg: "Report not found",
      });
    }

    res.json(report);

  } catch (error) {

    res.status(500).json({
      msg: error.message,
    });

  }
});

reportRouter.patch("/close/:id", async (req, res) => {
  try {
    const updated = await Report.findByIdAndUpdate(
      req.params.id,
      {
        status: "Closed",
        reportClosedAt: new Date(),
      },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ msg: "Report not found" });
    }

    res.json({
      msg: "Report closed successfully",
      report: updated,
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

reportRouter.patch("/status/:id", async (req, res) => {
  try {
    const { status } = req.body;

    const valid = ["Pending", "In Progress", "Closed"];
    if (!valid.includes(status)) {
      return res.status(400).json({ msg: "Invalid status value" });
    }

    let updateFields = { status };

    // ⭐ If report is closed, add closed time
    if (status === "Closed") {
      updateFields.reportClosedAt = new Date();
    } else {
      // Optional: reset the closed time if status changes again
      updateFields.reportClosedAt = null;
    }

    const report = await Report.findByIdAndUpdate(
      req.params.id,
      updateFields,
      { new: true }
    );

    res.json({ msg: "Status updated", report });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

reportRouter.post("/feedback/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { feedback } = req.body;

    // session check (NGO must be logged in)
    if (!req.session || !req.session.userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    if (!feedback || feedback.trim() === "") {
      return res.status(400).json({ error: "Feedback is required" });
    }

    const report = await Report.findById(id);

    if (!report) {
      return res.status(404).json({ error: "Report not found" });
    }

    if (report.status !== "Closed") {
      return res
        .status(400)
        .json({ error: "Feedback allowed only for closed reports" });
    }

    report.feedback = feedback;
    await report.save();

    res.json({
      message: "Feedback saved successfully",
      report,
    });
  } catch (error) {
    console.error("Report feedback error:", error);
    res.status(500).json({ error: "Server error" });
  }
});