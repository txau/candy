'use strict';

var Board = require("./Board");
var Renderer = require("./Renderer");

var Game = {

  clear: function() {
    process.stdout.write(Renderer.clear());
  },

  printGrid: function() {
    var render = Renderer.render(this.board);
    process.stdout.write(render);
  },

  board: Board.generate(20)
};

module.exports = Game;
