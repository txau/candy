'use strict'

var Piece = require('./Piece');

describe('Piece', function() {

  it("should initialize with a type", function() {
    var piece = new Piece("red");
    expect(piece.type()).toBe("red");
  });

  it("should set and get type", function() {
    var piece = new Piece();
    piece.type("red");

    expect(piece.type()).toBe("red");
  });

  it("should accept a config", function(){
    var piece = new Piece();

    var config = {
      type: "red"
    }
    piece.config(config);

    expect(piece.type()).toBe("red");
  });

});


