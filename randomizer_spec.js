'use strict'

var Randomizer = require("./Randomizer");

describe('Randomizer', function() {

  it("should return a random number between 0 and 3", function() {
    var generatedRandom = Randomizer.rand();

    var randomIsInRange = (generatedRandom >= 0 && generatedRandom <= 3);

    expect(randomIsInRange).toBe(true);
  });

});

