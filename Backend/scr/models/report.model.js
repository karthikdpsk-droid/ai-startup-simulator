const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: false
  },
  prompt: {
    type: String,
    required: true
  },
  result: {
    type: String,
    required: true
  },
  score: {
    type: String,
    default: null
  },
  type: {
    type: String,
    default: "idea"
  }
}, { timestamps: true });

module.exports = mongoose.model("Report", reportSchema);