const express = require("express");
const router = express.Router();

const projectController = require("../controllers/project.controller");
const authMiddleware = require("../middleware/auth.middleware");

// 🔐 PROTECTED ROUTES (JWT REQUIRED)

// CREATE project
router.post("/", authMiddleware, projectController.createProject);

// GET all projects
router.get("/", authMiddleware, projectController.getAllProjects);

// GET single project by ID
router.get("/:id", authMiddleware, projectController.getProjectById);

// UPDATE project
router.put("/:id", authMiddleware, projectController.updateProject);

// DELETE project
router.delete("/:id", authMiddleware, projectController.deleteProject);

module.exports = router;