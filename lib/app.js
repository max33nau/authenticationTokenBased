'use strict';
var express = require('express');
var path = require('path');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var my = require('./configDBandServer');
var dbData = require('./database');
var stats = require('./routes/routes-stats');
var register = require('./routes/routes-register');
var login = require('./routes/routes-login');
var logout = require('./routes/routes-logout');
var index = require('./routes/routes-home');
var models = require('./models');
var User = models.user;
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: 'basketball is fun',
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(morgan('dev'));
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use('/player', stats());
app.use('/register', register());
app.use('/login', login());
app.use('/logout', logout());
app.use('/home', index());
// If page doesn't exist will throw back a 404 error
app.use(function(request,response,next) {
  var error = new Error('Not Found');
  error.status = 404;
  next(error);
});



 module.exports = function start() {
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
