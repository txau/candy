'use strict'

var Randomizer_stub = {
  counter: 0,
  sequence: [0],
  rand: function() {
    var result = this.sequence[this.counter];
    this.counter++;
    return result;
  }
}

module.exports = Randomizer_stub;
