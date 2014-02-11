'use strict';

var stream = require('stream')

var Board = require("./Board");
var Renderer = require("./Renderer");

var Game = {

  stdin: process.stdin,
  stdout: process.stdout,

  clear: function() {
    process.stdout.write(Renderer.clear());
  },

  printGrid: function() {
    var render = Renderer.render(this.board);
    process.stdout.write(render);
  },

  board: Board.generate(20),

  ask: function() {

    var currentInput = "";
    this.stdout.write("Enter coordinates >");

    this.stdin.setRawMode(true);

    this.stdin.on("data", function(keystroke) {
      currentInput += keystroke.toString();
      
      var json = keystroke.toJSON().toString();

      this.guessCoordinates(currentInput);
      
      this.stdout.write(keystroke);
      //if(json == 127 )
      //{
        //this.stdout.write(new Buffer("\x08"));
        //this.stdout.write(new Buffer("\x20"));
        //this.stdout.write(new Buffer("\x08"));
        ////console.log("backspace");
      //}

      //if(json == "27,91,65")
        //console.log("up");

      //console.log("key:", json); 
      if(json == 3) this.stdin.pause();
    }.bind(this));
  },

  guessCoordinates: function(input) {
  }
};

module.exports = Game;
