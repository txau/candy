'use strict'

var Randomizer = require("./Randomizer");
var Piece = require("./Piece");

var PieceFactory = {

  pieceConfig: [
    {type: "red", points: 10},
    {type: "blue", points: 20},
    {type: "green", points: 30},
    {type: "yellow", points: 40}
  ],

  create: function(seed) {
    if(seed == undefined) seed = Randomizer.rand();

    var piece = new Piece();
    piece.config(this.pieceConfig[seed]);

    return piece;
  }
};

module.exports = PieceFactory;
