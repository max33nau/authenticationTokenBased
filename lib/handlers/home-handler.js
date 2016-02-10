'use strict';
var home_handler = {};

home_handler.mainPage = function(request,response) {
    response.render('index', {username:request.params.username});
};

module.exports = home_handler;
