let gameboard = document.querySelector('.gameboard'); // should i remove as already calling cells below??
let winnerText = document.querySelector('.winner h4');
let cells = document.querySelectorAll('.cell');

let player1tokens = document.querySelectorAll('.player1');
let player2tokens = document.querySelectorAll('.player2');

function getPlayableTokens() {
  player1tokens = document.querySelectorAll('.player1');
  player2tokens = document.querySelectorAll('.player2');
}

// gameboard.addEventListener('click', playersTurn);

let draggedItem;

let whichPlayer = 'Player1';
let player1Turns = [];
let player2Turns = [];

function allowPlayer() {
  if (whichPlayer === 'Player1') {
    player1tokens.forEach(p1tok => p1tok.draggable = true);
    player2tokens.forEach(p2tok => p2tok.draggable = false);
  } else if (whichPlayer === 'Player2') {
    player2tokens.forEach(p2tok => p2tok.draggable = true);
    player1tokens.forEach(p1tok => p1tok.draggable = false);
  }
}

allowPlayer();

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

// TOKEN LISTENERS
player1tokens.forEach(p1token => {
  p1token.addEventListener('dragstart', dragStart);
  p1token.addEventListener('dragend', dragEnd);
})

player2tokens.forEach(p2token => {
  p2token.addEventListener('dragstart', dragStart);
  p2token.addEventListener('dragend', dragEnd);
})

//DRAG FUNCTIONS 
function dragStart(event) {
  event.target.classList.add('token-drag')
  setTimeout(() => (event.target.classList.add('invisible')), 0);
  draggedItem = event.target;
}

function dragEnd(event) {
  event.target.classList.remove('invisible');
  event.target.classList.remove
  ('token-drag')
}

// DROP LISTENERS
cells.forEach(cell => {
  cell.addEventListener('dragover', dragOver);
  cell.addEventListener('dragenter', dragEnter);
  cell.addEventListener('dragleave', dragLeave);
  cell.addEventListener('drop', dragDrop);
})

//DROP FUNCTIONS
function dragOver(event) {
  event.preventDefault();
}

function dragEnter(event) {
  event.preventDefault();
  event.target.classList.add('cell-hovered');
}

function dragLeave() {
  event.target.classList.remove('cell-hovered');
}

function dragDrop() {
  event.target.append(draggedItem);
  event.target.classList.remove('cell-hovered');
  event.target.removeEventListener('dragover', dragOver);
  event.target.removeEventListener('dragenter', dragEnter);
  event.target.removeEventListener('dragleave', dragLeave);
  event.target.removeEventListener('drop', dragDrop);
  if (whichPlayer === 'Player1') {
    draggedItem.classList.replace('player1', 'played1');
    draggedItem.draggable = false;
    player1Turns.push(parseInt(event.target.id));
    whichPlayer = 'Player2';
  } else {
    draggedItem.classList.replace('player2', 'played2');
    draggedItem.draggable = false;
    player2Turns.push(parseInt(event.target.id));
    whichPlayer = 'Player1';
  }
  if (player1Turns.length >= 3 || player2Turns.length >= 3) {
    checkIfWon();
  }
  getPlayableTokens();
  allowPlayer(); 
}

function checkIfWon() {
    //loop through player choices and see if they are all within one of the winning combos
    winningCombos.forEach(combo => {
      player1Counter = 0;
      player2Counter = 0;
      player1Turns.forEach(choice => {
        if(combo.includes(choice)){
          player1Counter++
        }
      })
      player2Turns.forEach(choice => {
        if(combo.includes(choice)) {
          player2Counter++
        }
      })
      if (player1Counter === 3) {
        winnerText.textContent = `Player1 Wins`;
        player1Turns = [];
        player2Turns = [];
      } else  if (player2Counter === 3) {
        winnerText.textContent = `Player2 Wins`;
        player1Turns = [];
        player2Turns = [];
      }
    })
    if (player1Turns.length + player2Turns.length  === 9) {
      winnerText.textContent = `It's a Draw!`
    }
}
    
// function playersTurn(event) {
//   if (event.target.classList.contains('cell')) {
//     event.target.textContent = player;
//     player === 'x' ? player1Choices.push(parseInt(event.target.id)) : player2Choices.push(parseInt(event.target.id));
//     player === 'x' ? player = 'o' : player = 'x';

//     if (player1Choices.length >= 3 || player2Choices.length >= 3) {
//       checkIfWon();
//     }
//   }
// }
