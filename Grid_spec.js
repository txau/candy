'use strcit';

var Grid = require("./Grid");
var Board = require("./Board");
var Piece = require("./Piece");

describe('Grid highlighting', function(){
  var testPieces;

  beforeEach(function() {
    Grid.pieces = Board.generate(20);
  });

  it("should unmark a whole column as highlighted", function(){
    spyOn(Grid.pieces[0][4], "unHighlight");
    spyOn(Grid.pieces[19][4], "unHighlight");

    Grid.unHighlightColumn(5);

    expect(Grid.pieces[0][4].unHighlight).toHaveBeenCalled();
    expect(Grid.pieces[19][4].unHighlight).toHaveBeenCalled();
  });
  
  it("should mark a whole column as highlighted", function(){
    spyOn(Grid.pieces[0][4], "highlight");
    spyOn(Grid.pieces[19][4], "highlight");

    Grid.highlightColumn(5);

    expect(Grid.pieces[0][4].highlight).toHaveBeenCalled();
    expect(Grid.pieces[19][4].highlight).toHaveBeenCalled();
  });
});

describe('Grid marking', function(){
  var testPieces;

  beforeEach(function() {
    Grid.markedPieces = [];
    
    testPieces = [
      [new Piece("red"), new Piece("green"), new Piece("green"), new Piece("green")],
      [new Piece("green"), new Piece("red"), new Piece("red"), new Piece("green")],
      [new Piece("green"), new Piece("red"), new Piece("red"), new Piece("green")],
      [new Piece("green"), new Piece("green"), new Piece("green"), new Piece("red")],
    ];
    
    Grid.pieces = testPieces;
  });
  
  it("should mark and spread in all 8 directions recursively", function() {
    Grid.mark(2, 2);

    testPieces.forEach(function(row) {
      row.forEach(function(piece) {
        if(piece.type() == "red")
          expect(piece.marked()).toBe(true);
        else
          expect(piece.marked()).toBe(false);
      })
    });
  });

  it("should unmark all pieces and reset markedPieces", function(){
    Grid.mark(1, 1);

    Grid.unmark();

    testPieces.forEach(function(row) {
      row.forEach(function(piece) {
          expect(piece.marked()).toBe(false);
      })
    });

    expect(Grid.markedPieces.length).toBe(0);
  });

  it("should return a collection of all marked pieces", function(){
    Grid.mark(1, 1);

    var markedPieces = Grid.getMarkedPieces();

    expect(markedPieces.length).toBe(6);
  });
});
