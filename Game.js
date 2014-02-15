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

  start: function() {
    this.grid = Board.generate(20);
    InputController.start();
    
    InputController.on("coordinates", function(data) {
      var coordinates = CoordinateParser.parse(data);
    
      var x = (coordinates && coordinates.x !== undefined) ? coordinates.x : false;
      if(x) this.highlightRow(x);
 
      this.clear();
      this.printGrid();

      if(x) this.unHighlightRow(x);

    }.bind(this));
  },

  unHighlightRow: function(rowNumber) {
    rowNumber -= 1;
    for(var i = 0; i < 20; i++) {
      this.grid[rowNumber][i].unHighlight();
    } 
  },

  highlightRow: function(rowNumber) {
    rowNumber -= 1;
    for(var i = 0; i < 20; i++) {
      this.grid[rowNumber][i].highlight();
    } 
  }
};

module.exports = Game;
