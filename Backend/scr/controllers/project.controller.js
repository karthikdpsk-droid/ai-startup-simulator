const Project = require("../models/project.model");
const Report = require("../models/report.model");

const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json({ success: true, total: projects.length, data: projects });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching projects", error: error.message });
  }
};

const getProjectById = async (req, res) => {
  try {
    const project = await Project.findOne({ _id: req.params.id, userId: req.user.id });
    if (!project) return res.status(404).json({ success: false, message: "Project not found" });
    res.json({ success: true, data: project });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching project", error: error.message });
  }
};

const createProject = async (req, res) => {
  try {
    const { startupIdea, industry, targetAudience } = req.body;
    if (!startupIdea) return res.status(400).json({ success: false, message: "startupIdea is required" });
    const newProject = await Project.create({
      userId: req.user.id,
      startupIdea,
      industry: industry || "",
      targetAudience: targetAudience || ""
    });
    res.status(201).json({ success: true, message: "Project created successfully", data: newProject });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error creating project", error: error.message });
  }
};

const updateProject = async (req, res) => {
  try {
    const updatedProject = await Project.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true }
    );
    if (!updatedProject) return res.status(404).json({ success: false, message: "Project not found" });
    res.json({ success: true, message: "Project updated successfully", data: updatedProject });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating project", error: error.message });
  }
};

const deleteProject = async (req, res) => {
  try {
    const deletedProject = await Project.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!deletedProject) return res.status(404).json({ success: false, message: "Project not found" });
    res.json({ success: true, message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting project", error: error.message });
  }
};

module.exports = { getAllProjects, getProjectById, createProject, updateProject, deleteProject };