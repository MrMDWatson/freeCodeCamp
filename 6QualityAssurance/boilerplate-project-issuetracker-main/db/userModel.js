const mongoose = require("mongoose");

const issueSchema = new mongoose.Schema({
  projectId: {type: String, required: true},
  issue_title: {type: String, required: true},
  issue_text: {type: String, required: true},
  created_on: Date,
  updated_on: Date,
  created_by: {type: String, required: true},
  assigned_to: String,
  open: Boolean,
  status_text: String
});
const Issues = mongoose.model("issues", issueSchema);

const projectSchema = new mongoose.Schema({
  name: {type: String, required: true}
});
const Projects = mongoose.model("projects", projectSchema);

module.exports = { Projects, Issues };