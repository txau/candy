'use strict';

var Scoring = {

  multipliers: [1, 1.2, 1.4, 1.6, 1.8, 2], 

  foreseePoints: function(pieceCollection) {
    var points = 0, pieceCounter = 0;

    pieceCollection.forEach(function(piece) {
      points += piece.points();
      pieceCounter++;
    });

    var divideByTwo = (Math.floor(pieceCounter/2));
    var multiplier = (divideByTwo < 5) ? divideByTwo : 5;

    points = points * this.multipliers[multiplier];

    return points;
  }
};

module.exports = Scoring;
