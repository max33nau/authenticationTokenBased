"use strict";

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

/* FUNCTIONS FOR SCHEMA VALIDATION */
function toUpper(value) {
  return value.toUpperCase();
}
function convertToNumber(value) {
  if (isNaN(Number(value))) return 'not number';else return Number(value);
}
function validator(value) {
  return !isNaN(value);
}
var check = [validator, 'You did not enter a number for that stat'];

/* PLAYER SCHEMA */
var PlayerStatsSchema = new Schema({
  name: { type: String, unique: true, required: true, set: toUpper },
  team: { type: String, required: true, set: toUpper },
  age: { type: Number, required: true, set: convertToNumber, validate: check },
  height: {
    feet: { type: Number, set: convertToNumber, validate: check },
    inches: { type: Number, set: convertToNumber, validate: check }
  },
  position: { type: String, required: true, set: toUpper },
  rookie: Boolean,
  numberOfGamesPlayed: { type: Number, required: true, set: convertToNumber, validate: check },
  totals: {
    points: { type: Number, set: convertToNumber, validate: check },
    rebounds: { type: Number, set: convertToNumber, validate: check },
    assists: { type: Number, set: convertToNumber, validate: check },
    steals: { type: Number, set: convertToNumber, validate: check },
    blocks: { type: Number, set: convertToNumber, validate: check }
  },
  average: {
    pointsPerGame: { type: Number, set: convertToNumber, validate: check },
    reboundsPerGame: { type: Number, set: convertToNumber, validate: check },
    assistsPerGame: { type: Number, set: convertToNumber, validate: check },
    stealsPerGame: { type: Number, set: convertToNumber, validate: check },
    blocksPerGame: { type: Number, set: convertToNumber, validate: check }
  }
});

/* USER SCHEMA */
var UserInfoSchema = new Schema ({
  username:  String
});
UserInfoSchema.plugin(passportLocalMongoose);

var models = {};
var user = mongoose.model('User', UserInfoSchema);
var player = mongoose.model('Player', PlayerStatsSchema);

models.user = user;
models.player = player;

module.exports = models;
