'use strict';

var Board = require("./Board");
var Renderer = require("./Renderer");
var Game = require('./Game');

describe('Game', function(){

  it("should print a grid in output buffer", function(){
    spyOn(process.stdout, "write");
    spyOn(Board, "generate").andReturn("hello!");
    spyOn(Renderer, "render").andReturn("I'm game!");

    Game.printGrid();

    expect(process.stdout.write).toHaveBeenCalledWith("I'm game!");
  });

  it("should print a clear sequence", function() {
    spyOn(Renderer, "clear").andReturn("hello!");
    spyOn(process.stdout, "write");

    Game.clear();

    expect(process.stdout.write).toHaveBeenCalledWith("hello!");
  });

  it("should prompt for user input", function() {
    var stdout = process.stdout;
    var stdin = process.stdin;
    
    spyOn(stdout, "write");

    Game.ask();
    
    expect(stdout.write).toHaveBeenCalledWith("Enter coordinates >");
    
    spyOn(Game, "guessCoordinates");
    var input = new Buffer("m");
    
    stdin.emit("data", input);

    expect(Game.guessCoordinates).toHaveBeenCalledWith("m");

    stdout.write.andCallThrough();
    spyOn(stdin, "pause");
  
    stdin.emit("data", new Buffer("\x03"));
    
    expect(stdin.pause).toHaveBeenCalled();
    
    stdin.pause.andCallThrough();
    stdin.setRawMode(false);
    stdin.pause();
  });
});

