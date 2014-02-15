'use strict'

var PieceRenderer = require("./PieceRenderer");

var Renderer = {

  highlightCode: '\u001b[0;48;5;240m',
  normalCode: '\u001b[0m',

  render: function(grid) {
    
    var result = "\n";
    
    var rows = [];

    var lineCounter = 1;
    grid.forEach(function(row) {
      rows.push(renderRow(row, lineCounter));
      lineCounter++;
    });

    result += rows.join("\n");
    result += renderColumnNumbers(rows.length);
    result += "\n\n";

    return result;
  },

  clear: clear,
  renderRow: renderRow
};

function renderRow(row, lineNumber) {
  var renderedPieces = [];

  row.forEach(function(piece) {
    renderedPieces.push(PieceRenderer.render(piece)); 
  });

  var result = "" 
    + highlight(row[0])
    + padLineNumber(lineNumber) 
    + " " 
    + renderedPieces.join("  ")
    + " "
    + Renderer.normalCode;

  return result;
}

function highlight(firstPiece) { 
  if(firstPiece.highlighted() === true)
    return Renderer.highlightCode;
  return "";
};

var padLineNumber = function(number) {
  return String("   " + number).slice(-3);
}

var padColumnNumber = function(number) {
  if(number <= 9)
    return String(" " + number).slice(-2) + " ";

  return  String("  " + number).slice(-3); 
}

var renderColumnNumbers = function(max) {
  var result = "\n   ";

  var columnNumbers = [];
  for(var i = 1; i <= max; i++) {
    columnNumbers.push(padColumnNumber(i));
  }

  return result + columnNumbers.join("");
}

function clear() {
  return '\u001b[2J\u001b[0;0f'; 
}

module.exports = Renderer;

