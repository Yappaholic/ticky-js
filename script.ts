const promp = require("prompt-sync")();
const makeBoard = () => {
  let size: number = 3;
  let board = [];
  for (let i = 0; i < size; i++) {
    board[i] = []
    for (let j = 0; j < size; j++) {
      board[i].push([])
    }
  }
  function getBoard() { return board }
  return { board, getBoard }
}
const createPlayers = (playerName: string, token: number) => {
  function getName() { return playerName }
  function getToken() { return token }
  return { playerName, token, getName, getToken }
}
const makeMove = (player: any, row: number, column: number) => {
  let token = player.getToken()
  const getRow = () => {
    let boardRow = board.getBoard()
    return boardRow[row - 1]
  };
  let moveRow = getRow();
  moveRow[column - 1] = [token];
  board[row - 1] = moveRow;
  return board.board
}
const playerOne = createPlayers("PlayerOne", 1)
const playerTwo = createPlayers("PlayerTwo", 2)
const board = makeBoard();
let move = promp("enter row and column with a comma")
let mov = move.split(",");
mov.map((a: string) => Number(a))
console.log(mov);

