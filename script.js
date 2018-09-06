var board;

$(function() { //On ready
    board = new TicTacToeHashCode();
    $('#formula').text('$$\\text{When } t =\\text{the given token\'s individual hash code value [0, 2], and } n = \\text{the token\'s position on the board [0, 8], then the index } i \\text{ \for a unique board configuration is given by the equation: } i = \\sum  3 ^ n t $$');
});

function cycle(cell) {
  board.cycle(cell);
}
