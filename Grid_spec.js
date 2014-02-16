'use strcit';

var Grid = require("./Grid");
var Board = require("./Board");

describe('Grid', function(){

  beforeEach(function(){
    Grid.pieces = Board.generate(20);
  });

  it("should unmark a whole column as highlighted", function(){
    spyOn(Grid.pieces[0][4], "unHighlight");
    spyOn(Grid.pieces[19][4], "unHighlight");

    Grid.unHighlightColumn(5);

    expect(Grid.pieces[0][4].unHighlight).toHaveBeenCalled();
    expect(Grid.pieces[19][4].unHighlight).toHaveBeenCalled();
  });
  
  it("should mark a whole column as highlighted", function(){
    spyOn(Grid.pieces[0][4], "highlight");
    spyOn(Grid.pieces[19][4], "highlight");

    Grid.highlightColumn(5);

    expect(Grid.pieces[0][4].highlight).toHaveBeenCalled();
    expect(Grid.pieces[19][4].highlight).toHaveBeenCalled();
  });

  it("should unmark a whole grid row as highlighted", function(){
    spyOn(Grid.pieces[2][0], "unHighlight");

    Grid.unHighlightRow(3);

    expect(Grid.pieces[2][0].unHighlight).toHaveBeenCalled();
  });

  it("should mark a whole grid row as highlighted", function(){
    spyOn(Grid.pieces[2][0], "highlight");

    Grid.highlightRow(3);

    expect(Grid.pieces[2][0].highlight).toHaveBeenCalled();
  });

  it("should avoid un/highlight beyond grid size", function(){
    spyOn(Grid.pieces[2][0], "highlight");
    spyOn(Grid.pieces[2][0], "unHighlight");

    Grid.highlightRow(30);

    expect(Grid.pieces[2][0].highlight).not.toHaveBeenCalled();
    expect(Grid.pieces[2][0].unHighlight).not.toHaveBeenCalled();
  });


});
