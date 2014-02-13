'use strict';

var InputController = {

  stdin: process.stdin,
  stdout: process.stdout,

  keys: {
    backspace: "127",
    upArrow: "27,91,65"
  },

  ask: function() {
    this.stdout.write("Enter coordinates > ");
  },

  read: function() {
    this.stdin.setRawMode(true);

    this.stdin.on("data", function(keystroke) {
      var keyString = keystroke.toJSON().toString();

      var blockOutput = false;

      if(keyString == this.keys.backspace ) {
        this.stdout.write(new Buffer([8, 32, 8]));
        return;
      }

      if(keyString == this.keys.upArrow) return;

      this.stdout.write(keystroke);

      if(keyString == 3) this.stdin.pause();
    }.bind(this));
  },

  start: function() {
    this.ask();
    this.read();
  }
};

module.exports = InputController;
