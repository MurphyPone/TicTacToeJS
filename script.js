var board;

$(function() { //On ready

    board = new TicTacToeHashCode();

});

function randomize() {
  board.randomize();
}

function cycle(cell) {
  board.cycle(cell);
}

function clear() {
  board.clear();
  console.log("outer");
}
