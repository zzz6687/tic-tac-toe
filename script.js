document.addEventListener("DOMContentLoaded", function () {
  const statusElement = document.getElementById("status");
  const boardElement = document.querySelector(".gameboard");
  const gameArea = document.querySelector(".gamearea");
  const buttonsArea = document.querySelector(".buttons");
  const resetBtn = document.getElementById("resetBtn");

  let currentSymbol = "X";
  let gameOver = false;
  let board = gameboard();

  let firstPlayerName = "Player 1";
  let secondPlayerName = "Player 2";
  let scorePlayerOne = 0;
  let scorePlayerTwo = 0;

  const inputPlayer1 = document.getElementById("playerOne");
  const inputPlayer2 = document.getElementById("playerTwo");

  inputPlayer1.addEventListener("input", () => {
    firstPlayerName = inputPlayer1.value || "Player 1";
    if (currentSymbol === "X") updateStatus();
  });

  inputPlayer2.addEventListener("input", () => {
    secondPlayerName = inputPlayer2.value || "Player 2";
    if (currentSymbol === "O") updateStatus();
  });

  resetBtn.addEventListener("click", () => {
    firstPlayerName = "Player 1";
    secondPlayerName = "Player 2";
    scorePlayerOne = 0;
    scorePlayerTwo = 0;
    board = gameboard();
    gameOver = false;
    currentSymbol = "X";

    inputPlayer1.value = "Player 1";
    inputPlayer2.value = "Player 2";
    document
      .querySelectorAll(".cell")
      .forEach((cell) => (cell.textContent = ""));
    buttonRestart.style.display = "none";
    updateStatus();

    document.getElementById("playerOne-score").textContent = scorePlayerOne;
    document.getElementById("playerTwo-score").textContent = scorePlayerTwo;
  });

  function updateStatus() {
    const currentName =
      currentSymbol === "X" ? firstPlayerName : secondPlayerName;
    statusElement.textContent = `Current player: ${currentName}`;
  }

  const buttonRestart = document.createElement("button");
  buttonRestart.classList.add("buttonRestart");
  buttonRestart.textContent = "Restart";
  buttonRestart.style.display = "none";
  buttonsArea.appendChild(buttonRestart);

  buttonRestart.addEventListener("click", () => {
    board = gameboard();
    gameOver = false;
    currentSymbol = "X";
    document
      .querySelectorAll(".cell")
      .forEach((cell) => (cell.textContent = ""));
    buttonRestart.style.display = "none";
    updateStatus();
  });

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
    board[row][col] = currentSymbol;

    const cells = document.querySelectorAll(".cell");
    cells[index].textContent = currentSymbol;

    const winner = checkWinner(board);
    if (winner) {
      const winnerName = winner === "X" ? firstPlayerName : secondPlayerName;
      statusElement.textContent = `${winnerName} wins!`;

      if (winner === "X") {
        scorePlayerOne++;
        document.getElementById("playerOne-score").textContent = scorePlayerOne;
      } else {
        scorePlayerTwo++;
        document.getElementById("playerTwo-score").textContent = scorePlayerTwo;
      }

      gameOver = true;
      buttonRestart.style.display = "inline-block";
      return;
    }

    if (isDraw(board)) {
      statusElement.textContent = "It is a draw!";
      gameOver = true;
      buttonRestart.style.display = "inline-block";
      return;
    }

    currentSymbol = currentSymbol === "X" ? "O" : "X";
    updateStatus();
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
  updateStatus();
});
