'use strict';

var Board = require("./Board");
var Renderer = require("./Renderer");
var Game = require('./Game');

var EventEmitter = require('events').EventEmitter;
var InputController = require("./InputController");
var CoordinateParser = require("./CoordinateParser");
var Grid = require("./Grid");

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
  
  it("should wire input coordinates to highlighting then clear and reprint grid", function(){
    Game.start();
    spyOn(Grid, "highlightRow");
    spyOn(Grid, "highlightColumn");
    spyOn(Game, "clear");
    spyOn(Game, "printGrid");
    spyOn(InputController, "ask");
    spyOn(Grid, "unHighlightRow");
    spyOn(Grid, "unHighlightColumn");
    
    InputController.emit("coordinates", "5 6");

    expect(Grid.highlightRow).toHaveBeenCalledWith("5");
    expect(Grid.highlightColumn).toHaveBeenCalledWith("6");
    expect(Game.clear).toHaveBeenCalled();
    expect(Game.printGrid).toHaveBeenCalled();
    expect(InputController.ask).toHaveBeenCalled();
    expect(Grid.unHighlightRow).toHaveBeenCalledWith("5");
    expect(Grid.unHighlightColumn).toHaveBeenCalledWith("6");
  });

  it("should not highlight if input is locked", function(){
    Game.start();
    spyOn(Grid, "highlightRow");
    spyOn(Grid, "highlightColumn");
    Game.locked = true;

    InputController.emit("coordinates", "5 6");

    expect(Grid.highlightRow).not.toHaveBeenCalled();
    expect(Grid.highlightColumn).not.toHaveBeenCalled();
  });

  it("should send a cluster mark lock input on enter if both coordinates are pesent", function(){ 
    Game.start();
    spyOn(Grid, "mark");

    InputController.emit("coordinates", "1 2");
    InputController.emit("enter");

    expect(Grid.mark).toHaveBeenCalledWith("1", "2");
    expect(Game.locked).toBe(true);
  });

  it("should NOT send a cluster mark on enter if both coordinates are not pesent", function(){ 
    Game.start();
    spyOn(Grid, "mark");

    InputController.emit("coordinates", "1 ");
    InputController.emit("enter");

    expect(Grid.mark).not.toHaveBeenCalled();
  });

  it("should unlock if delete and unmark pieces", function(){
    Game.start();
    Game.locked = true;
    spyOn(Grid, "unmark");

    InputController.emit("delete");

    expect(Game.locked).toBe(false);
    expect(Grid.unmark).toHaveBeenCalled();
  });
});

