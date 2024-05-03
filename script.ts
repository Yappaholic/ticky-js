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
  let arr: any = ask?.split(",")
  playerOne.makeMove(Number(arr[0]), Number(arr[1]))
};
const checkWin = () => {
  let boardi = board.board;
  for (let i = 0; i < boardi.length; i++) {
    let rowSum = boardi[i].reduce((a: number, b: number) => Number(a) + Number(b))
    if (rowSum == 3) {
      console.log(`${playerOne.playerName} win!`)
    } else if (rowSum == 6) {
      console.log(`${playerTwo.playerName} win!`)
    }
  }
  for (let j = 0; j < boardi.length; j++) {
    let colSum = Number(boardi[0][j]) + Number(boardi[1][j]) + Number(boardi[2][j])
    if (colSum === 3) {
      console.log(`${playerOne.playerName} win!`)
    } else if (colSum === 6) {
      console.log(`${playerTwo.playerName} win!`)
    }
  }
  let rightDiagonal = Number(boardi[0][0]) + Number(boardi[1][1]) + Number(boardi[2][2]);
  let leftDiagonal = Number(boardi[0][2]) + Number(boardi[1][1]) + Number(boardi[2][1]);
  if (rightDiagonal === 3 || leftDiagonal === 3) {
    console.log(`${playerOne.playerName} win!`)
  } else if (rightDiagonal === 6 || leftDiagonal === 6) {
    console.log(`${playerTwo.playerName} win!`)
  }
}
const playerOne = createPlayers("PlayerOne", 1);
const playerTwo = createPlayers("PlayerTwo", 2);
const board = makeBoard();
askMove()
body?.appendChild(array)
