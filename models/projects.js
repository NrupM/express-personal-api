var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ProjectSchema = new Schema({
      name: String,
      description: String,
      githubRepoUrl: String,
      screenshotUrl: String
  });

var ProjectSchema = mongoose.model('Project', ProjectSchema);

module.exports = Project;
