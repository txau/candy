'use strict'

var PieceRenderer = {

  colors: {
    yellow: '\u001b[0;33m',
    white: '\u001b[0m',
    red: '\u001b[0;31m',
    blue: '\u001b[0;34m',
    green: '\u001b[0;32m'
  },

  equivalences: {
    red: '#',
    blue: "@",
    green: "€",
    yellow: "Ç"
  },

  render: function(piece) {
    var result = "";
    result += this.colors[piece.type()];
    result += this.equivalences[piece.type()];
    result += this.colors["white"];

    return result;
  } 

};

module.exports = PieceRenderer;
