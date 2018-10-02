let gameboard = document.querySelector('.gameboard');
let winnerText = document.querySelector('.winner h4');
let cells = document.querySelectorAll('.cell');

gameboard.addEventListener('click', playersTurn);

let player = 'x'
let player1Choices = [];
let player2Choices = [];
const winningCombos = [
  [1,2,3],
  [4,5,6],
  [7,8,9],
  [1,4,7],
  [2,5,8],
  [3,6,9],
  [1,5,9],
  [3,5,7]
]
function clearBoard() {
  cells.forEach(cell => cell.textContent = '');
}


function checkIfWon() {
    //loop through player choices and see if they are all within one of the winning combos
    winningCombos.forEach(combo => {
      player1Counter = 0;
      player2Counter = 0;
      player1Choices.forEach(choice => {
        if(combo.includes(choice)){
          player1Counter++
        }
      })
      player2Choices.forEach(choice => {
        if(combo.includes(choice)) {
          player2Counter++
        }
      })
      if (player1Counter === 3) {
        winnerText.textContent = `Player1 Wins`;
        player1Choices = [];
        player2Choices = [];
        clearBoard();
      } else  if (player2Counter === 3) {
        winnerText.textContent = `Player2 Wins`;
        player1Choices = [];
        player2Choices = [];
        clearBoard();
      }
    })
}
    
function playersTurn(event) {
  if (event.target.classList.contains('cell')) {
    event.target.textContent = player;
    player === 'x' ? player1Choices.push(parseInt(event.target.id)) : player2Choices.push(parseInt(event.target.id));
    player === 'x' ? player = 'o' : player = 'x';

    if (player1Choices.length >= 3 || player2Choices.length >= 3) {
      checkIfWon();
    }
  }
}
