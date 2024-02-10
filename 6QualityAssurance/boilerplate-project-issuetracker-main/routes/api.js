'use strict';
const Projects = require("../db/userModel").Projects;
const Issues = require("../db/userModel").Issues;
module.exports = function (app) {

  app.route('/api/issues/:project')

    .get(async (req, res) => {
      const projectName = req.params.project;
      try {
        let project = await Projects.findOne({name: projectName});
        if (!project) {
          res.json({error: "project not found"});
          return;
        }
        let issues = await Issues.find({projectId: project._id}, {...req.query});
        if (!issues) {
          res.json({error: "No issues found"});
          return;
        }
        res.json(issues);
      } catch(err) {
        console.log(err);
        res.status(500).send({
          error: `Error creating issue`
        });
      }
    })

    .post(async (req, res) => {
      const projectName = req.params.project;
      let { issue_title, issue_text, created_by, assigned_to, status_text } = req.body;
      if (!issue_title || !issue_text || !created_by) {
        console.log("required field(s) missing");
        res.json({error: "required field(s) missing"});
        return;
      }
      try {
        let project = await Projects.findOne({name: projectName});
        if (!project) {
          project = await Projects.create({name: projectName});
          console.log(`Creating project ${project.name}\n${project}\n`);
        }
        const issue = await Issues.create({
          projectId: project._id,
          issue_title: issue_title,
          issue_text: issue_text,
          created_on: new Date(),
          updated_on: new Date(),
          created_by: created_by,
          assigned_to: assigned_to,
          open: true,
          status_text: status_text
        });
        if (!issue) {
          res.json({error: "Could not create issue"});
          return;
        }
        console.log(`Creating issue ${issue.issue_title}\n${issue}`);
        res.json(issue);
      } catch(err) {
        console.log(err);
        res.json({error: "Issue not posted"});
      }
    })

    .put(async (req, res) => {
      let project = req.params.project;
      let { _id, issue_title, issue_text, created_by, assigned_to, open, status_text } = req.body;
      if (!_id) {
        res.json({error: "missing _id"});
        return;  
      }
      try {
        let issue = await Issues.findByIdAndUpdate(
          {_id: _id},
          {
            issue_title: issue_title,
            issue_text: issue_text,
            updated_on: new Date,
            created_by: created_by,
            assigned_to: assigned_to,
            open: open,
            status_text: status_text
          },
          {new: true}
        );
        res.json({
          result: "successfully updated",
          _id: _id
          });
      } catch(err) {
        console.log(err);
        res.status(500).json({
          message: "could not update",
          _id: _id
        });
      }
    })

    .delete(async (req, res) => {
      let project = req.params.project;
      let { _id } = req.body;
      if (!_id) {
        res.json({
          error: "missing _id"
        });
        return;
      }
      try {
        await Issues.findByIdAndDelete({_id: _id});
        res.json({
          result: "successfully deleted",
          _id: _id
        });
      } catch(err) {
        console.log(err);
        res.json({
          message: "could not delete",
          _id: _id
        });
      }
    });

};
