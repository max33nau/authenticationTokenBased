'use strict';

var express = require('express');
var homeHandler = require('../handlers/home-handler');
var router = express.Router();
require('passport');

function ensureAuthenticatedforHomePage(request, response, next) {
    if (request.isAuthenticated()) {
      return next();
    } else {
    response.render('notAuthorized');
  }
}
module.exports = function home() {
  router.get('/',ensureAuthenticatedforHomePage, homeHandler.mainPage);
  return router;
};
