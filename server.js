// Require our dependencies
var express = require('express'),
    exphbs = require('express-handlebars'),
    http = require('http'),
    path = require('path'),
    mongoose = require('mongoose');

// Create an express instance and set a host and port variables
var app = express();
var port = process.env.PORT || 8080;
var host = process.env.HOST || 'localhost';

// Set handlebars as the templating engine
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Connect to the mongo database
mongoose.connect('mongodb://localhost/react-tweets');

// Index Route
app.get('/', function (req, res) {
  res.render('home');
});

// Start the server
var server = http.createServer(app);
server.listen(port, host, function () {
  console.log('Express server listening at %s:%d, within %s environment.', host, port, app.get('env'));
});
