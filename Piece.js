'use strict'

var Piece = function(type) {

  var _type = type;

  this.type = function(type) {
    if(type) _type = type;
    return _type;
  };

  this.config = function(config) {
    this.type(config.type);
  }

};

module.exports = Piece;
