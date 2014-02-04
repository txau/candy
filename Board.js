'use strcit'

var PieceFactory = require("./PieceFactory");

var Board = {
  generate: function(size) {
    var grid = [];

    for(var row = 0; row < size; row++){
      grid.push([]);
      for(var column = 0; column < size; column++){
        grid[row].push(PieceFactory.create());
      }
    }

    return grid;
  },
};

module.exports = Board;
