'use strcit'

var Piece = require("./Piece");
var PieceRenderer = require("./PieceRenderer");

describe("PieceRenderer", function(){
  it("should render a red piece", function(){
    var piece = new Piece("red");
    
    var output = PieceRenderer.render(piece);

    expect(output).toBe("\u001b[0;31m♥\u001b[0m");
  });

  it("should render a yellow piece", function(){
    var piece = new Piece("yellow");
    
    var output = PieceRenderer.render(piece);

    expect(output).toBe("\u001b[0;33m♦\u001b[0m");
  });

  it("should render a blue piece", function(){
    var piece = new Piece("blue");
    
    var output = PieceRenderer.render(piece);

    expect(output).toBe("\u001b[0;34m♣\u001b[0m");
  });

  it("should render a green piece", function(){
    var piece = new Piece("green");
    
    var output = PieceRenderer.render(piece);

    expect(output).toBe("\u001b[0;32m♠\u001b[0m");
  });

});
