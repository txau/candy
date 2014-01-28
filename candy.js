'use strict';

var symbols = ["$", "@", "#", "+"];

function randomSymbol(){
  var rand = candy.randomizer.rand();
  return symbols[rand];
}

var candy = {

  renderGrid: function(grid) {
    var result = [];

    grid.forEach(function(row) {
      result.push(row.join(" "));
    });

    return result.join("\n");
  },

  generateGrid: function(size) {
    var grid = [];

    for(var row = 0; row < size; row++){
      grid.push([]);
      for(var column = 0; column < size; column++){
        grid[row].push(randomSymbol());
      }
    }

    return grid;
  },

  randomizer: {}
};

module.exports = candy;
