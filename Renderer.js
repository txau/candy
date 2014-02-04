'use strict'

var PieceRenderer = require("./PieceRenderer");

var Renderer = {

  render: function(grid) {
    
    var result = "\n";
    var rows = [];

    grid.forEach(function(row) {
      var rowRender = [];
      row.forEach(function(piece) {
        rowRender.push(PieceRenderer.render(piece)); 
      });

      rows.push(rowRender.join("  "));
      
    });

    result += rows.join("\n");
    result += "\n\n";

    return result;
  }
};

module.exports = Renderer;

