'use strict';

var candy = require('./candy');

describe('candy kata', function(){
  it('should return a 3x3 as a string', function(){
    var row = ["*", "*", "*"];
    var inputGrid = [row, row, row];

    var actual = candy.renderGrid(inputGrid);
    var expected = "* * *\n* * *\n* * *";

    expect(actual).toBe(expected);
  });

  it('should generate a 3x3 multidimensional array', function(){

    var randomizer = {
      counter: 0,
      map: [0, 0, 0, 0, 0, 1, 2, 0, 3],
      rand: function() {
        var result = this.map[this.counter];
        this.counter++;
        return result;
      }
    };

    candy.randomizer = randomizer;

    var actual = candy.generateGrid(3);
    expect(actual.length).toBe(3);
    expect(actual[0].length).toBe(3);

    expect(actual[0][1]).toBe('$');
    expect(actual[1][2]).toBe('@');
    expect(actual[2][0]).toBe('#');
    expect(actual[2][2]).toBe('+');
  });
});

