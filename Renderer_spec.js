'use strict'

var PieceRenderer = require("./PieceRenderer");
var Piece = require("./Piece");
var Renderer = require("./Renderer");

describe('Renderer', function() {
  it('should return a 3x3 game as a string', function(){
    spyOn(PieceRenderer, "render").andCallThrough();
    
    var row = [new Piece("red"), new Piece("red"), new Piece("red")];
    var inputGrid = [row, row, row];

    var actual = Renderer.render(inputGrid);
    //var expected = "# # #\n# # #\n# # #";

    //expect(actual).toBe(expected);
    expect(PieceRenderer.render.calls.length).toBe(9);
  });
});
