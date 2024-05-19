const mongoose = require("mongoose");

const issueSchema = new mongoose.Schema({
  project: {type: String, required: true},
  issue_title: {type: String, required: true},
  issue_text: {type: String, required: true},
  created_by: {type: String, required: true},
  assigned_to: {type: String, default: ""},
  status_text: {type: String, default: ""},
  open: {type: Boolean, default: true},
  created_on: {type: Date},
  updated_on: {type: Date}
});
const Issues = mongoose.model("issues", issueSchema);

module.exports = { Issues };