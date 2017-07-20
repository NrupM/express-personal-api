// require express and other modules
var express = require('express'),
    app = express();

// parse incoming urlencoded form data
// and populate the req.body object
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// allow cross origin requests (optional)
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/************
 * DATABASE *
 ************/

var db = require('./models');

/**********
 * ROUTES *
 **********/

// Serve static files from the `/public` directory:
// i.e. `/images`, `/scripts`, `/styles`
app.use(express.static('public'));

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 */

app.get('/api', function apiIndex(req, res) {
  // TODO: Document all your api endpoints below as a simple hardcoded JSON object.
  // It would be seriously overkill to save any of this to your database.
  // But you should change almost every line of this response.
  res.json({
    message: "Welcome to my personal api! Here's what you need to know!",
    documentationUrl: "https://github.com/NrupM/express-personal-api",
    baseUrl: "https://quiet-tor-44530.herokuapp.com",
    endpoints: [
      {method: "GET", path: "/api", description: "Index describing all available endpoints"},
      {method: "GET", path: "/api/profile", description: "Who I am and where I am from"},
      {method: "GET", path: "/api/projects", description: "Index of all projects"},
      {method: "POST", path: "/api/projects", description: "Create a new project"}
    ]
  });
});

//GET profile information
app.get('/api/profile', function apiProfile(req, res){
  res.json({
    name: 'Mary Northrup',
    githubUsername: 'NrupM',
    githubLink: 'https://github.com/NrupM',
    githubProfileImage:'https://avatars2.githubusercontent.com/u/29370507?v=4&u=440b2b83b74798e15bdc4a8ca0b0681624473828&s=400',
    personalSiteLink: 'https://nrupm.github.io/',
    currentCity: 'San Francisco',
    favoriteSongs: [
      {title: 'Never 2 Much', artist: 'ODahl'},
      {title: 'Sugar Snap', artist: 'Tora'},
      {title: 'The Boss', artist: 'James Brown'},
      {title: 'Strawberry Letter 23', artist: 'The Brothers Johnson'}
    ]
  });
});

//GET JSON all projects
app.get('/api/projects', function apiProjectsIndex(req,res){
  //send all projects as JSON response
  db.Project.find({}, function(err, projects){
    if (err) {
      res.send('project index error: ' + err);
      res.sendStatus(500);
    }
    res.json(projects);
  });
});

app.get('/api/projects/:project_id', function(req, res){
  db.Project.findOne({_id: req.params.project_id}, function getOneProject(err, project){
    res.json(project);
  });
});

//Create new project
app.post('/api/projects', function create(req, res){
  var newProject = new db.Project({
    name: req.body.name,
    description: req.body.description,
    githubRepoUrl: req.body.githubRepoUrl,
    screenshotUrl: req.body.screenshotUrl
  }); //create an instance of a project

  //requrest to the db to save a new Project
  newProject.save(function (err, savedProject){
      if (err) {
        res.send('create error: ' + err);
      }
      res.json(savedProject);
  });
});

app.put('/api/projects/:project_id', function update(req, res){
  //use Project model to find the project we want
  db.Project.findById(req.params.project_id, function (err, updateProject){
    if (err) { res.send('update error: ' + err); }

    updateProject.name = req.body.name;
    updateProject.description = req.body.description;
    updateProject.githubRepoUrl = req.body.githubRepoUrl;
    updateProject.screenshotUrl = req.body.screenshotUrl;
    updateProject.save(function(err, savedProject){
      if (err) { res.send('saved update error: ' + err); }
      res.json(savedProject);
    });
  });
});



/**********
 * SERVER *
 **********/

// listen on the port that Heroku prescribes (process.env.PORT) OR port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});
