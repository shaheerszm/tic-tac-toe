const gameBoard = (function () {
  let player1turn = true;
  const board = Array.from(document.querySelectorAll(".square"));

  //detect and display moves of each player
  for (let x of board) {
    x.addEventListener("click", (e) => {
      if (e.target.textContent === "") {
        if (player1turn) {
          e.target.textContent = "X";
        } else {
          e.target.textContent = "O";
        }
        player1turn = !player1turn;
      }
    });
  }
  const state = function () {
    return board;
  };
  const reset = function () {
    for (let x of board) {
      x.textContent = "";
    }
    player1turn = true;
  };

  return { reset, state };
})();

const gameState = (function () {
  let winner = null;
  const title = document.querySelector(".title");
  const resetBtn = document.querySelector(".reset");
  const checkWin = function (board) {
    const winCombos = [
      [0, 1, 2],
      [0, 3, 6],
      [3, 4, 5],
      [6, 7, 8],
      [1, 4, 7],
      [2, 4, 6],
      [2, 5, 8],
      [0, 4, 8],
    ];
    const players = ["X", "O"];
    for (let player of players) {
      for (let combo of winCombos) {
        let sum = 0;
        for (let pos of combo) {
          if (board[pos].textContent == player) {
            sum += 1;
          }
        }
        if (sum == 3) {
          winner = player;
          return true;
        }
      }
    }
    return false;
  };

  const checkDraw = function (board) {
    return board.every((x) => x.textContent != "");
  };

  window.addEventListener("click", (e) => {
    state = gameBoard.state();
    if (checkWin(state)) {
      title.textContent = `Player ${winner} has won!`;
    } else if (checkDraw(state)) {
      title.textContent = "It's a draw";
      title.classList.add("draw");
    }
  });
  resetBtn.addEventListener("click", (e) => {
    gameBoard.reset();
    title.textContent = "Let's play tic-tac-toe";
  });
})();
