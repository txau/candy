//'use strict'

var PieceRenderer = {

  colors: {
    yellow: '\033[0;33m',
    white: '\033[0m'
  },

  equivalences: {
    red: '#',
    blue: "%",
    green: "&",
    yellow: "Ç"
  },

  render: function(piece) {
    return this.equivalences[piece.type()];
  } 

};

module.exports = PieceRenderer;
