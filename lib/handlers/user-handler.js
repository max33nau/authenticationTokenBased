'use strict';
var user_handler = {};
var express = require('express');
var router = express.Router();

user_handler.loginPage = function(request,response) {
  response.render('login');
};

user_handler.registerPage = function(request,response) {
  response.render('register');
};

module.exports = user_handler;
