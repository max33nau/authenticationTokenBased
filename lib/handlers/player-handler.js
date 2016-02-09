'use strict';
var player_handler = {};
var models = require('.././models');
var Player = models.player;

player_handler.getAll = function(request, response) {
  Player.find({}).sort({ name: 'asc' }).then(function (players) {
    if (players) {
      response.send(players);
    }
  }).then(null, function (error) {
    response.send(error);
  });
};

player_handler.getPlayerById = function(request, response) {
  Player.findById(request.params.id).then(function (player) {
    if (player) {
      response.send(player);

    }
  }).then(null, function (error) {
    response.send(error);
  });
};

player_handler.getPlayerByName = function(request, response) {
  var playerName = request.query.name.toUpperCase();
  Player.find({ name: playerName } ).then(function (player) {
    if (player[0].name) {
      response.render('player-profile',{
        name: player[0].name,
        age: `Age:  ${player[0].age}`,
        team: `Team:  ${player[0].team}`,
        height: `Height:  ${player[0].height.feet}' ${player[0].height.inches}" `,
        rookie: `Rookie:  ${player[0].rookie}`,
        totalGames: `Total Number of Games Played:  ${player[0].numberOfGamesPlayed}`,
        averagePoints: `Points Per Game:  ${player[0].average.pointsPerGame}`,
        averageRebounds: `Rebounds Per Game:  ${player[0].average.reboundsPerGame}`,
        averageAssists: `Assists Per Game:  ${player[0].average.assistsPerGame}`,
        averageSteals: `Steals Per Game:  ${player[0].average.stealsPerGame}`,
        averageBlocks: `Blocks Per Game:  ${player[0].average.blocksPerGame}`,
      });
    }
  }).then(null, function (error) {
    return response.render('notFound',{username:request.user.username,error: 'that player is not in the database', home: 'Back to search'});
  });
};

player_handler.createPlayer = function(request, response) {
  var newPlayer = new Player();
  newPlayer.name = request.body.name;
  newPlayer.team = request.body.team;
  newPlayer.age = request.body.age;
  newPlayer.height.feet = request.body.feet;
  newPlayer.height.inches = request.body.inches;
  newPlayer.position = request.body.position;
  newPlayer.rookie = request.body.rookie;
  newPlayer.numberOfGamesPlayed = request.body.numberOfGamesPlayed;
  newPlayer.totals.points = request.body.totalPoints;
  newPlayer.totals.rebounds = request.body.totalRebounds;
  newPlayer.totals.assists = request.body.totalAssists;
  newPlayer.totals.steals = request.body.totalSteals;
  newPlayer.totals.blocks = request.body.totalBlocks;
  newPlayer.average.pointsPerGame = Number((newPlayer.totals.points / newPlayer.numberOfGamesPlayed).toFixed(1));
  newPlayer.average.reboundsPerGame = Number((newPlayer.totals.rebounds / newPlayer.numberOfGamesPlayed).toFixed(1));
  newPlayer.average.assistsPerGame = Number((newPlayer.totals.assists / newPlayer.numberOfGamesPlayed).toFixed(1));
  newPlayer.average.stealsPerGame = Number((newPlayer.totals.steals / newPlayer.numberOfGamesPlayed).toFixed(1));
  newPlayer.average.blocksPerGame = Number((newPlayer.totals.blocks / newPlayer.numberOfGamesPlayed).toFixed(1));
  newPlayer.save(function (error, player) {
    if (!error) {
      response.send(player.name + ' was added to the database ');
    } else {
      response.send(error);
    }
  });
};

player_handler.updateWholeObject = function(request, response) {
  Player.findById(request.params.id).then(function (player) {
    if (player) {
      var playerkeys = ['name', 'team', 'age', 'height', 'position', 'rookie', 'numberOfGamesPlayed', 'totals', 'average'];
      for (var ii in playerkeys) {
        if (request.body[playerkeys[ii]]) {
          player[playerkeys[ii]] = request.body[playerkeys[ii]];
        } else {
          player[playerkeys[ii]] = null;
        }
      }
      return player;
    }
  }).then(function (player) {
    if (player) {
      player.save(function (error, player) {
        if (!error) {
          response.send(player);
        } else {
          response.send(error);
        }
      });
    }
  }).then(null, function (error) {
    if (error) {
      response.send(error);
    }
  });
};

player_handler.updatePlayerInfo= function(request, response) {
  Player.update({ _id: request.params.id }, { $set: request.body }, function (error) {
    if (error) {
      response.send(error);
    } else {
      response.send('update data was a success');
    }
  });
};

player_handler.removePlayer = function(request, response) {
  Player.remove({ _id: request.params.id }).then(function (player, error) {
    if (player) {
      response.send(request.params.id + ' was removed');
    }
  }).then(null, function (error) {
    if (error) {
      response.send(error);
    }
  });
};

module.exports = player_handler;
