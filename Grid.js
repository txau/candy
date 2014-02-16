'use strict';

var Grid = {
  pieces: [],

  highlightColumn: function(columnNumber) {
    this.cycleColumn(columnNumber, "highlight");
  },

  unHighlightColumn: function(columnNumber) {
    this.cycleColumn(columnNumber, "unHighlight");
  },

  cycleColumn: function(columnNumber, action) {
    if(columnNumber > this.pieces.length)
      return false;

    columnNumber -= 1;
    for(var row = 0; row < this.pieces.length; row++) {
      this.pieces[row][columnNumber][action]();
    }
  },

  highlightRow: function(rowNumber) {
    this.cycleRow(rowNumber, "highlight");
  },

  unHighlightRow: function(rowNumber) {
    this.cycleRow(rowNumber, "unHighlight");
  },

  cycleRow: function(rowNumber, action) {
    if(rowNumber > this.pieces.length)
      return false;

    rowNumber -= 1;
    for(var piece = 0; piece < this.pieces.length; piece++) {
      this.pieces[rowNumber][piece][action]();
    }
  },

  mark: function(x, y) {
    x -= 1; y -= 1;
    var type = this.pieces[x][y].type();
    this.attemptMark(x, y, type);
  },

  attemptMark: function(x, y, type) {
    if(!this.pieceExists(x, y)) return false;

    for(var row = x-1; row <= x+1; row++) {
      for(var column = y-1; column <= y+1; column++) {
         this.markSimilarPiece(row, column, type);
      }
    }
  },

  markSimilarPiece: function(x, y, type) {
    if( this.pieceExists(x, y) 
        && this.pieces[x][y].type() == type 
        && this.pieces[x][y].marked() === false) {
      this.pieces[x][y].mark();
      this.attemptMark(x, y, type);
    }
  },

  pieceExists: function(x, y) {
    return (this.pieces[x] !== undefined && this.pieces[x][y] !== undefined);
  }
};

module.exports = Grid;
