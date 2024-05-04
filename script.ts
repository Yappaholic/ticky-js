const array: any = document.createElement("p")
const body = document.querySelector("body")
const makeBoard = () => {
  let size = 3;
  let board: any = [];
  for (let i = 0; i < size; i++) {
    board[i] = [];
    for (let j = 0; j < size; j++) {
      board[i].push([]);
    }
  }
  function getBoard() { return board; }
  return { board, getBoard };
};
const createPlayers = (playerName: string, token: "X" | "O") => {
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
let count = 1;
const askMove = () => {
  let ask = prompt("What's your move?")
  let arr: any = ask?.split(",")
  if (count % 2 === 1) {
    playerOne.makeMove(Number(arr[0]), Number(arr[1]));
    count++;
  } else if (count % 2 === 0) {
    playerTwo.makeMove(Number(arr[0]), Number(arr[1]));
    count++;
  }
};
const checkWin = (): boolean => {
  let boardi = board.board;
  for (let i = 0; i < boardi.length; i++) {
    let rowSum = boardi[i].reduce((a: string, b: string) => a + b);
    if (rowSum == "XXX") {
      console.log(`${playerOne.playerName} win!`)
      return true;
    } else if (rowSum == "OOO") {
      console.log(`${playerTwo.playerName} win!`)
      return true;
    }
  }
  for (let j = 0; j < boardi.length; j++) {
    let colSum = (boardi[0][j]) + (boardi[1][j]) + (boardi[2][j])
    if (colSum === "XXX") {
      console.log(`${playerOne.playerName} win!`)
      return true;
    } else if (colSum === "OOO") {
      console.log(`${playerTwo.playerName} win!`)
      return true;
    }
  }
  let rightDiagonal = (boardi[0][0]) + (boardi[1][1]) + (boardi[2][2]);
  let leftDiagonal = (boardi[0][2]) + (boardi[1][1]) + (boardi[2][1]);
  if (rightDiagonal === "XXX" || leftDiagonal === "XXX") {
    console.log(`${playerOne.playerName} win!`)
    return true;
  } else if (rightDiagonal === "OOO" || leftDiagonal === "OOO") {
    console.log(`${playerTwo.playerName} win!`)
    return true;
  }
  return false;
}
const playerOne = createPlayers("PlayerOne", "X");
const playerTwo = createPlayers("PlayerTwo", "O");
const board = makeBoard();
askMove()
body?.appendChild(array)
