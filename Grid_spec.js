'use strcit';

var Grid = require("./Grid");
var Board = require("./Board");
var Piece = require("./Piece");

describe('Grid highlighting', function(){

  var grid;

  beforeEach(function() {
    grid = Grid();
    grid.load(Board.generate(20));
  });

  it("should generate row and column info on load", function(){
    grid.load(Board.generate(3));

    expect(grid.getRowInfo(1).highlighted).toBe(false);
  });

  it("should un-highlight a whole column", function(){
    spyOn(grid.pieces[0][4], "unHighlight");
    spyOn(grid.pieces[19][4], "unHighlight");

    grid.unHighlightColumn(5);

    expect(grid.pieces[0][4].unHighlight).toHaveBeenCalled();
    expect(grid.pieces[19][4].unHighlight).toHaveBeenCalled();
  });
  
  it("should highlight a whole column", function(){
    spyOn(grid.pieces[0][4], "highlight");
    spyOn(grid.pieces[19][4], "highlight");

    grid.highlightColumn(5);

    expect(grid.pieces[0][4].highlight).toHaveBeenCalled();
    expect(grid.pieces[19][4].highlight).toHaveBeenCalled();
  });

  it("should highlight a whole row", function(){
    spyOn(grid.pieces[4][0], "unHighlight");
    spyOn(grid.pieces[4][19], "unHighlight");

    grid.highlightRow(5);
    grid.unHighlightRow(5);

    expect(grid.pieces[4][0].unHighlight).toHaveBeenCalled();
    expect(grid.pieces[4][19].unHighlight).toHaveBeenCalled();
    expect(grid.getRowInfo(5).highlighted).toBe(false);
  });

  it("should highlight a whole row", function(){
    spyOn(grid.pieces[4][0], "highlight");
    spyOn(grid.pieces[4][19], "highlight");

    grid.highlightRow(5);

    expect(grid.pieces[4][0].highlight).toHaveBeenCalled();
    expect(grid.pieces[4][19].highlight).toHaveBeenCalled();
    expect(grid.getRowInfo(5).highlighted).toBe(true);
  });

});

describe('Grid marking', function(){
  var testPieces;
  var grid;

  beforeEach(function() {
    grid = Grid();
    grid.markedPieces = [];
    
    testPieces = [
      [new Piece("red"), new Piece("green"), new Piece("green"), new Piece("green")],
      [new Piece("green"), new Piece("red"), new Piece("red"), new Piece("green")],
      [new Piece("green"), new Piece("red"), new Piece("red"), new Piece("green")],
      [new Piece("green"), new Piece("green"), new Piece("green"), new Piece("red")],
    ];
    
    grid.load(testPieces);
  });
  
  it("should mark and spread in all 8 directions recursively", function() {
    grid.mark(2, 2);

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
    grid.mark(1, 1);

    grid.unmark();

    testPieces.forEach(function(row) {
      row.forEach(function(piece) {
          expect(piece.marked()).toBe(false);
      })
    });

    expect(grid.markedPieces.length).toBe(0);
  });

  it("should return a collection of all marked pieces", function(){
    grid.mark(1, 1);

    var markedPieces = grid.getMarkedPieces();

    expect(markedPieces.length).toBe(6);
  });

  it("should destroy marked pieces", function(){
    grid.mark(1, 1);

    grid.destroyMarked();

    expect(testPieces[0][0]).toBe(undefined);
    expect(testPieces[0][1].type()).toBe("green");
    
    //expect(testPieces[1][0]).toBe(undefined);
    //expect(testPieces[1][1]).toBe(undefined);
    //expect(testPieces[1][1].type()).toBe("green");
    //expect(testPieces[1][1].type()).toBe("green");
  });
});
