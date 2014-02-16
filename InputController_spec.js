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

  it("should append current input to prompt", function() {
    spyOn(stdout, "write");
   
    InputController.currentInput = "hello";
    InputController.ask();
    
    expect(stdout.write).toHaveBeenCalledWith("Enter coordinates > hello");
  });

  it("should reset currentInput on start", function() {
    InputController.currentInput = "hey!";
    
    InputController.read();

    expect(InputController.currentInput).toBe("");
  });

  it("should pause stdin on ctrl-c", function() {
    spyOn(stdin, "pause");
    InputController.read();
  
    var controlC = new Buffer("\x03");
    sendChar(controlC);
    
    expect(stdin.pause).toHaveBeenCalled();
  });

  it("should delete one char on backspace and emit delete event", function() {
    InputController.read();
    InputController.currentInput = "123";
    spyOn(InputController, "emit");

    var backspace = new Buffer([127]);
    sendChar(backspace);

    expect(InputController.currentInput).toBe("12");
    expect(InputController.emit).toHaveBeenCalledWith("delete");
  });

  it("should keep an internal copy of current user input", function(){
    InputController.read(); 
    InputController._lock = false;

    sendStrokeSequence(["1", "2"]);

    expect(InputController.currentInput).toBe("12");
  });

  it("should emit on currentInput change", function(){
    InputController.read();
    var currentInput = false; 
    InputController.on("coordinates", function(data) {
      currentInput = data;
    }); 

    sendStrokeSequence(["1", "2"]);

    expect(currentInput).toBe("12"); 
  });

  it("should capture enter keystroke and emit enter event", function(){ 
    InputController.read();
    spyOn(InputController, "emit");

    var enter = new Buffer([13]);
    sendChar(enter);

    expect(InputController.emit).toHaveBeenCalledWith("enter");
  });

  it("should stop listening to coordinates if locked", function(){
    InputController.read();
    InputController.lock();
    InputController.currentInput = "";

    sendStrokeSequence(["1"]);

    expect(InputController.currentInput).toBe("");
  });

  it("should unlock listening to coordinates", function() {
    InputController._lock = true;

    InputController.unlock();

    expect(InputController._lock).toBe(false);
  });
});

