'use strict';

var Piece = require("./Piece");
var Scoring = require("./Scoring");

describe("Scoring", function(){

  it("should not multiply for 1 piece", function(){
    var piece = new Piece();
    piece.points(10);
    var currentRound = [piece];

    var roundPoints = Scoring.foreseePoints(currentRound);

    expect(roundPoints).toBe(10);
  });

  it("should multiply by 1.2 for 2 to 3 pieces", function(){
    var piece = new Piece();
    piece.points(10);
    var currentRound = [piece, piece];

    var roundPoints = Scoring.foreseePoints(currentRound);

    expect(roundPoints).toBe(24);
  });

 it("should multiply by 1.4 for 4 to 5 pieces", function(){
    var piece = new Piece();
    piece.points(10);
    var currentRound = [piece, piece, piece, piece, piece];

    var roundPoints = Scoring.foreseePoints(currentRound);

    expect(roundPoints).toBe(70);
  });
 
  it("should multiply by 1.6 for 6 to 7", function(){
    var piece = new Piece();
    piece.points(10);
    var currentRound = [piece, piece, piece, piece, piece, piece];

    var roundPoints = Scoring.foreseePoints(currentRound);

    expect(roundPoints).toBe(96);
  });

 it("should multiply by 1.8 for 8 to 9", function(){
    var piece = new Piece();
    piece.points(10);
    var currentRound = [piece, piece, piece, piece, piece, piece, piece, piece];

    var roundPoints = Scoring.foreseePoints(currentRound);

    expect(roundPoints).toBe(144);
  });

  it("should multiply by 2 for 10 or more", function(){
    var piece = new Piece();
    piece.points(10);
    var currentRound = [piece, piece, piece, piece, 
                        piece, piece, piece, piece,
                        piece, piece, piece];

    var roundPoints = Scoring.foreseePoints(currentRound);

    expect(roundPoints).toBe(220);
  });
});
