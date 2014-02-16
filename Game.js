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
  x: false,
  y: false,

  start: function() {
    this.grid = Board.generate(this.size);
    this.renderScreen();
    InputController.read();

    InputController.on("coordinates", function(data) {
      var coordinates = CoordinateParser.parse(data);
    
      this.x = (coordinates && coordinates.x !== undefined && coordinates.x <= this.size) ? coordinates.x : false;
      if(this.x) this.highlightRow(this.x);

      this.y = (coordinates && coordinates.y !== undefined && coordinates.y <= this.size) ? coordinates.y : false;
      if(this.y) this.highlightColumn(this.y);

      this.renderScreen();

      if(this.x) this.unHighlightRow(this.x);
      if(this.y) this.unHighlightColumn(this.y);

    }.bind(this));

    InputController.on("enter", function() {
      if(this.x && this.y)
        this.mark(this.x, this.y); 
    }.bind(this));
  },

  renderScreen: function() {
    this.clear();
    this.printGrid();
    InputController.ask();
  },

  highlightColumn: function(columnNumber) {
    this.cycleColumn(columnNumber, "highlight");
  },

  unHighlightColumn: function(columnNumber) {
    this.cycleColumn(columnNumber, "unHighlight");
  },

  highlightRow: function(rowNumber) {
    this.cycleRow(rowNumber, "highlight");
  },

  unHighlightRow: function(rowNumber) {
    this.cycleRow(rowNumber, "unHighlight");
  },

  cycleRow: function(rowNumber, action) {
    rowNumber -= 1;
    for(var piece = 0; piece < this.size; piece++) {
      this.grid[rowNumber][piece][action]();
    } 
  },

  cycleColumn: function(columnNumber, action) {
    columnNumber -= 1; 
    for(var row = 0; row < this.size; row++) {
      this.grid[row][columnNumber][action](); 
    }
  },
  
  mark: function(coordinates) {
  }
};

module.exports = Game;
