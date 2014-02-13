'use strict';

var Board = require("./Board");
var Renderer = require("./Renderer");
var InputController = require("./InputController");

var Game = {

  stdin: process.stdin,
  stdout: process.stdout,

  clear: function() {
    this.stdout.write(Renderer.clear());
  },

  printGrid: function() {
    var render = Renderer.render(this.board);
    this.stdout.write(render);
  },

  board: Board.generate(20),

  start: function() {
    InputController.start();
  }
};

module.exports = Game;
