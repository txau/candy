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

};

module.exports = Grid;
