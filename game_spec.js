'use strict';

var game = require('./Game');
var Randomizer_stub = require('./Randomizer_stub');

describe('Game', function(){
  it('should return a 3x3 game as a string', function(){
    var row = ["*", "*", "*"];
    var inputGrid = [row, row, row];

    var actual = game.renderGrid(inputGrid);
    var expected = "* * *\n* * *\n* * *";

    expect(actual).toBe(expected);
  });

  it('should generate a 3x3 multidimensional array with random objects', function(){
    game.randomizer = Randomizer_stub;
    game.randomizer.sequence = [0, 0, 0, 0, 0, 1, 2, 0, 3];

    var actual = game.generateGrid(3);
    expect(actual.length).toBe(3);
    expect(actual[0].length).toBe(3);

    expect(actual[0][1].type()).toBe('red');
    expect(actual[1][2].type()).toBe('blue');
    expect(actual[2][0].type()).toBe('green');
    expect(actual[2][2].type()).toBe('yellow');
  });
});

