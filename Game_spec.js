'use strict';

var Board = require("./Board");
var Renderer = require("./Renderer");
var Game = require('./Game');

var EventEmitter = require('events').EventEmitter;
var InputController = require("./InputController");
var CoordinateParser = require("./CoordinateParser");
var Grid = require("./Grid");
var ScoringRenderer = require("./ScoringRenderer");

describe('Game', function(){

  var stdin, stdout;

  beforeEach(function(){
    Game.inputController = InputController();

    stdin = new EventEmitter();
    stdin.setRawMode = function(){};
    stdin.pause = function(){};
    Game.inputController.stdin = stdin;
    
    stdout = new EventEmitter();
    stdout.write = function(data){};

    Game.reset();
    Game.stdout = Game.inputController.stdout = stdout;
    Game.grid = Grid();
    Game.initialize();
  });


  it("should reset game", function(){
    Game.x = Game.y = Game.locked = Game.roundScore = "something";

    Game.reset();

    expect(Game.x).toBe(false);
    expect(Game.y).toBe(false);
    expect(Game.locked).toBe(false);
    expect(Game.roundScore).toBe(0);
  });

  it("should print a grid in output buffer", function(){
    spyOn(stdout, "write");
    spyOn(Board, "generate").andReturn("hello!");
    spyOn(Renderer, "render").andReturn("I'm game!");

    Game.printGrid();

    expect(stdout.write).toHaveBeenCalledWith("I'm game!");
  });

  it("should clear the screen", function() {
    spyOn(Renderer, "clear").andReturn("hello!");
    spyOn(stdout, "write");

    Game.clear();

    expect(stdout.write).toHaveBeenCalledWith("hello!");
  });

  it("should print the score", function(){
    Game.roundScore = 100;
    spyOn(stdout, "write");

    Game.printScore();

    expect(stdout.write).toHaveBeenCalledWith("this round > 100\n");
  });

  it("should render all screen components", function(){
    spyOn(Game, "clear");
    spyOn(Game, "printGrid");
    spyOn(Game, "printScore");

    Game.renderScreen();

    expect(Game.clear).toHaveBeenCalled();
    expect(Game.printGrid).toHaveBeenCalled();
    expect(Game.printScore).toHaveBeenCalled();
  });

  it("should give control to input controller", function() {
    spyOn(Game.inputController, "ask");
    spyOn(Game.inputController, "read");

    Game.start();

    expect(Game.inputController.ask).toHaveBeenCalled(); 
    expect(Game.inputController.read).toHaveBeenCalled(); 
  });

  it("should listen from InputController and use coordinate parser", function(){
    spyOn(CoordinateParser, "parse");

    Game.start();
    stdin.emit("data", new Buffer("2"));

    expect(CoordinateParser.parse).toHaveBeenCalledWith("2");
  });

  it("should wire input coordinates to highlighting then clear and reprint grid", function(){
    Game.start();
    spyOn(Game.grid, "highlightRow");
    spyOn(Game.grid, "highlightColumn");
    spyOn(Game, "clear");
    spyOn(Game, "printGrid");
    spyOn(Game.inputController, "ask");
    spyOn(Game.grid, "unHighlightRow");
    spyOn(Game.grid, "unHighlightColumn");

    Game.inputController.emit("coordinates", "5 6");

    expect(Game.grid.highlightRow).toHaveBeenCalledWith("5");
    expect(Game.grid.highlightColumn).toHaveBeenCalledWith("6");
    expect(Game.clear).toHaveBeenCalled();
    expect(Game.printGrid).toHaveBeenCalled();
    expect(Game.inputController.ask).toHaveBeenCalled();
    expect(Game.grid.unHighlightRow).toHaveBeenCalledWith("5");
    expect(Game.grid.unHighlightColumn).toHaveBeenCalledWith("6");
  });

  it("should not highlight if input is locked", function(){
    Game.start();
    spyOn(Game.grid, "highlightRow");
    spyOn(Game.grid, "highlightColumn");
    Game.locked = true;

    Game.inputController.emit("coordinates", "5 6");

    expect(Game.grid.highlightRow).not.toHaveBeenCalled();
    expect(Game.grid.highlightColumn).not.toHaveBeenCalled();
  });

  it("should send a cluster mark lock input on enter if both coordinates are pesent", function(){ 
    Game.start();
    Game.reset();
    spyOn(Game.grid, "mark").andCallThrough();
    spyOn(Game.inputController, "lock");

    Game.inputController.emit("coordinates", "1 2");
    Game.inputController.emit("enter");

    expect(Game.grid.mark).toHaveBeenCalledWith("1", "2");
    expect(Game.inputController.lock).toHaveBeenCalled();
    expect(Game.locked).toBe(true);
    expect(Game.roundScore).not.toBe(0);
  });

  it("should NOT send a cluster mark on enter if both coordinates are not pesent", function(){ 
    Game.start();
    spyOn(Game.grid, "mark");

    Game.inputController.emit("coordinates", "1 ");
    Game.inputController.emit("enter");

    expect(Game.grid.mark).not.toHaveBeenCalled();
  });

  it("should unlock and reset round if delete", function(){
    Game.start();
    Game.locked = true;
    spyOn(Game.grid, "unmark");
    spyOn(Game.inputController, "unlock")

    Game.inputController.emit("delete");

    expect(Game.locked).toBe(false);
    expect(Game.grid.unmark).toHaveBeenCalled();
    expect(Game.inputController.unlock).toHaveBeenCalled();
    expect(Game.roundScore).toBe(0);
  });

  it("should destroy pieces and reset input on enter if locked", function(){
    Game.start();
    Game.locked = true;
    Game.x = 10;
    Game.y = 10;
    spyOn(Game.grid, "destroyMarked");
    spyOn(Game, "renderScreen");

    Game.inputController.emit("enter");

    expect(Game.grid.destroyMarked).toHaveBeenCalled();
    expect(Game.renderScreen).toHaveBeenCalled();
    expect(Game.x).toBe(false);
    expect(Game.y).toBe(false);
    expect(Game.locked).toBe(false);
  });
});

