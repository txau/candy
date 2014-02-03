'use strict';

var Candy = require("./Candy");

var symbols = ["$", "@", "#", "+"];

function randomSymbol(){
  var rand = candy.randomizer.rand();
  return symbols[rand];
}

var game = {

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
        grid[row].push(this.createRandomCandy());
      }
    }

    return grid;
  },

  randomizer: {},

  candy_config: [
    {type: "red"},
    {type: "blue"},
    {type: "green"},
    {type: "yellow"}
  ],

  createRandomCandy: function() {
    var rand = this.randomizer.rand();
    var candy = new Candy();

    switch(rand) {
      case 0:
        candy.type(this.candy_config[rand].type);
        break;
      case 1:
        candy.type("blue");
        break;
      case 2:
        candy.type("green");
        break;
      case 3:
        candy.type("yellow");
        break;
    }

    return candy;
  }
};

module.exports = game;
