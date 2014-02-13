'use strict';

var InputController = {

  stdin: process.stdin,
  stdout: process.stdout,

  specialChars: {
    backspace: "127",
    controlC: "3",
    deleteSequence: [8, 32, 8]
  },

  allowedChars: ["48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "32"],

  ask: function() {
    this.stdout.write("Enter coordinates > ");
  },

  read: function() {
    this.stdin.setRawMode(true);

    this.stdin.on("data", function(keystroke) {
      var keyString = keystroke.toJSON().toString();

      this.catchControlC(keyString);

      var output = "";

      if(this.allowedChars.indexOf(keyString) != -1) 
        output = keystroke;

      if(keyString == this.specialChars.backspace)
        output = new Buffer(this.specialChars.deleteSequence);

      this.stdout.write(output);
    }.bind(this));
  },

  start: function() {
    this.ask();
    this.read();
  },

  catchControlC: function(keyString) {
    if(keyString == this.specialChars.controlC)
      this.stdin.pause();
  }
};

module.exports = InputController;
