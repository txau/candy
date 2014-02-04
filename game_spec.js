'use strict';

var Board = require("./Board");
var Renderer = require("./Renderer");
var Game = require('./Game');

describe('Game', function(){

  it("should render a random board when run", function(){
    spyOn(Board, "generate").andReturn("hello!");
    spyOn(Renderer, "render").andReturn("I'm game!");

    var output = Game.run();

    expect(Board.generate).toHaveBeenCalled();
    expect(Renderer.render).toHaveBeenCalledWith("hello!");
    expect(output).toBe("I'm game!");
  });

});

