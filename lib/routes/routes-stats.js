'use strict';

var express = require('express');
var playerHandler = require('../handlers/player-handler');
var router = express.Router();
require('passport');

function ensureAuthenticatedforPlayerStats(request, response, next) {
    if (request.isAuthenticated() && request.user.username === 'administrator') { return next(); }

    response.render('notAuthorized');
}
module.exports = function stats() {
  router.get('/find', playerHandler.getPlayerByName);
  router.get('/', playerHandler.getAll);
  router.get('/:id', playerHandler.getPlayerById);
  router.post('/',ensureAuthenticatedforPlayerStats, playerHandler.createPlayer);
  router.put('/:id',ensureAuthenticatedforPlayerStats, playerHandler.updateWholeObject);
  router.patch('/:id',ensureAuthenticatedforPlayerStats, playerHandler.updatePlayerInfo);
  router.delete('/:id',ensureAuthenticatedforPlayerStats, playerHandler.removePlayer);
  return router;
};
