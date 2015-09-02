var express = require('express'),
    exphbs = require('express-handlebars'),
    http = require('http'),
    path = require('path');

// Create an express instance and set a host and port variables
var app = express();
var port = process.env.PORT || 8080;
var host = process.env.HOST || 'localhost';

// Set handlebars as the templating engine
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/', function (req, res) {
  res.render('home');
});

var server = http.createServer(app);
server.listen(port, host, function () {
  console.log('Express server listening at %s:%d, within %s environment.', host, port, app.get('env'));
});
