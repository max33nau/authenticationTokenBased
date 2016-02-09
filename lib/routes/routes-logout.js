"use strict";
var express = require('express');
var router = express.Router();
 require('passport');


module.exports = function logout() {
  router.get('/',   function(request,response) {
    request.logout();
    response.redirect('/login');
  });
  return router;
};
