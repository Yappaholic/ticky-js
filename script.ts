const array: any = document.createElement("p")
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
const createPlayers = (playerName: string, token: number) => {
  function getName() { return playerName; }
  function getToken() { return token; }
  const makeMove = (row: number, column: number) => {
    const getRow = () => {
      let boardRow = board.getBoard();
      return boardRow[row - 1];
    };
    let moveRow = getRow();
    moveRow[column - 1] = [token];

    board[row - 1] = moveRow;
    array.textContent = board.board
    checkWin()
    return board.board;
  };

  return { playerName, token, getName, getToken, makeMove };
};
const askMove = () => {
  let ask = prompt("What's your move?")
  let arr = ask.split(",")
  playerOne.makeMove(Number(arr[0]), Number(arr[1]))
};
const checkWin = () => {
  for (let i = 0; i < board.board.length; i++) {
    let rowSum = board.board[i].reduce((a: number, b: number) => Number(a) + Number(b))
    if (rowSum == 3) {
      console.log(`${playerOne.playerName} win!`)
    } else if (rowSum == 6) {
      console.log(`${playerTwo.playerName} win!`)
    }
  }
  let obj = {}
  for (let j = 0; j < board.board.length; j++) {
    for (let x = 0; x < board.board[j].length; x++) {
      if (!obj[board.board[j][x]]) {
        let token = board.board[j][x];
        obj[token] = 1;
      } else if (obj[board.board[j][x]]) {
        let token = board.board[j][x];
        obj[token]++
        if (obj[token] === 3) {
          return "You win!"
        }
      }
    }
  }
}
const playerOne = createPlayers("PlayerOne", 1);
const playerTwo = createPlayers("PlayerTwo", 2);
const board = makeBoard();
askMove()
body.appendChild(array)
