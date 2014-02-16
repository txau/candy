'use strict';

var ScoringRenderer = {
  
  render: function(roundPoints) {
    
    var result = "";

    if(roundPoints)
      result += "this round > " + roundPoints;
    
    return result + "\n";
  }

};

module.exports = ScoringRenderer;
