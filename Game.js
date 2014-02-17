'use strict';

var Board = require("./Board");
var Renderer = require("./Renderer");
var InputController = require("./InputController");
var CoordinateParser = require("./CoordinateParser.js");
var Grid = require("./Grid.js");
var ScoringRenderer = require("./ScoringRenderer");
var Scoring = require("./Scoring");

var Game = {

  stdout: process.stdout,

  clear: function() {
    this.stdout.write(Renderer.clear());
  },

  printGrid: function() {
    var render = Renderer.render(Grid);
    this.stdout.write(render);
  },

  size: 20,
  x: false,
  y: false,
  locked: false,
  roundScore: 0,

  start: function() {
    Grid.load(Board.generate(this.size));
    this.renderScreen();
    InputController.read();

    InputController.on("coordinates", function(data) {
      var coordinates = CoordinateParser.parse(data);
    
      this.x = (coordinates && coordinates.x !== undefined) ? coordinates.x : false;
      if(this.x && !this.locked) Grid.highlightRow(this.x);

      this.y = (coordinates && coordinates.y !== undefined) ? coordinates.y : false;
      if(this.y && !this.locked) Grid.highlightColumn(this.y);

      this.renderScreen();

      if(this.x) Grid.unHighlightRow(this.x);
      if(this.y) Grid.unHighlightColumn(this.y);

    }.bind(this));

    InputController.on("enter", function() {
      if(this.locked)
        Grid.destroyMarked();
 
      if(this.x && this.y && !this.locked) {
        Grid.mark(this.x, this.y); 
        this.locked = true;
        InputController.lock();
        this.roundScore = Scoring.foreseePoints(Grid.getMarkedPieces());
      }
   }.bind(this));

    InputController.on("delete", function(){
      Grid.unmark();
      this.locked = false;
      InputController.unlock();
      this.roundScore = 0;
    }.bind(this));
  },

  renderScreen: function() {
    this.clear();
    this.printGrid();
    this.printScore();
    InputController.ask();
  },

  printScore: function() {
    var scoring = ScoringRenderer.render(this.roundScore);
    this.stdout.write(scoring);
  }
};

module.exports = Game;
