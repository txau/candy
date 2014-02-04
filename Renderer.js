'use strict'

var PieceRenderer = require("./PieceRenderer");

var Renderer = {

  render: function(grid) {
    
    var result = "\n";
    var rows = [];

    var lineCounter = 1;
    grid.forEach(function(row) {
      rows.push(renderRow(row, lineCounter));
      lineCounter++;
    });

    result += rows.join("\n");
    result += "\n\n";

    return result;
  }
};

var renderRow = function(row, lineNumber) {
  var rowRender = [];

  row.forEach(function(piece) {
    rowRender.push(PieceRenderer.render(piece)); 
  });

  return padNumber(lineNumber) + " " + rowRender.join("  ");
}

var padNumber = function(number) {
  var result = String("  " + number).slice(-2);

  return result;
}

module.exports = Renderer;

