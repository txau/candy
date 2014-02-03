'use strict'

var Randomizer = function() {
  return {
    rand: function() {
      return Math.floor(Math.random()*4);
    }
  }
};

module.exports = Randomizer;
