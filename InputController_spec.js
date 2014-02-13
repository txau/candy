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
    InputController.currentInput = "";
  });

  function sendStrokeSequence(sequence) {
    sequence.forEach(function(character) {
      var input = new Buffer(character);
      sendChar(input);
    });
  }

  function sendChar(character) {
    stdin.emit("data", character); 
  }

  it("should prompt for user input", function() {
    spyOn(stdout, "write");
    
    InputController.ask();
    
    expect(stdout.write).toHaveBeenCalledWith("Enter coordinates > ");
  });

  it("should pipe input to output for allowed chars", function() {
    spyOn(stdout, "write");
    InputController.read();

    var input = new Buffer("1");
    sendChar(input);

    expect(stdout.write).toHaveBeenCalledWith(input);
  });

  it("should pause stdin on ctrl-c", function() {
    spyOn(stdin, "pause");
    InputController.read();
  
    var controlC = new Buffer("\x03");
    sendChar(controlC);
    
    expect(stdin.pause).toHaveBeenCalled();
  });

  it("should convert backspace to delete sequence", function() {
    InputController.read();
    spyOn(stdout, "write");

    sendStrokeSequence(["1", "2"]);
    var backspace = new Buffer([127]);
    sendChar(backspace);

    var actual = stdout.write.mostRecentCall.args[0].toJSON().toString();
    var expected = new Buffer([8,32,8]).toJSON().toString();
    expect(actual).toBe(expected);
  });

  it("should keep an internal copy of current user input", function(){
    InputController.read(); 

    sendStrokeSequence(["1", "2"]);

    expect(InputController.currentInput).toBe("12");
  });

  it("should not allow backspace beyond input boundaries", function(){
    InputController.read();

    sendStrokeSequence(["1", "2"]);
    var backspace = new Buffer([127]);
    sendChar(backspace);
    sendChar(backspace);

    spyOn(stdout, "write");
    sendChar(backspace);
    expect(stdout.write).toHaveBeenCalledWith("");
  });
});

