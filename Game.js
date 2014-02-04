'use strict';

var board = require("./Board");
var renderer = require("./Renderer");

var Game = {

  default_size: 30,

  run: function() {
    var thisBoard = board.generate(this.default_size);
    return renderer.render(thisBoard);
  }
};

module.exports = Game;
