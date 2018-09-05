var cells;
var test;

$(function() { //On ready
    cells = []; //Saves all the cell elements (not just text) in an array

    for(var i = 0; i < 9; i++) {
      cells[i] = $('#cell-'+ i.toString() );
    }
    test = new TicTacToeHashCode("011111111", cells);
    test.configure();

    randomSetup();
});

//select random values for the starting board
function randomSetup() {
  for(var i = 0; i < cells.length; i++) {
    var ch = getRandomChar();
    cells[i].text(ch);
  }

}

//Helper function which generates a random character {X, O}
function getRandomChar() {
  var r = Math.floor(Math.random() * 100);
  console.log(r + " even? " + (r%2 == 0) );
  if( r % 2 == 0) { return "X"; }
  else            { return "O"; }
}
