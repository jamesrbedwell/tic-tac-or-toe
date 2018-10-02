let cells = document.querySelectorAll('.gameboard .cell');
let playerTurn = 'x'
cells.forEach(cell => cell.addEventListener('click', handleClick));

function handleClick(event) {
  event.target.textContent = playerTurn;
  playerTurn === 'x' ? playerTurn = 'o' : playerTurn = 'x';
}
