// Require our dependencies
var express = require('express'),
    exphbs = require('express-handlebars'),
    http = require('http'),
    path = require('path'),
    mongoose = require('mongoose'),
    Twit = require('twit'),
    routes = require('./routes'),
    config = require('./config'),
    streamHandler = require('./utils/streamHandler');

// Create an express instance and set a host and port variables
var app = express();
var port = process.env.PORT || 8080;
var host = process.env.HOST || 'localhost';

// Set handlebars as the templating engine
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Connect to the mongo database
mongoose.connect('mongodb://localhost/react-tweets');

// Create a new twitter instance
var T = new Twit(config.twitter);

// Index Routes
app.get('/', routes.index);

// Page Route
app.get('/page/:page/:skip', routes.page);

// Start the server
var server = http.createServer(app);
server.listen(port, host, function () {
  console.log('Express server listening at %s:%d, within %s environment.', host, port, app.get('env'));
});

// Initialize socket.io
var io = require('socket.io').listen(server);

// Set a stream listener for tweets matching tracking keywords
var stream = T.stream('statuses/filter', { track: 'React' });
streamHandler(stream, io);
