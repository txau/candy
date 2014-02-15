'use strict';

var Board = require("./Board");
var Renderer = require("./Renderer");
var InputController = require("./InputController");
var CoordinateParser = require("./CoordinateParser.js");

var Game = {

  stdout: process.stdout,

  clear: function() {
    this.stdout.write(Renderer.clear());
  },

  printGrid: function() {
    var render = Renderer.render(this.grid);
    this.stdout.write(render);
  },

  grid: [],
  size: 20,

  start: function() {
    this.grid = Board.generate(this.size);
    this.renderScreen();
    InputController.read();

    InputController.on("coordinates", function(data) {
      var coordinates = CoordinateParser.parse(data);
    
      var x = (coordinates && coordinates.x !== undefined && coordinates.x <= this.size) ? coordinates.x : false;
      if(x) this.highlightRow(x);

      this.renderScreen();

      if(x) this.unHighlightRow(x);

    }.bind(this));
  },

  renderScreen: function() {
    this.clear();
    this.printGrid();
    InputController.ask();
  },

  unHighlightRow: function(rowNumber) {
    rowNumber -= 1;
    for(var i = 0; i < this.size; i++) {
      this.grid[rowNumber][i].unHighlight();
    } 
  },

  highlightRow: function(rowNumber) {
    rowNumber -= 1;
    for(var i = 0; i < this.size; i++) {
      this.grid[rowNumber][i].highlight();
    } 
  }
};

module.exports = Game;
