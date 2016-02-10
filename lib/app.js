'use strict';
var express = require('express');
var path = require('path');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var session = require('express-session');
var my = require('./configDBandServer');
var dbData = require('./database');
var stats = require('./routes/routes-stats');
var logout = require('./routes/routes-logout');
var index = require('./routes/routes-home');

var Authenticat = require('authenticat');
var connection = dbData.mongoose.createConnection(my.dbConnect + my.dbName);
var authenticat = new Authenticat(connection);

var authToken = require('./routes/routes-user');


// var Authenticat = require('authenticat');
// var connection = dbData.mongoose.createConnection(my.dbConnect + my.dbName);
// var authenticat = new Authenticat(connection);

var app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(morgan('dev'));

app.use('/user', authenticat.router);
app.use('/user', authToken());
app.use('/player', stats());
//app.use('/user/signup', register());
//app.use('/user/sigin', login());
app.use('/logout', logout());
app.use('/home', index());
// If page doesn't exist will throw back a 404 error
app.use(function(request,response,next) {
  var error = new Error('Not Found');
  error.status = 404;
  next(error);
});

// module.exports =
 function start() {
  var mainApp = {};
  mainApp.start = function(callback) {
    var server = app.listen(process.env.PORT || my.serverPort, function () {
      console.log('server is connected');
      dbData.start(function () {
        console.log('connected to database');
        callback();
      });
    });
    return {
      close: function close(callback) {
        server.close(function () {
          dbData.mongoose.connection.close(callback);
        });
      }
    };
  };
  mainApp.app = app;
  return mainApp;
};

var mainApp = start();
mainApp.start(function(){
  console.log('app is ready');
});
