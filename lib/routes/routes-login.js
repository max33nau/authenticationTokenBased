'use strict';

var express = require('express');
var userHandler = require('../handlers/login-handler');
var router = express.Router();
var passport = require('passport');

module.exports = function login() {
  router.get('/', userHandler.loginPage);
  router.post('/', passport.authenticate('local'), userHandler.signIn);
  return router;
};
