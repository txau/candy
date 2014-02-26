'use strict';

var Grid = function() {
  return {
    pieces: [],
    markedPieces: [],
    rowInfo: [],

    load: function(pieces) {
      this.pieces = pieces;
      this.markedPieces = [];
      this.rowInfo = [];

      for(var i = 1; i <= pieces.length; i++) {
        this.rowInfo[i] = {highlighted: false};
      }
    },

    getRowInfo: function(index) {
      return this.rowInfo[index];
    },

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
        if(this.pieceExists(row, columnNumber))
          this.pieces[row][columnNumber][action]();
      }
    },

    highlightRow: function(rowNumber) {
      this.cycleRow(rowNumber, "highlight");
      this.rowInfo[rowNumber].highlighted = true;
    },

    unHighlightRow: function(rowNumber) {
      this.cycleRow(rowNumber, "unHighlight");
      this.rowInfo[rowNumber].highlighted = false;
    },

    cycleRow: function(rowNumber, action) {
      if(rowNumber > this.pieces.length)
        return false;

      rowNumber -= 1;
      for(var piece = 0; piece < this.pieces.length; piece++) {
        if(this.pieceExists(rowNumber, piece))
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
      if(!this.pieceExists(x, y)) return false;

      var piece = this.pieces[x][y];
      if( piece.type() == type && !piece.marked()) {
        piece.mark();
        this.markedPieces.push(piece);
        this.attemptMark(x, y, type);
      }
    },

    pieceExists: function(x, y) {
      return (this.pieces[x] !== undefined && this.pieces[x][y] !== undefined);
    },

    unmark: function() {
      for(var row = 0; row < this.pieces.length; row++) {
        for(var column = 0; column < this.pieces.length; column++) {
          this.pieces[row][column].unmark();
        }
      }
      this.markedPieces = [];
    },

    getMarkedPieces: function() {
      return this.markedPieces; 
    },

    destroyMarked: function() {
      for(var row = 0; row < this.pieces.length; row++) {
        for(var column = 0; column < this.pieces.length; column++) {
          if(this.pieceExists(row, column) && this.pieces[row][column].marked()) 
            this.pieces[row][column] = undefined;
        }
      }

      this.rearrangeColumns();
    },

    rearrangeColumns: function() {

      //for(var column = 0; column < this.pieces.length; column++) {
      //var remainingPieces = [];

      //for(var row = 0; row < this.pieces.length; row++) {
      //if(this.pieces[row][column] !== undefined) {
      //remainingPieces.push(this.pieces[row][column]);
      //this.pieces[row][column] = undefined;
      //}
      //}

      //for(var i = this.pieces.length; i >= remainingPieces.length; i--) {
      //this.pieces[i][column] = remainingPieces.pop();
      //}
      //}

    }
  }
};

module.exports = Grid;
