'use strict';

var CoordinateParser = {
  parse: function(userInput) {
    var matches = userInput.match(/^(\d+)(\s)?(\d+)?/i);
    //console.log(matches);

    return {x: matches[1], y: matches[3]};
  }
};

module.exports = CoordinateParser;
