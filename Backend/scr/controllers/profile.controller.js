const User = require("../models/user.model");
const Project = require("../models/project.model");
const Report = require("../models/report.model");

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    const totalProjects = await Project.countDocuments({ userId: req.user.id });
    const totalReports = await Report.countDocuments({ userId: req.user.id });

    res.json({
      success: true,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        totalProjects,
        totalReports,
        memberSince: user.createdAt
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to get profile", error: error.message });
  }
};

module.exports = { getProfile };