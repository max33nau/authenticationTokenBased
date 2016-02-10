var express = require('express');
var userHandler = require('../handlers/user-handler');
var router = express.Router();

module.exports = function authToken() {
  router.get('/register', userHandler.registerPage);
  router.get('/login',userHandler.loginPage);
  return router;
};
