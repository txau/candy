'use strict';

var board = require("./Board");
var renderer = require("./Renderer");
var game = require('./Game');

describe('Game', function(){

  it("should render a random board when run", function(){
    spyOn(board, "generate").andReturn("hello!");
    spyOn(renderer, "render").andReturn("I'm game!");

    var output = game.run();

    expect(board.generate).toHaveBeenCalled();
    expect(renderer.render).toHaveBeenCalledWith("hello!");
    expect(output).toBe("I'm game!");
  });

});

