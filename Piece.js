'use strict'

var Piece = function(type) {

  var _type = type;
  var _highlighted = false;

  this.type = function(type) {
    if(type) _type = type;
    return _type;
  };

  this.config = function(config) {
    this.type(config.type);
  },

  this.unHighlight = function() {
    this._highlighted = false;
  },

 this.highlight = function() {
    this._highlighted = true;
  },

  this.highlighted = function() {
    return this._highlighted;
  }
};

module.exports = Piece;
