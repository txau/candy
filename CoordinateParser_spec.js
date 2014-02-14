'use strict'

var CoordinateParser = require("./CoordinateParser");

describe("Coordinate parser", function(){

  it("should understand a single digit", function(){
    var result = CoordinateParser.parse("1");

    expect(result.x).toBe("1");
    expect(result.y).toBe(undefined);
  });

  it("should understand two single digits", function(){
    var result = CoordinateParser.parse("2 3");

    expect(result.x).toBe("2");
    expect(result.y).toBe("3");
  });

  it("should understand more than one digit", function(){
    var result = CoordinateParser.parse("202 389");

    expect(result.x).toBe("202");
    expect(result.y).toBe("389");
  });

  it("should accept a max limit coordinates based on a boundary", function(){
    var result = CoordinateParser.parse("20 21", 20);
    
    expect(result.x).toBe("20");
    expect(result.y).toBe(undefined);
  });

  it("should fix zero to undefined", function(){
    var result = CoordinateParser.parse("0 0");
    
    expect(result.x).toBe(undefined);
    expect(result.y).toBe(undefined);
  });

  it("should not break on empty space input", function(){
    var result = CoordinateParser.parse("");
    
    expect(result.x).toBe(undefined);
    expect(result.y).toBe(undefined);
  });
});
