'use strict';

var Board = require("./Board");
var Renderer = require("./Renderer");

var Game = {

  default_size: 30,

  run: function() {
    var board = Board.generate(this.default_size);
    return Renderer.render(board);
  }
};

module.exports = Game;
