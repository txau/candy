'use strict'

var Board = require("./Board");

describe("Board", function(){
  it('should generate a 3x3 board with random pieces', function(){
    var board = Board.generate(3);
    expect(board.length).toBe(3);
    expect(board[0].length).toBe(3);
    expect(typeof board[0][0].type()).toBe("string");
  });
});
