document.addEventListener("DOMContentLoaded", function () {
  let currentPlayer = "X";
  const statusElement = document.getElementById("status");
  const boardElement = document.querySelector(".gameboard");
  let gameOver = false;
  let board = gameboard();

  for (let i = 0; i < 9; i++) {
    let cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = i;
    boardElement.appendChild(cell);

    cell.addEventListener("click", () => cellClick(i));
  }

  function cellClick(index) {
    if (gameOver) return;

    const row = Math.floor(index / 3);
    const col = index % 3;

    if (board[row][col] !== null) return;
    board[row][col] = currentPlayer;

    let cells = document.querySelectorAll(".cell");
    cells[index].textContent = currentPlayer;

    const winner = checkWinner(board);
    if (winner) {
      statusElement.textContent = `Player ${winner} wins!`;
      gameOver = true;
      return;
    }

    if (isDraw(board)) {
      statusElement.textContent = "It is a draw!";
      gameOver = true;
      return;
    }

    if (currentPlayer === "X") {
      currentPlayer = "O";
    } else {
      currentPlayer = "X";
    }

    statusElement.textContent = `Current player ${currentPlayer}`;
  }

  function gameboard() {
    const board = [];
    for (let i = 0; i < 3; i++) {
      board[i] = [null, null, null];
    }

    return board;
  }

  function checkWinner(board) {
    for (let i = 0; i < 3; i++) {
      if (
        board[i][0] &&
        board[i][0] === board[i][1] &&
        board[i][1] === board[i][2]
      ) {
        return board[i][0];
      }
      if (
        board[0][i] &&
        board[0][i] === board[1][i] &&
        board[1][i] === board[2][i]
      ) {
        return board[0][i];
      }
    }

    if (
      board[0][0] &&
      board[0][0] === board[1][1] &&
      board[1][1] === board[2][2]
    ) {
      return board[0][0];
    }
    if (
      board[0][2] &&
      board[0][2] === board[1][1] &&
      board[1][1] === board[2][0]
    ) {
      return board[0][2];
    }
    return null;
  }

  function isDraw(board) {
    if (
      board[0][0] !== null &&
      board[0][1] !== null &&
      board[0][2] !== null &&
      board[1][0] !== null &&
      board[1][1] !== null &&
      board[1][2] !== null &&
      board[2][0] !== null &&
      board[2][1] !== null &&
      board[2][2] !== null
    ) {
      return true;
    } else {
      return false;
    }
  }
});
