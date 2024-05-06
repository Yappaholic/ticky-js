const container = document.querySelector(".container");
const cells = document.querySelectorAll(".cell");
const result = document.createElement("h2");
result.classList.toggle("result");
var isWon = undefined;
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
    const checkWin = () => {
        if (isWon == true) {
            return undefined;
        }
        let boardi = board.board;
        for (let i = 0; i < boardi.length; i++) {
            let rowSum = boardi[i].reduce((a, b) => a + b);
            if (rowSum == "XXX") {
                result.textContent = `${playerOne.playerName} wins!`;
                container.prepend(result);
                isWon = true;
            }
            else if (rowSum == "OOO") {
                result.textContent = `${playerTwo.playerName} wins!`;
                container.prepend(result);
                isWon = true;
            }
        }
        for (let j = 0; j < boardi.length; j++) {
            let colSum = (boardi[0][j]) + (boardi[1][j]) + (boardi[2][j]);
            if (colSum === "XXX") {
                result.textContent = `${playerOne.playerName} wins!`;
                container.prepend(result);
                isWon = true;
            }
            else if (colSum === "OOO") {
                result.textContent = `${playerTwo.playerName} wins!`;
                container.prepend(result);
                isWon = true;
            }
        }
        let rightDiagonal = (boardi[0][0]) + (boardi[1][1]) + (boardi[2][2]);
        let leftDiagonal = (boardi[0][2]) + (boardi[1][1]) + (boardi[2][0]);
        if (rightDiagonal === "XXX" || leftDiagonal === "XXX") {
            result.textContent = `${playerOne.playerName} wins!`;
            container.prepend(result);
            isWon = true;
        }
        else if (rightDiagonal === "OOO" || leftDiagonal === "OOO") {
            result.textContent = `${playerTwo.playerName} wins!`;
            container.prepend(result);
            isWon = true;
        }
    };
    const makeMove = (row, column) => {
        const getRow = () => {
            let boardRow = board.getBoard();
            return boardRow[row - 1];
        };
        let moveRow = getRow();
        moveRow[column - 1] = [token];
        let divId = [row, column].join("-");
        document.getElementById(divId).textContent = `${token}`;
        board[row - 1] = moveRow;
        checkWin();
        return board.board;
    };
    return { playerName, token, getName, getToken, makeMove };
};
const playerOne = createPlayers("PlayerOne", "X");
const playerTwo = createPlayers("PlayerTwo", "O");
const board = makeBoard();
let count = 1;
const askMove = (id) => {
    let arr = id.split("-");
    if (count % 2 === 1) {
        playerOne.makeMove(Number(arr[0]), Number(arr[1]));
        count++;
    }
    else if (count % 2 === 0) {
        playerTwo.makeMove(Number(arr[0]), Number(arr[1]));
        count++;
    }
};
for (let i of cells) {
    i.addEventListener("click", (e) => {
        if (isWon == true) {
            return undefined;
        }
        let move = i.id;
        askMove(move);
    });
}
