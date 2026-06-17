const express = require("express");
const router = express.Router();

const aiController = require("../controllers/ai.controller");
const authMiddleware = require("../middleware/auth.middleware");

// Generate idea and save to DB
router.post("/generate-idea", authMiddleware, aiController.generateIdea);

// Get all reports
router.get("/reports", authMiddleware, aiController.getReports);

// Get single report
router.get("/reports/:id", authMiddleware, aiController.getReport);

// Delete report
router.delete("/reports/:id", authMiddleware, aiController.deleteReport);

module.exports = router;