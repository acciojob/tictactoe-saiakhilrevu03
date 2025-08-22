//your JS code here. If required.
const submitBtn = document.getElementById('submit');
const player1Input = document.getElementById('player1');
const player2Input = document.getElementById('player2');

const playerForm = document.querySelector('.player-form');
const gameBoardDiv = document.querySelector('.game-board');
const messageDiv = document.querySelector('.message');
const cells = document.querySelectorAll('.cell');
const restartBtn = document.getElementById('restart');

let player1 = '';
let player2 = '';
let currentPlayer = '';
let board = ['', '', '', '', '', '', '', '', ''];
let gameOver = false;

// Winning combinations
const winCombos = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

// Start game
submitBtn.addEventListener('click', () => {
  player1 = player1Input.value.trim();
  player2 = player2Input.value.trim();
  if(player1 && player2) {
    playerForm.style.display = 'none';
    gameBoardDiv.style.display = 'block';
    currentPlayer = player1;
    messageDiv.textContent = `${currentPlayer}, you're up!`;
  } else {
    alert('Please enter both player names.');
  }
});

// Handle cell click
cells.forEach(cell => cell.addEventListener('click', () => {
  if(gameOver) return;
  const index = parseInt(cell.id) - 1;
  if(board[index] === '') {
    board[index] = currentPlayer === player1 ? 'X' : 'O';
    cell.textContent = board[index];
    if(checkWin()) {
      messageDiv.textContent = `${currentPlayer} congratulations you won!`;
      gameOver = true;
    } else if(board.every(cell => cell !== '')) {
      messageDiv.textContent = `It's a draw!`;
      gameOver = true;
    } else {
      currentPlayer = currentPlayer === player1 ? player2 : player1;
      messageDiv.textContent = `${currentPlayer}, you're up!`;
    }
  }
}));

// Check winning
function checkWin() {
  return winCombos.some(combo => {
    const [a,b,c] = combo;
    return board[a] && board[a] === board[b] && board[a] === board[c];
  });
}

// Restart game
restartBtn.addEventListener('click', () => {
  board = ['', '', '', '', '', '', '', '', ''];
  cells.forEach(cell => cell.textContent = '');
  currentPlayer = player1;
  gameOver = false;
  messageDiv.textContent = `${currentPlayer}, you're up!`;
});
