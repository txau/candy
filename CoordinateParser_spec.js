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
    var result = CoordinateParser.parse("2012 21909");

    expect(result.x).toBe("2012");
    expect(result.y).toBe("21909");
  });
});
