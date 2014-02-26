'use strict';

var EventEmitter = require('events').EventEmitter;

var something = function() {

  var InputController = new EventEmitter;

  InputController.stdin = process.stdin;

  InputController.stdout = process.stdout;

  InputController.specialChars = {
    backspace: "127",
    controlC: "3",
    deleteSequence: [8, 32, 8],
    enter: "13"
  };

  InputController.allowedChars = ["48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "32"];

  InputController.currentInput = "";

  InputController.ask = function() {
    this.stdout.write("Enter coordinates > " + this.currentInput);
  };

  InputController.read = function() {
    this.stdin.setRawMode(true);
    this.currentInput = "";

    this.stdin.on("data", function(keystroke) {
      var keyString = keystroke.toJSON().toString();

      this.catchControlC(keyString);

      if(this.allowedChars.indexOf(keyString) != -1
         && !InputController._lock)
       this.currentInput += keystroke.toString();

       if(keyString == this.specialChars.backspace) {
         this.currentInput = this.currentInput.slice(0, -1);
         this.emit("delete");
       }

       if(keyString == this.specialChars.enter)
         this.emit("enter");

       this.emit("coordinates", this.currentInput);
    }.bind(this));
  };

  InputController.catchControlC = function(keyString) {
    if(keyString == this.specialChars.controlC)
      this.stdin.pause();
  };

  InputController._lock = false;
  InputController.lock = function() {
    InputController._lock = true;
  };

  InputController.unlock = function() {
    InputController._lock = false;
  };

  return InputController;
}

module.exports = something;
