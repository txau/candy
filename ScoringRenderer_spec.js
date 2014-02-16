'use stric';

var ScoringRenderer = require("./ScoringRenderer");

describe("ScoringRenderer", function(){

  it("should render a blank line as default", function() {
    var result = ScoringRenderer.render();

    expect(result).toBe("\n");
  });

  it("should render round points if provided", function(){
    var result = ScoringRenderer.render(100);

    expect(result).toBe("this round > 100\n");
  });
});
