'use strict'

var PieceRenderer = require("./PieceRenderer");

var Renderer = {

  render: function(grid) {
    var result = [];

    grid.forEach(function(row) {
      var rowRender = [];
      row.forEach(function(piece) {
        rowRender.push(PieceRenderer.render(piece)); 
      });

      result.push(rowRender.join(" "));
      
    });

    return result.join("\n");
  }
};

module.exports = Renderer;

