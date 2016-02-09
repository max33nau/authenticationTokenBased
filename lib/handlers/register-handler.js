'use strict';
var register_handler = {};
var models = require('.././models');
var User = models.user;
var passport=require('passport');

register_handler.registerPage = function(request,response) {
  response.render('register');
};

register_handler.createUser = function(request,response) {
  if(request.body.newpassword === request.body.password) {
    User.register(new User({
        username: request.body.username
      }),  request.body.password, function(error, user){
        if (error) {
          return response.render('register', {
            info: 'That username has already been taken. Sorry'
          });
        } else {
          passport.authenticate('local')(request,response,function(){
            response.redirect('/home');
          });

        }


    });
  } else {
    return response.render('register', {
      info: 'Passwords did not match'
    });
  }
};


module.exports = register_handler;
