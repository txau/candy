'use strict';

var InputController = {

  stdin: process.stdin,
  stdout: process.stdout,

  keys: {
    backspace: "127",
    upArrow: "27,91,65",
    controlC: "3",
    downArrow: "27,91,66"
  },

  ask: function() {
    this.stdout.write("Enter coordinates > ");
  },

  read: function() {
    this.stdin.setRawMode(true);

    this.stdin.on("data", function(keystroke) {
      var keyString = keystroke.toJSON().toString();
      var output = keystroke;
  
      //console.log(keyString);

      if(this.catchControlC(keyString));

      if(keyString == this.keys.backspace)
        output = new Buffer([8, 32, 8]);

      var areUpOrDownKeys = (keyString == this.keys.upArrow || keyString == this.keys.downArrow);

      if(areUpOrDownKeys) output = "";

      this.stdout.write(output);
    }.bind(this));
  },

  start: function() {
    this.ask();
    this.read();
  },

  catchControlC: function(keyString) {
    if(keyString == this.keys.controlC)
      this.stdin.pause();
  }
};

module.exports = InputController;
