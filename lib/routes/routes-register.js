'use strict';

var express = require('express');
var registerHandler = require('../handlers/register-handler');
var router = express.Router();


module.exports = function register() {
  router.get('/', registerHandler.registerPage);
  router.post('/', registerHandler.createUser);
  return router;
};
