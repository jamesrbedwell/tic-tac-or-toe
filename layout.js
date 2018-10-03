const letsGoBtn = document.querySelector('.lets-go-btn');
const player1NameElements = document.querySelectorAll('.p1name');
const player2NameElements = document.querySelectorAll('.p2name');

const tictacTokens = document.querySelectorAll('.tictac-token');
const toeTokens = document.querySelectorAll('.toe-token');

const whosTurn = document.querySelector('.whos-turn');
const winnerText = document.querySelector('.winner-text');

const cells = document.querySelectorAll('.cell');

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

let player1Name = '';
let player2Name = '';

let whosGo = 'Player1';

let player1Turns = [];
let player2Turns = [];

let draggedItem;

function allowPlayerTurn() {
  if (whosGo === 'Player1') {
    tictacTokens.forEach(tictac => tictac.draggable = true);
    toeTokens.forEach(toe => toe.draggable = false);
  } else if (whosGo === 'Player2') {
    toeTokens.forEach(toe => toe.draggable = true);
    tictacTokens.forEach(tictac => tictac.draggable = false);
  }
}
allowPlayerTurn();

function updateTurn() {
  whosGo === 'Player1' ? whosGo = 'Player2' : whosGo = 'Player1';
  if (whosGo === 'Player1') {
    whosTurn.textContent = `${player1Name}'s Turn!`;
  } else {
    whosTurn.textContent = `${player2Name}'s Turn!`;
  }
}

// Drag Event Listeners
tictacTokens.forEach(tictac => {
  tictac.addEventListener('dragstart', dragStart);
  tictac.addEventListener('dragend', dragEnd);
})

toeTokens.forEach(toe => {
  toe.addEventListener('dragstart', dragStart);
  toe.addEventListener('dragend', dragEnd);
})

// Drag Functions
function dragStart(event) {
  event.target.classList.add('drag-token');
  setTimeout(() => (event.target.classList.add('invisible')),0);
  draggedItem = event.target;
}

function dragEnd(event) {
  event.target.classList.remove('invisible');
  event.target.classList.remove
  ('drag-token');
}

// Drop Listeners
cells.forEach(cell => {
  cell.addEventListener('dragover', dragOver);
  cell.addEventListener('dragenter', dragEnter);
  cell.addEventListener('dragleave', dragLeave);
  cell.addEventListener('drop', dragDrop);
})

// Drop Function
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

function dragDrop(event) {
  event.target.append(draggedItem);
  event.target.classList.remove('cell-hovered');
  event.target.removeEventListener('dragover', dragOver);
  event.target.removeEventListener('dragenter', dragEnter);
  event.target.removeEventListener('dragleave', dragLeave);
  if (whosGo === 'Player1') {
    draggedItem.classList.replace('tictac-token', 'tictac-played');
    draggedItem.draggable = false;
    player1Turns.push(parseInt(event.target.id));
    updateTurn();
  } else {
    draggedItem.classList.replace('toe-token', 'toe-played');
    draggedItem.draggable = false;
    player2Turns.push(parseInt(event.target.id));
    updateTurn();
  }
  if (player1Turns.length >= 3 || player2Turns.length >= 3) {
    checkIfWon();
  }
  allowPlayerTurn();
}

letsGoBtn.addEventListener('click', letsGo);

function letsGo(event) {
  event.preventDefault();
  player1Name = document.querySelector('.player1-name').value;
  player2Name = document.querySelector('.player2-name').value;
  player1NameElements.forEach(name => name.textContent = player1Name);
  player2NameElements.forEach(name => name.textContent = player2Name);
  whosTurn.textContent = `${player1Name}'s Turn!`;
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
      winnerText.textContent = `${player1Name} Wins`;
      player1Turns = [];
      player2Turns = [];
    } else  if (player2Counter === 3) {
      winnerText.textContent = `${player2Name} Wins`;
      player1Turns = [];
      player2Turns = [];
    }
  })
  if (player1Turns.length + player2Turns.length  === 9) {
    winnerText.textContent = `It's a Draw!`
  }
}