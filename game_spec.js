'use strict';

var Board = require("./Board");
var Renderer = require("./Renderer");
var Game = require('./Game');

var EventEmitter = require('events').EventEmitter;
var InputController = require("./InputController");

describe('Game', function(){

  var stdin, stdout;

  beforeEach(function(){
    stdin = new EventEmitter();
    stdin.setRawMode = function(){};
    stdin.pause = function(){};
    Game.stdin = stdin;
    
    stdout = new EventEmitter();
    stdout.write = function(data){};
    Game.stdout = stdout;
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

  it("should give controll to input controller", function() {
    spyOn(InputController, "start");

    Game.start();

    expect(InputController.start).toHaveBeenCalled(); 
  });
});

