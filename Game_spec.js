'use strict';

var Board = require("./Board");
var Renderer = require("./Renderer");
var Game = require('./Game');

var EventEmitter = require('events').EventEmitter;
var InputController = require("./InputController");
var CoordinateParser = require("./CoordinateParser");

describe('Game', function(){

  var stdin, stdout;

  beforeEach(function(){
    stdin = new EventEmitter();
    stdin.setRawMode = function(){};
    stdin.pause = function(){};
    InputController.stdin = stdin;
    
    stdout = new EventEmitter();
    stdout.write = function(data){};
    Game.stdout = InputController.stdout = stdout;
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

  it("should give control to input controller", function() {
    spyOn(InputController, "ask");
    spyOn(InputController, "read");

    Game.start();

    expect(InputController.ask).toHaveBeenCalled(); 
    expect(InputController.read).toHaveBeenCalled(); 
  });

  it("should listen from InputController and use coordinate parser", function(){
    Game.start();
    spyOn(CoordinateParser, "parse");

    stdin.emit("data", new Buffer("2"));

    expect(CoordinateParser.parse).toHaveBeenCalledWith("2");
  });

  it("should mark a whole grid row as highlighted", function(){
    Game.start();
    spyOn(Game.grid[2][0], "highlight");

    Game.highlightRow(3);

    expect(Game.grid[2][0].highlight).toHaveBeenCalled();
  });

  it("should unmark a whole grid row as highlighted", function(){
    Game.start();
    spyOn(Game.grid[2][0], "unHighlight");

    Game.unHighlightRow(3);

    expect(Game.grid[2][0].unHighlight).toHaveBeenCalled();
  });

  it("should avoid un/highlight beyond grid size", function(){
    Game.start();
    spyOn(Game.grid[2][0], "highlight");
    spyOn(Game.grid[2][0], "unHighlight");

    InputController.emit("coordinates", "122");

    expect(Game.grid[2][0].highlight).not.toHaveBeenCalled();
    expect(Game.grid[2][0].unHighlight).not.toHaveBeenCalled();
  });


  it("should wire input coordinates to highlighting then clear and reprint grid", function(){
    Game.start();
    spyOn(Game, "highlightRow");
    spyOn(Game, "highlightColumn");
    spyOn(Game, "clear");
    spyOn(Game, "printGrid");
    spyOn(InputController, "ask");
    spyOn(Game, "unHighlightRow");
    spyOn(Game, "unHighlightColumn");
    
    InputController.emit("coordinates", "5 6");

    expect(Game.highlightRow).toHaveBeenCalledWith("5");
    expect(Game.highlightColumn).toHaveBeenCalledWith("6");
    expect(Game.clear).toHaveBeenCalled();
    expect(Game.printGrid).toHaveBeenCalled();
    expect(InputController.ask).toHaveBeenCalled();
    expect(Game.unHighlightRow).toHaveBeenCalledWith("5");
    expect(Game.unHighlightColumn).toHaveBeenCalledWith("6");
  });

  it("should mark a whole column as highlighted", function(){
    Game.start();
    spyOn(Game.grid[0][4], "highlight");
    spyOn(Game.grid[19][4], "highlight");

    Game.highlightColumn(5);

    expect(Game.grid[0][4].highlight).toHaveBeenCalled();
    expect(Game.grid[19][4].highlight).toHaveBeenCalled();
  });

  it("should send a cluster mark on enter if both coordinates are pesent", function(){ 
    Game.start();
    spyOn(Game, "mark");

    InputController.emit("coordinates", "1 2");
    InputController.emit("enter");

    expect(Game.mark).toHaveBeenCalledWith("1", "2");
  });

  it("should NOT send a cluster mark on enter if both coordinates are not pesent", function(){ 
    Game.start();
    spyOn(Game, "mark");

    InputController.emit("coordinates", "1 ");
    InputController.emit("enter");

    expect(Game.mark).not.toHaveBeenCalled();
  });
});

