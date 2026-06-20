const express = require("express");
const router = express.Router();
const { getProfile } = require("../controllers/profile.controller");
const authMiddleware = require("../middleware/auth.middleware");

router.get("/", authMiddleware, getProfile);

module.exports = router;