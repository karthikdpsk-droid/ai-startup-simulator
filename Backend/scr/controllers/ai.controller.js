const aiService = require("../services/ai.service");
const Report = require("../models/report.model");

const generateIdea = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({
        success: false,
        message: "Prompt is required"
      });
    }

    // Generate AI idea
    const result = await aiService.generateStartupIdea(prompt);

    // Generate AI score
    const score = await aiService.scoreStartupIdea(result);

    // Save to MongoDB
    const report = await Report.create({
      userId: req.user.id,
      prompt: prompt,
      result: JSON.stringify(result),
      score: JSON.stringify(score),
      type: "idea"
    });

    res.json({
      success: true,
      message: "AI generated idea successfully",
      reportId: report._id,
      data: result,
      score: score
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "AI generation failed",
      error: error.message
    });
  }
};

// Get all reports of logged in user
const getReports = async (req, res) => {
  try {
    const reports = await Report.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json({
      success: true,
      total: reports.length,
      data: reports
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get reports",
      error: error.message
    });
  }
};

// Get single report
const getReport = async (req, res) => {
  try {
    const report = await Report.findOne({ _id: req.params.id, userId: req.user.id });
    if (!report) {
      return res.status(404).json({ success: false, message: "Report not found" });
    }
    res.json({ success: true, data: report });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to get report", error: error.message });
  }
};

// Delete report
const deleteReport = async (req, res) => {
  try {
    const report = await Report.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!report) {
      return res.status(404).json({ success: false, message: "Report not found" });
    }
    res.json({ success: true, message: "Report deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to delete report", error: error.message });
  }
};

module.exports = {
  generateIdea,
  getReports,
  getReport,
  deleteReport
};