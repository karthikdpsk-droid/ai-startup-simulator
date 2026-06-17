const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  startupIdea: {
    type: String,
    required: true
  },
  industry: {
    type: String,
    default: ""
  },
  targetAudience: {
    type: String,
    default: ""
  }
}, { timestamps: true });

module.exports = mongoose.model("Project", projectSchema);