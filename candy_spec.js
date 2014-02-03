'use strict'

var Candy = require('./Candy');

describe('candy', function() {

  it("should initialize with a type", function() {
    var candy = new Candy("red");
    expect(candy.type()).toBe("red");
  });

  it("should set and get type", function() {
    var candy = new Candy();
    candy.type("red");

    expect(candy.type()).toBe("red");
  });

  it("should accept a config", function(){
    var candy = new Candy();

    var config = {
      type: "red"
    }
    candy.config(config);

    expect(candy.type()).toBe("red");
  });

});


