'use strict';

var EventEmitter = require('events').EventEmitter;

var InputController = new EventEmitter;

InputController.stdin = process.stdin;

InputController.stdout = process.stdout;

InputController.specialChars = {
  backspace: "127",
  controlC: "3",
  deleteSequence: [8, 32, 8]
};

InputController.allowedChars = ["48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "32"];

InputController.currentInput = "";

InputController.ask = function() {
  this.stdout.write("Enter coordinates > ");
};

InputController.read = function() {
  this.stdin.setRawMode(true);
  this.currentInput = "";

  this.stdin.on("data", function(keystroke) {
    var keyString = keystroke.toJSON().toString();

    this.catchControlC(keyString);

    var output = "";

    if(this.allowedChars.indexOf(keyString) != -1) {
      output = keystroke;
      this.currentInput += keystroke.toString();
      this.emit("coordinates", this.currentInput);
    }

    if(keyString == this.specialChars.backspace && this.currentInput.length > 0) {
      output = new Buffer(this.specialChars.deleteSequence);
      this.currentInput = this.currentInput.slice(0, -1);
    }

    this.stdout.write(output);
  }.bind(this));
};

InputController.start = function() {
  this.ask();
  this.read();
};

InputController.catchControlC = function(keyString) {
  if(keyString == this.specialChars.controlC)
    this.stdin.pause();
};

module.exports = InputController;
