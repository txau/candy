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
      type: "red",
      points: 10
    }
    piece.config(config);

    expect(piece.type()).toBe("red");
    expect(piece.points()).toBe(10);
  });

  it("should allow highlighting", function(){
    var piece = new Piece();
    
    piece.highlight();
    
    expect(piece.highlighted()).toBe(true);

    piece.unHighlight();

    expect(piece.highlighted()).toBe(false);
  });

  it("should allow un/marking", function(){
    var piece = new Piece(); 

    piece.mark();

    expect(piece.marked()).toBe(true);

    piece.unmark();

    expect(piece.marked()).toBe(false);
  });

  it("Should set and get points", function(){
    var piece = new Piece();
    
    piece.points(10);

    expect(piece.points()).toBe(10);
  });
});


