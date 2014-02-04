'use strict'

var PieceRenderer = require("./PieceRenderer");

var Renderer = {

  render: function(grid) {
    
    var result = '\u001b[2J\u001b[0;0f';
    result += "\n";
    
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
  }
};

var renderRow = function(row, lineNumber) {
  var rowRender = [];

  row.forEach(function(piece) {
    rowRender.push(PieceRenderer.render(piece)); 
  });

  return padLineNumber(lineNumber) + " " + rowRender.join("  ");
}

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

module.exports = Renderer;

