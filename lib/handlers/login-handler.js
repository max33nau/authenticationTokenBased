'use strict';
var login_handler = {};

login_handler.loginPage = function(request,response) {
  response.render('login');
};

login_handler.signIn = function(request,response){
  response.redirect('/home');
};

module.exports = login_handler;
