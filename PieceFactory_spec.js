'use strict'

var PieceFactory = require("./PieceFactory");

describe("PieceFactory", function(){

  it("should return a factory based on a seed", function(){
    var piece = PieceFactory.create(0);
    
    expect(piece.type()).toBe("red");
    expect(piece.points()).toBe(10);
  });
});
