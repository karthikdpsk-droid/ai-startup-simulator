const Project = require("../models/project.model");
const Report = require("../models/report.model");

const getDashboard = async (req, res) => {
  try {
    const userId = req.user.id;

    const totalProjects = await Project.countDocuments({ userId });
    const totalReports = await Report.countDocuments({ userId });
    const recentProjects = await Project.find({ userId }).sort({ createdAt: -1 }).limit(5);
    const recentReports = await Report.find({ userId }).sort({ createdAt: -1 }).limit(5);

    res.json({
      success: true,
      data: {
        totalProjects,
        totalReports,
        recentProjects,
        recentReports
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching dashboard",
      error: error.message
    });
  }
};

module.exports = { getDashboard };