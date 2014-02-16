'use strcit';

var Grid = require("./Grid");
var Board = require("./Board");
var Piece = require("./Piece");

describe('Grid', function(){
  var testPieces;

  beforeEach(function(){
    Grid.pieces = Board.generate(20);
    
    testPieces = [
      [new Piece("red"), new Piece("green"), new Piece("green"), new Piece("green")],
      [new Piece("green"), new Piece("red"), new Piece("red"), new Piece("green")],
      [new Piece("green"), new Piece("red"), new Piece("red"), new Piece("green")],
      [new Piece("green"), new Piece("green"), new Piece("green"), new Piece("red")],
    ];
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

  it("should unmark a whole grid row as highlighted", function(){
    spyOn(Grid.pieces[2][0], "unHighlight");

    Grid.unHighlightRow(3);

    expect(Grid.pieces[2][0].unHighlight).toHaveBeenCalled();
  });

  it("should mark a whole grid row as highlighted", function(){
    spyOn(Grid.pieces[2][0], "highlight");

    Grid.highlightRow(3);

    expect(Grid.pieces[2][0].highlight).toHaveBeenCalled();
  });

  it("should avoid un/highlight beyond grid size", function(){
    spyOn(Grid.pieces[2][0], "highlight");
    spyOn(Grid.pieces[2][0], "unHighlight");

    Grid.highlightRow(30);

    expect(Grid.pieces[2][0].highlight).not.toHaveBeenCalled();
    expect(Grid.pieces[2][0].unHighlight).not.toHaveBeenCalled();
  });

  it("should mark and spread in all 8 directions", function() {
    Grid.pieces = testPieces;
    Grid.mark(2, 2);

    expect(testPieces[1][1].marked()).toBe(true);
    expect(testPieces[1][2].marked()).toBe(true);
    expect(testPieces[2][2].marked()).toBe(true);
    expect(testPieces[2][1].marked()).toBe(true);
    expect(testPieces[0][0].marked()).toBe(true);
    expect(testPieces[0][1].marked()).toBe(false);
  });

  it("should not try to mark outside array boundaries", function() {
    Grid.pieces = testPieces;
    Grid.mark(1, 1);

    expect(testPieces[0][0].marked()).toBe(true);
  });

  it("should propagate mark recursively across the grid", function() {
    Grid.pieces = testPieces;
    Grid.mark(1, 1);

    expect(testPieces[3][3].marked()).toBe(true);
  });
});
