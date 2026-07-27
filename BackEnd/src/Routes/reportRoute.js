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
  department: req.body.department,

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

reportRouter.get("/user/dashboard", async (req, res) => {
  try {
    if (!req.session.userId) {
      return res.status(401).json({
        error: "Unauthorized",
      });
    }

    const userId = req.session.userId;

    const reports = await Report.find({
      userId,
    }).sort({
      createdAt: -1,
    });

    const total = reports.length;

    const pending = reports.filter(
      (r) => r.status === "Pending"
    ).length;

    const inProgress = reports.filter(
      (r) => r.status === "In Progress"
    ).length;

    const closed = reports.filter(
      (r) => r.status === "Closed"
    ).length;

    const recent = reports.slice(0, 5);

    const monthly = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
].map((month, index) => {

  const count = reports.filter((report) => {

    const reportDate = new Date(report.reportSubmittedAt);

    return (
      reportDate.getFullYear() === new Date().getFullYear() &&
      reportDate.getMonth() === index
    );

  }).length;

  return {
    month,
    complaints: count,
  };

});

res.json({
  total,
  pending,
  inProgress,
  closed,
  recent,
  monthly,
});

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Server error",
    });
  }
});

reportRouter.get("/user/reports", async (req, res) => {
  try {
    if (!req.session.userId) {
      return res.status(401).json({
        error: "Unauthorized",
      });
    }

    const reports = await Report.find({
      userId: req.session.userId,
    }).sort({
      createdAt: -1,
    });

    res.json(reports);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: "Server error",
    });

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


    if (status === "Closed") {
      updateFields.reportClosedAt = new Date();
    } else {

      updateFields.reportClosedAt = null;
    }

const report = await Report.findByIdAndUpdate(
  req.params.id,
  updateFields,
  { new: true }
);

if (!report) {
  return res.status(404).json({
    msg: "Report not found",
  });
}

res.json({
  msg: "Status updated",
  report,
});


  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

reportRouter.post("/feedback/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { feedback } = req.body;

    const report = await Report.findById(id);

    if (!report) {
      return res.status(404).json({
        error: "Report not found",
      });
    }

    report.feedback = feedback || "";

    await report.save();

    res.json({
      message: "Feedback saved successfully",
      report,
    });

  } catch (error) {
    console.error("Report feedback error:", error);
    res.status(500).json({
      error: "Server error",
    });
  }
});

reportRouter.get("/employee/dashboard", async (req, res) => {
  try {
    if (!req.session.userId) {
      return res.status(401).json({
        error: "Unauthorized",
      });
    }

    const employeeId = req.session.userId;
    const department = req.session.department;

const pending = await Report.countDocuments({
    status: "Pending",
    assignedEmployee: null,
});

    const assigned = await Report.countDocuments({
      assignedEmployee: employeeId,
      status: "In Progress",
    });

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const completedToday = await Report.countDocuments({
      assignedEmployee: employeeId,
      status: "Closed",
      reportClosedAt: { $gte: today },
    });

    const totalCompleted = await Report.countDocuments({
      assignedEmployee: employeeId,
      status: "Closed",
    });

    const recent = await Report.find({
      assignedEmployee: employeeId,
    })
      .sort({ updatedAt: -1 })
      .limit(5);

    res.json({
      pending,
      assigned,
      completedToday,
      totalCompleted,
      recent,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Server error",
    });
  }
});

reportRouter.get("/employee/pending", async (req, res) => {
  try {
    if (!req.session.userId) {
      return res.status(401).json({
        error: "Unauthorized",
      });
    }

    console.log("================================");
    console.log("Employee Department:", req.session.department);

    const allReports = await Report.find();

    console.log("All Reports:");
    console.log(allReports);

const reports = await Report.find({
    status: "Pending",
    assignedEmployee: null,
})

      .populate("userId", "fullname email phone")
      .sort({ createdAt: -1 });

    console.log("Filtered Reports:");
    console.log(reports);
    console.log("================================");

    return res.json(reports);

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Server error",
    });
  }
});

reportRouter.get("/employee/assigned", async (req, res) => {
  try {
    if (!req.session.userId) {
      return res.status(401).json({
        error: "Unauthorized",
      });
    }

    const reports = await Report.find({
      assignedEmployee: req.session.userId,
      status: "In Progress",
    })
      .populate("userId", "fullname email phone")
      .sort({ assignedAt: -1 });

    return res.json(reports);

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Server error",
    });
  }
});

reportRouter.get("/employee/completed", async (req, res) => {
  try {
    if (!req.session.userId) {
      return res.status(401).json({
        error: "Unauthorized",
      });
    }

    const reports = await Report.find({
      assignedEmployee: req.session.userId,
      status: "Closed",
    })
      .populate("userId", "fullname email phone")
      .sort({ reportClosedAt: -1 });

    return res.json(reports);

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Server error",
    });
  }
});

reportRouter.patch("/employee/assign/:id", async (req, res) => {
  try {

    console.log("USING findOneAndUpdate ROUTE");

    if (!req.session.userId) {
      return res.status(401).json({
        error: "Unauthorized",
      });
    }

    const report = await Report.findOneAndUpdate(
      {
        _id: req.params.id,
        assignedEmployee: null,
        status: "Pending",
      },
      {
        $set: {
          assignedEmployee: req.session.userId,
          assignedAt: new Date(),
          status: "In Progress",
        },
      },
      {
        new: true,
      }
    );

    if (!report) {
      return res.status(404).json({
        error: "Complaint not found or already assigned.",
      });
    }

    res.json({
      message: "Complaint assigned successfully.",
      report,
    });

  } catch (error) {
    console.error("Assign Error:", error);

    res.status(500).json({
      error: error.message,
    });
  }
});