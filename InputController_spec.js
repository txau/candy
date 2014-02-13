'use strict';

var InputController = require("./InputController");
var EventEmitter = require('events').EventEmitter;

describe('InputController', function(){

  var stdin, stdout;

  beforeEach(function(){
    stdin = new EventEmitter();

    stdin.setRawMode = function(){};
    stdin.pause = function(){};
    
    InputController.stdin = stdin;
    
    stdout = new EventEmitter();
    stdout.write = function(data){};
    
    InputController.stdout = stdout;
  });

  it("should prompt for user input", function() {
    spyOn(stdout, "write");
    InputController.ask();
    
    expect(stdout.write).toHaveBeenCalledWith("Enter coordinates > ");
  });

  it("should pipe input to output", function() {
    spyOn(stdout, "write");
    InputController.read();

    var input = new Buffer("hola");
    stdin.emit("data", input);

    expect(stdout.write).toHaveBeenCalledWith(input);
  });

  it("should pause stdin on ctrl-c", function() {
    spyOn(stdin, "pause");
    InputController.read();
  
    stdin.emit("data", new Buffer("\x03"));
    
    expect(stdin.pause).toHaveBeenCalled();
  });

  it("should intercept up arrow", function(){
    InputController.read();
    spyOn(stdout, "write");

    var upArrow = new Buffer([27, 91, 65]);
    stdin.emit("data", upArrow);

    expect(stdout.write).not.toHaveBeenCalled();
  });

  it("should pipe backspace", function() {
    InputController.read();
    spyOn(stdout, "write");

    var backspace = new Buffer([127]);
    stdin.emit("data", backspace);

    var actual = stdout.write.mostRecentCall.args[0].toJSON().toString();
    var expected = new Buffer([8,32,8]).toJSON().toString();
    expect(actual).toBe(expected);

  });

  it("should take control on input", function() {
    spyOn(InputController, "read");
    spyOn(InputController, "ask");
  
    InputController.start();

    expect(InputController.ask).toHaveBeenCalled();
    expect(InputController.read).toHaveBeenCalled();
  });
});

