'use strict';

var CoordinateParser = {
  parse: function(userInput, max) {
    max = max || 1000;

    var matches = userInput.match(/^(\d+)(\s)?(\d+)?/i);

    var x = this.cleanseCoordinate(matches[1], max);
    var y = this.cleanseCoordinate(matches[3], max);

    return {x: x, y: y};
  },

  cleanseCoordinate: function(coord, max) {
    return (coord <= max && (coord > 0) ) ? coord : undefined;
  }
};

module.exports = CoordinateParser;
