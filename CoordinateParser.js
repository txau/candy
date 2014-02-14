'use strict';

var CoordinateParser = {
  parse: function(userInput, max) {
    max = max || 1000;
    userInput = this.trim(userInput);

    var x, y;

    if(userInput.length > 0) {
      var matches = userInput.match(/^(\d+)(\s)?(\d+)?/i);

      x = this.cleanseCoordinate(matches[1], max);
      y = this.cleanseCoordinate(matches[3], max);
    }

    return {x: x, y: y};
  },

  cleanseCoordinate: function(coord, max) {
    return (coord <= max && (coord > 0) ) ? coord : undefined;
  },

  trim: function(str) {
      return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
  }
};

module.exports = CoordinateParser;
