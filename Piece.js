'use strict'

var Piece = function(type) {

  var _type = type;
  var _highlighted = false;
  var _marked = false;
  var _points = 0;

  this.type = function(type) {
    if(type) _type = type;
    return _type;
  };

  this.points = function(points) {
    if(points) _points = points;
    return _points;
  };

  this.config = function(config) {
    this.type(config.type);
    this.points(config.points);
  };

  this.unHighlight = function() {
    _highlighted = false;
  };

 this.highlight = function() {
    _highlighted = true;
  };

  this.highlighted = function() {
    return _highlighted;
  };

  this.mark = function() {
    _marked = true;
  };

  this.marked = function() {
    return _marked;
  };

  this.unmark = function() {
    _marked = false;
  }
};

module.exports = Piece;
