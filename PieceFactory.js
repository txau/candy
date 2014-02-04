'use strict'

var Randomizer = require("./Randomizer");
var Piece = require("./Piece");

var PieceFactory = {

  candyConfig: [
    {type: "red"},
    {type: "blue"},
    {type: "green"},
    {type: "yellow"}
  ],

  create: function(seed) {
    if(seed == undefined) seed = Randomizer.rand();

    var piece = new Piece();
    piece.config(this.candyConfig[seed]);

    return piece;
  }
};

module.exports = PieceFactory;
