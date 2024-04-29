const array = document.createElement("p")
const body = document.querySelector("body")
const makeBoard = () => {
  let size = 3;
  let board = [];
  for (let i = 0; i < size; i++) {
    board[i] = [];
    for (let j = 0; j < size; j++) {
      board[i].push([]);
    }
  }
  function getBoard() { return board; }
  return { board, getBoard };
};
const createPlayers = (playerName, token) => {
  function getName() { return playerName; }
  function getToken() { return token; }
  const makeMove = (row, column) => {
    const getRow = () => {
      let boardRow = board.getBoard();
      return boardRow[row - 1];
    };
    let moveRow = getRow();
    moveRow[column - 1] = [token];

    board[row - 1] = moveRow;
    array.textContent = board.board
    return board.board;
  };

  return { playerName, token, getName, getToken, makeMove };
};
const askMove = () => {
  let ask = prompt("What's your move?")
  let arr = ask.split(",")
  playerOne.makeMove(arr[0], arr[1])
};
const playerOne = createPlayers("PlayerOne", 1);
const playerTwo = createPlayers("PlayerTwo", 2);
const board = makeBoard();
askMove()
body.appendChild(array)
