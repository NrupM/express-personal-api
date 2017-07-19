// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.
var db = require('./models');

var project_list = [
  {
    name: 'Portfolio Website',
    description: 'Personal profile page utilizing HTML5, CSS3, JavaScript, jQuery, and Bootstrap',
    githubRepoUrl: 'https://github.com/NrupM/NrupM.github.io',
    screenshotUrl: 'http://i.imgur.com/LTpKJht.png'
  },
  {
    name: 'Wall-E Themed Racing Game',
    description: '2 player racing game utilizing HTML5, CSS3, JavaScript, jQuery, and Bootstrap',
    githubRepoUrl: 'https://github.com/NrupM/Project-0-Racing-Game',
    screenshotUrl: 'http://i.imgur.com/lxFp6AO.jpg'
  },
  {
    name: 'tic-tac-toe',
    description: 'browser tic-tac-toe using HTML5, CSS3, JavaScript, jQuery, and Bootstrap',
    githubRepoUrl: 'https://github.com/NrupM/tic-tac-toe',
    screenshotUrl: 'http://i.imgur.com/Hwj5hsQ.png'
  },
];

db.Project.remove({}, function(err, project){
  console.log('removed all projects');
  db.Project.create(project_list, function (err, projects){
    if (err) {
      console.log(err);
      return;
    }
    console.log('recreated all projects');
    console.log('created', projects.length, 'projects');
  });
});
