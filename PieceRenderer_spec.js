'use strcit'

var Piece = require("./Piece");
var PieceRenderer = require("./PieceRenderer");

describe("PieceRenderer", function(){
  it("should render a symbol", function(){
    var piece = new Piece("red");
    
    var output = PieceRenderer.render(piece);

    expect(output).toBe("#");
  });
});
