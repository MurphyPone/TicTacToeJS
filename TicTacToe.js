/**
 * Class Description: This class represents a game of Tic Tac Toe and contains many (slOw) methods which determine the current win/lose status of the game
 * 					--Side note, I also commented & completed the JavaDocs for this Class in class during one of the lab days we had for this assignment,
 * 						but then a new version of this Class was uploaded...  So, yes, these JDocs are late, but only sort of.
 **/

function TicTacToe() {
  var ROWS = 3; //The dimensions of the game
  var COLS = 3;
  var POSSIBILITIES = Math.pow(3, 9);
  var CHAR_POSSIBILITIES = 3; // x, o or space

  /**
   * A helper method which accepts a 2D array of characters and a single character and returns the number of occurrences of that
   * 		character in the current game.
   * @method numChars
   * @param b the 2D array of characters to be evaluated
   * @param ch a character to search for in the 2D array
   * @return an integer representing the number of occurrences in that game
   */
  function numChars( b, ch) {
    var total = 0;
    for (var r = 0; r < ROWS; r++)
      for (var c = 0; c < COLS; c++)
        if (ch == b[r][c])
          total++;
    return total;
  }

  /**
   * A helper method which determines whether or not the current game is valid according to the number of plays
   * @method valid
   * @param board the 2D array of characters representing the current game configuration
   * @return an integer representing the number of occurrences in that game
   */
  function valid( board) { //Would need more cases if there are more than 2 players
    // Ensure there are at least 3 xs and 2 os, or 3 os and 2 xs
    // Make sure there are at least one more x or one more o
    var numX = numChars(board, 'X');
    var numO = numChars(board, 'O');

    if (!(numX > 2 || numO > 2)) {
      return false;
    } // >3
    if ((numX == numO + 1) || (numO == numX + 1)) {
      return true;
    }
    return false;
  }

  /**
   * A helper method which converts a 2D array of characters into a single String
   * @method boardToString
   * @param b the 2D array of characters representing the current game configuration which are converted to a single String
   * @return the concatenation of all the values of b
   */
  function boardToString( b) {
    var result = "";
    for (var r = 0; r < ROWS; r++) {
      for (var c = 0; c < COLS; c++)
        result += b[r][c];
      //result += "\n";	//Uncomment for readable board output --note this would break the whole darn program
    }
    return result;
  }

  /**
   * A helper method which converts a String to a 2D array of characters
   * @method StringToBoard
   * @param board the String representing the current game configuration which is converted to a 2D array of characters
   * @return the 2D array of characters
   */
  function stringToBoard(board) {
    var b = new char[ROWS][COLS];
    var index = 0;
    for (var r = 0; r < ROWS; r++) {
      for (var c = 0; c < COLS; c++)
        b[r][c] = whichLetter(board.charAt(index++));
    }
    return b;
  }

  /**
   * A helper method which converts a integer represented as a character to its corresponding TicTacToe token: 'x', 'o', or ' '.
   * @method whichLetter
   * @param ch the character to be evaluated
   * @return the character representing the TicTacToe token
   */
  function whichLetter( ch) {
    switch (ch) {
      case '1':
        return 'x';
      case '2':
        return 'o';
      case '0':
        return ' ';
      default:
        return ch;
    }
  }

  /**
   * A helper method which converts several integers represented as a single String to its corresponding game configuration
   *
   * @author KellyT
   * @date 4/5/18
   * @method makeBoard
   * @param s the String to be converted
   * @return a 2D array of characters representing the board configuration
   */
  function makeBoard( s) { //Accepts a string : '101200102' --> [ ][ ][x][x][ ][x][o][x][o][o]
    var b = new char[ROWS][COLS];
    var ch = 0;
    for (var r = 0; r < ROWS; r++)
      for (var c = 0; c < COLS; c++) {
        b[r][c] = whichLetter(s.charAt(ch));
        ch++;
      }
    return b;
  }

  /**
   * A method which creates an array of Strings holding all possible game configurations
   *
   * @author KellyT
   * @date 4/5/18
   * @method fillValues
   * @return the array of all possible game configurations
   */
  function fillValues() {
    var strBoard = "000000000";
    var values = new String[POSSIBILITIES];
    var index = 0;
    values[index++] = strBoard;
    while (!strBoard.equals("222222222")) {
      strBoard = addOne(strBoard);
      values[index++] = strBoard;
    }
    return values;
  }

  /**
   * A method which determines if a given board configuration represented by a 2D array of characters contains a diagonal win.
   * @method diagonalWin
   * @param board the 2D array of characters to be evaluated
   * @return true if yes, false if no
   */
  function diagonalWin( board) {
    if ((board[0][0] == 'x' && board[1][1] == 'x' && board[2][2] == 'x') ||
      (board[0][0] == 'o' && board[1][1] == 'o' && board[2][2] == 'o')) {
      return true;
    } else
    if ((board[0][2] == 'x' && board[1][1] == 'x' && board[2][0] == 'x') ||
      (board[0][2] == 'o' && board[1][1] == 'o' && board[2][0] == 'o')) {
      return true;
    }
    return false;
  }

  /**
   * A method which determines if a given board configuration represented by a 2D array of characters contains a horizontal win.
   *
   * @author KellyT
   * @date 4/5/18
   * @method rowWin
   * @param board the 2D array of characters to be evaluated
   * @return true if yes, false if no
   */
  function rowWin(board) {
    var ch;
    for (var r = 0; r < ROWS; r++) {
      ch = board[r][0];
      for (var c = 0; c < COLS; c++)
        if (ch != board[r][c]) return false;
    }
    return true;
  }

  /**
   * A method which determines if a given board configuration represented by a 2D array of characters contains a vertical win.
   * @method colWin
   * @param board the 2D array of characters to be evaluated
   * @return true if yes, false if no
   */
  function colWin( board) {
    var ch;
    for (var c = 0; c < COLS; c++) {
      ch = board[0][c];
      for (var r = 0; r < ROWS; r++)
        if (ch != board[r][c]) return false;
    }
    return true;
  }

  /**
   * A method which determines if a given board configuration represented by a 2D array of characters contains a win.
   * @method isWin
   * @param b the 2D array of characters to be evaluated
   * @return true if yes, false if no
   */
  function isWin( b) {
    return valid(b) && (rowWin(b) || colWin(b) || diagonalWin(b));
  }

  /**
   * A method which determines if a given board configuration represented by a String contains a win by converting it to a 2D array of
   * 		characters and evaluating that.
   *
   * @author KellyT
   * @date 4/5/18
   * @method isWin
   * @param s the String to be converted and evaluated
   * @return true if yes, false if no
   */
  function isWin( s) {
    var b = stringToBoard(s);
    return isWin(b);
  }
}
