let currentPlayer = "X";
let gameOver = false;

function gameboard() {
  const board = [];
  for (let i = 0; i < 3; i++) {
    board[i] = [null, null, null];
  }

  return board;
}

function playerMove(board, player) {
  const playerChoice = prompt(
    `Player ${player}: choose the row and column numbers (example: "2 3")`
  );
  const [row, col] = playerChoice.trim().split(" ").map(Number);
  if (
    row > 3 ||
    row < 1 ||
    col > 3 ||
    col < 1 ||
    playerChoice.split(" ").length !== 2 ||
    isNaN(row) ||
    isNaN(col)
  ) {
    alert(
      "The input is not correct, check for it to be 2 separate number from 1 to 3!"
    );
    return playerMove(board, player);
  }

  const boardRow = row - 1;
  const boardCol = col - 1;

  if (board[boardRow][boardCol] !== null) {
    alert("The cells are already taken");
    return playerMove(player);
  }

  return { row: boardRow, col: boardCol };
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

function Game() {
  let board = gameboard();
  while (!gameOver) {
    const { row, col } = playerMove(board, currentPlayer);
    board[row][col] = currentPlayer;

    const winner = checkWinner(board);
    if (winner) {
      alert(`Player ${winner} wins!`);
      gameOver = true;
      break;
    }

    if (isDraw(board)) {
      alert("It is a draw!");
      gameOver = true;
      break;
    }

    if (currentPlayer === "X") {
      currentPlayer = "O";
    } else {
      currentPlayer = "X";
    }
  }
}

Game();
