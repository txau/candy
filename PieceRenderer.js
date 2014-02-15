'use strict'

var PieceRenderer = {

  colors: {
    //white: '\u001b[0',
    yellow: '\u001b[0;33',
    red: '\u001b[0;31',
    blue: '\u001b[0;34',
    green: '\u001b[0;32'
  },

  greyHighlight: ';48;5;240',

  equivalences: {
    red: '♥',
    blue: "♣",
    green: "♠",
    yellow: "♦"
  },

  codeCloser: "m",

  render: function(piece) {
    var result = this.colors[piece.type()];

    if(piece.highlighted())
      result += this.greyHighlight;
    
    result += this.codeCloser
            + this.equivalences[piece.type()];

    return result;
  }
};

module.exports = PieceRenderer;
