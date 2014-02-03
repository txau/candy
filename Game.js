'use strict';

var Candy = require("./Candy");
var Randomizer = require("./Randomizer");

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

  randomizer: Randomizer(),

  candyConfig: [
    {type: "red"},
    {type: "blue"},
    {type: "green"},
    {type: "yellow"}
  ],

  createRandomCandy: function() {
    var rand = this.randomizer.rand();
    var candy = new Candy();

    candy.config(this.candyConfig[rand]);

    return candy;
  }
};

module.exports = game;
