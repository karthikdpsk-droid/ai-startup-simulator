const express = require("express");
const router = express.Router();
const aiController = require("../controllers/ai.controller");
const authMiddleware = require("../middleware/auth.middleware");

router.post("/generate-idea", authMiddleware, aiController.generateIdea);
router.post("/tech-stack", authMiddleware, aiController.generateTechStack);
router.post("/roadmap", authMiddleware, aiController.generateRoadmap);
router.get("/reports", authMiddleware, aiController.getReports);
router.get("/reports/:id", authMiddleware, aiController.getReport);
router.delete("/reports/:id", authMiddleware, aiController.deleteReport);

module.exports = router;