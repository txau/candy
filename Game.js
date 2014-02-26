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
  inputController: InputController(),
  grid: Grid(),

  clear: function() {
    this.stdout.write(Renderer.clear());
  },

  printGrid: function() {
    var render = Renderer.render(this.grid);
    this.stdout.write(render);
  },

  size: 20,
  x: false,
  y: false,
  locked: false,
  roundScore: 0,

  reset: function() {
    this.x = false;
    this.y = false;
    this.locked = false;
    this.roundScore = 0;
  },

  initialize: function() {
    this.grid.load(Board.generate(this.size));

    this.inputController.on("coordinates", function(data) {
      var coordinates = CoordinateParser.parse(data);

      this.x = (coordinates && coordinates.x !== undefined) ? coordinates.x : false;
      if(this.x && !this.locked) this.grid.highlightRow(this.x);

      this.y = (coordinates && coordinates.y !== undefined) ? coordinates.y : false;
      if(this.y && !this.locked) this.grid.highlightColumn(this.y);

      this.renderScreen();

      if(this.x) this.grid.unHighlightRow(this.x);
      if(this.y) this.grid.unHighlightColumn(this.y);
    }.bind(this));

    this.inputController.on("enter", function() {
      if(this.locked) {
        this.grid.destroyMarked();
        this.inputController.currentInput = "";
        this.x = false;
        this.y = false;
        this.renderScreen();
        this.inputController.unlock();
        this.locked = false;
      }

      if(this.x && this.y && !this.locked) {
        this.grid.mark(this.x, this.y); 
        this.locked = true;
        this.inputController.lock();
        this.roundScore = Scoring.foreseePoints(this.grid.getMarkedPieces());
      }
    }.bind(this));

    this.inputController.on("delete", function(){
      this.grid.unmark();
      this.locked = false;
      this.inputController.unlock();
      this.roundScore = 0;
    }.bind(this));
  },

  start: function() {
    this.renderScreen();
    this.inputController.read();
  },

  renderScreen: function() {
    this.clear();
    this.printGrid();
    this.printScore();
    this.inputController.ask();
  },

  printScore: function() {
    var scoring = ScoringRenderer.render(this.roundScore);
    this.stdout.write(scoring);
  }
};

module.exports = Game;
