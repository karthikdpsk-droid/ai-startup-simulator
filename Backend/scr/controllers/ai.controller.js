const aiService = require("../services/ai.service");
const Report = require("../models/report.model");

const generateIdea = async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) return res.status(400).json({ success: false, message: "Prompt is required" });

    const result = await aiService.generateStartupIdea(prompt);
    const score = await aiService.scoreStartupIdea(result);

    const report = await Report.create({
      userId: req.user.id,
      prompt: prompt,
      result: JSON.stringify(result),
      score: JSON.stringify(score),
      type: "idea"
    });

    res.json({ success: true, message: "AI generated idea successfully", reportId: report._id, data: result, score: score });
  } catch (error) {
    res.status(500).json({ success: false, message: "AI generation failed", error: error.message });
  }
};

const generateTechStack = async (req, res) => {
  try {
    const { startupIdea } = req.body;
    if (!startupIdea) return res.status(400).json({ success: false, message: "startupIdea is required" });

    const result = await aiService.generateTechStack(startupIdea);

    const report = await Report.create({
      userId: req.user.id,
      prompt: startupIdea,
      result: JSON.stringify(result),
      type: "techstack"
    });

    res.json({ success: true, message: "Tech stack generated successfully", reportId: report._id, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: "Tech stack generation failed", error: error.message });
  }
};

const generateRoadmap = async (req, res) => {
  try {
    const { startupIdea } = req.body;
    if (!startupIdea) return res.status(400).json({ success: false, message: "startupIdea is required" });

    const result = await aiService.generateRoadmap(startupIdea);

    const report = await Report.create({
      userId: req.user.id,
      prompt: startupIdea,
      result: JSON.stringify(result),
      type: "roadmap"
    });

    res.json({ success: true, message: "Roadmap generated successfully", reportId: report._id, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: "Roadmap generation failed", error: error.message });
  }
};

const getReports = async (req, res) => {
  try {
    const reports = await Report.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json({ success: true, total: reports.length, data: reports });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to get reports", error: error.message });
  }
};

const getReport = async (req, res) => {
  try {
    const report = await Report.findOne({ _id: req.params.id, userId: req.user.id });
    if (!report) return res.status(404).json({ success: false, message: "Report not found" });
    res.json({ success: true, data: report });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to get report", error: error.message });
  }
};

const deleteReport = async (req, res) => {
  try {
    const report = await Report.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!report) return res.status(404).json({ success: false, message: "Report not found" });
    res.json({ success: true, message: "Report deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to delete report", error: error.message });
  }
};

module.exports = { generateIdea, generateTechStack, generateRoadmap, getReports, getReport, deleteReport };