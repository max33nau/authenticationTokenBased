'use strict';
var home_handler = {};

home_handler.mainPage = function(request,response) {
    response.render('index', {username:request.user.username});
};

module.exports = home_handler;
