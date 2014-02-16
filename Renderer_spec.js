'use strict'

var PieceRenderer = require("./PieceRenderer");
var Piece = require("./Piece");
var Renderer = require("./Renderer");

describe('Renderer', function() {
  it('should return a 3x3 game as a string', function(){
    spyOn(PieceRenderer, "render").andReturn("# ");
    
    var row = [new Piece("red"), new Piece("red"), new Piece("red")];
    var inputGrid = [row, row, row];
    Renderer.normalCode = "normalCode";

    var expected =  "\n";
    expected +=     "  1 #  #  # normalCode\n";
    expected +=     "  2 #  #  # normalCode\n";
    expected +=     "  3 #  #  # normalCode";
    expected +=   "\n    1  2  3 ";
    expected +=     "\n\n";

    var actual = Renderer.render(inputGrid);
    
    expect(actual).toBe(expected);
    expect(PieceRenderer.render.calls.length).toBe(9);
  });

  it("should return a clear screen sequence", function() {
    var result = Renderer.clear();
    expect(result).toBe('\u001b[2J\u001b[0;0f');
  });

  it("should return a highlighted row", function(){
    spyOn(PieceRenderer, "render").andReturn("# ");
    Renderer.highlightCode = "highlight";
    Renderer.normalCode = "normalCode";

    var row = [new Piece("red"), new Piece("red"), new Piece("red")];
    row[0].highlight();
    row[1].highlight();
    var inputGrid = [row];
    
    var expected = "  1 # highlight # highlight # highlightnormalCode";

    var actual = Renderer.renderRow(row, 1);

    expect(actual).toBe(expected);
  });
});
