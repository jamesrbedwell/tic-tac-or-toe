//PAGE 1 SELECTORS
const letsPlayBtn = document.querySelector('.lets-go-btn');
const playSoloBtn = document.querySelector('.play-solo-btn');

const player1NameElements = document.querySelectorAll('.p1name');
const player2NameElements = document.querySelectorAll('.p2name');
//PAGE 2 SELECTORS
const p1ChoiceTic = document.querySelector('.p1choice-tic');
const p1ChoiceToe = document.querySelector('.p1choice-toe');
const p2ChoiceTic = document.querySelector('.p2choice-tic');
const p2ChoiceToe = document.querySelector('.p2choice-toe');

const backBtn = document.querySelector('.back-btn');
const playBtn = document.querySelector('.play-btn');
const backTokenBtn = document.querySelector('.back-token-btn');

let p1Tokens = document.querySelectorAll('.p1-token');
let p2Tokens = document.querySelectorAll('.p2-token');

const whosTurn = document.querySelector('.whos-turn');
const winnerText = document.querySelector('.the-winner');

const gameContainer = document.querySelector('.game-container');

let cells = document.querySelectorAll('.cell');

const popup = document.querySelector('.winner-popup');
const popupClose = document.querySelector('.close');
const replayBtn = document.querySelector('.replay-btn');
const finishBtn = document.querySelector('.finish-btn').addEventListener('click', function(){
  window.location.reload();
  window.scrollTo(0,0);
});


//GLOBAL VARIABLES
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
let cellsArray = [1,2,3,4,5,6,7,8,9];
let gameBoard = [];

let player1Choice;
let player2Choice;

let draggedItem;

let gameContainerHTML;

//PAGE 1 BUTTON LISTENER AND FUNCTIONS
letsPlayBtn.addEventListener('click', letsPlay);
playSoloBtn.addEventListener('click', playSolo);
backBtn.addEventListener('click', back);
playBtn.addEventListener('click', play);
backTokenBtn.addEventListener('click', backToTokens);

function back() {
  document.querySelector('.page1').scrollIntoView({behavior: 'smooth'});
}

function play() {
  if (player1Choice === 'tic' && player2Choice === 'tic') {
    p2Tokens.forEach(p2toke => {
      p2toke.src = 'images/tictacalt.svg';
    })
  } else if (player1Choice === 'toe' && player2Choice === 'toe') {
    p2Tokens.forEach(p2tke => {
      p2tke.src = 'images/toealt.svg';
    })
  }
  document.querySelector('.page3').scrollIntoView({behavior: 'smooth'});
  gameContainerHTML = gameContainer.innerHTML;
}

function backToTokens() {
  document.querySelector('.page2').scrollIntoView({behavior: 'smooth'});
}

function letsPlay(event) {
  event.preventDefault();
  player1Name = document.querySelector('.player1-name').value;
  player2Name = document.querySelector('.player2-name').value;
  player1NameElements.forEach(name => name.textContent = player1Name);
  player2NameElements.forEach(name => name.textContent = player2Name);
  whosTurn.textContent = `${player1Name}'s Turn!`;
  document.querySelector('.page2').scrollIntoView({behavior: 'smooth'});
  playerVsPlayer();
}

function playSolo(event) {
  event.preventDefault();
  player1Name = document.querySelector('.player1-name').value;
  player2Name = 'Han Solo';
  player1NameElements.forEach(name => name.textContent = player1Name);
  player2NameElements.forEach(name => name.textContent = player2Name);
  whosTurn.textContent = `${player1Name}'s Turn!`;
  document.querySelector('.page2').scrollIntoView({behavior: 'smooth'});
  playerVsComp();
}

function playerVsPlayer() {
  //PAGE 2 LISTENERS AND FUNCTIONS
  p1ChoiceTic.addEventListener('click', p1Tic);
  p1ChoiceToe.addEventListener('click', p1Toe);
  p2ChoiceTic.addEventListener('click', p2Tic);
  p2ChoiceToe.addEventListener('click', p2Toe);

  function p1Tic(e) {
    if (!player1Choice) {
      player1Choice = 'tic';
      p1ChoiceTic.classList.add('chosen');
    } else if (player1Choice === 'toe') {
      player1Choice = 'tic';
      p1ChoiceToe.classList.remove('chosen');
      p1ChoiceTic.classList.add('chosen');
    }
    p1Tokens.forEach(p1t => {
      p1t.src = e.target.src;
      p1t.classList.add('tictac-token');
      if (p1t.classList.contains('toe-token')) {
        p1t.classList.remove('toe-token');
      }
    })
  }
  function p1Toe(e) {
    if (!player1Choice) {
      player1Choice = 'toe';
      p1ChoiceToe.classList.add('chosen');
    } else if (player1Choice === 'tic') {
      player1Choice = 'toe';
      p1ChoiceTic.classList.remove('chosen');
      p1ChoiceToe.classList.add('chosen');
    }
    p1Tokens.forEach(p1tk => {
      p1tk.src = e.target.src;
      p1tk.classList.add('toe-token');
      if (p1tk.classList.contains('tictac-token')) {
        p1tk.classList.remove('tictac-token');
      }
    })
  }
  function p2Tic(e) {
    if (!player2Choice) {
      player2Choice = 'tic';
      p2ChoiceTic.classList.add('chosen');
    } else if (player2Choice === 'toe') {
      player2Choice = 'tic';
      p2ChoiceToe.classList.remove('chosen');
      p2ChoiceTic.classList.add('chosen');
    }
    p2Tokens.forEach(p2t => {
      p2t.src = e.target.src;
      p2t.classList.add('tictac-token');
      if (p2t.classList.contains('toe-token')) {
        p2t.classList.remove('toe-token');
      }
    })
  }
  function p2Toe(e) {
    if (!player2Choice) {
      player2Choice = 'toe';
      p2ChoiceToe.classList.add('chosen');
    } else if (player2Choice === 'tic') {
      player2Choice = 'toe';
      p2ChoiceTic.classList.remove('chosen');
      p2ChoiceToe.classList.add('chosen');
    }
    p2Tokens.forEach(p2tk => {
      p2tk.src = e.target.src;
      p2tk.classList.add('toe-token');
      if (p2tk.classList.contains('tictac-token')) {
        p2tk.classList.remove('tictac-token');
      }
    })
  }

  //PAGE 3 LISTENERS AND FUNCTIONS

  function allowPlayerTurn() {
    p1Tokens = document.querySelectorAll('.p1-token');
    p2Tokens = document.querySelectorAll('.p2-token');
    if (whosGo === 'Player1') {
      p1Tokens.forEach(p1tok => p1tok.draggable = true);
      p2Tokens.forEach(p2tok => p2tok.draggable = false);
    } else if (whosGo === 'Player2') {
      p2Tokens.forEach(p2toke => p2toke.draggable = true);
      p1Tokens.forEach(p1toke => p1toke.draggable = false);
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

  function setEventListeners() {
    p1Tokens.forEach(tictac => {
      tictac.addEventListener('dragstart', dragStart);
      tictac.addEventListener('dragend', dragEnd);
    })
    
    p2Tokens.forEach(toe => {
      toe.addEventListener('dragstart', dragStart);
      toe.addEventListener('dragend', dragEnd);
    })
    
    cells.forEach(cell => {
      cell.addEventListener('dragover', dragOver);
      cell.addEventListener('dragenter', dragEnter);
      cell.addEventListener('dragleave', dragLeave);
      cell.addEventListener('drop', dragDrop);
    })
  }
  setEventListeners()

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
      draggedItem.classList.remove('p1-token');
      draggedItem.draggable = false;
      player1Turns.push(parseInt(event.target.id));
      updateTurn();
    } else {
      draggedItem.classList.replace('toe-token', 'toe-played');
      draggedItem.classList.remove('p1-token');
      draggedItem.draggable = false;
      player2Turns.push(parseInt(event.target.id));
      updateTurn();
    }
    if (player1Turns.length >= 3 || player2Turns.length >= 3) {
      checkIfWon();
    }
    allowPlayerTurn();
  }

  function checkIfWon() {
    //loop through player choices and see if they are all within one of the winning combos
    winningCombos.forEach(combo => {
      player1Counter = 0;
      player2Counter = 0;
      player1Turns.forEach(turn => {
        if(combo.includes(turn)){
          player1Counter++
        }
      })
      player2Turns.forEach(turn => {
        if(combo.includes(turn)) {
          player2Counter++
        }
      })
      if (player1Counter === 3) {
        winnerText.textContent = `${player1Name} Wins`;
        player1Turns = [];
        player2Turns = [];
        winnerPopup();
      } else  if (player2Counter === 3) {
        winnerText.textContent = `${player2Name} Wins`;
        winnerPopup();
        player1Turns = [];
        player2Turns = [];
      }
    })
    if (player1Turns.length + player2Turns.length  === 9) {
      winnerText.textContent = `It's a Draw!`
      winnerPopup()
    }
  }

  function winnerPopup() {
    popup.style.display = 'block';
    replayBtn.addEventListener('click', replay);
  }

  function replay() {
    popup.style.display = 'none';
    gameContainer.innerHTML = gameContainerHTML;
    cells = document.querySelectorAll('.cell');
    p1Tokens = document.querySelectorAll('.p1-token');
    p2Tokens = document.querySelectorAll('.p2-token');
    setEventListeners();
    allowPlayerTurn();
  }
}

function playerVsComp() {
  gameboard = [1,2,3,4,5,6,7,8,9];
  p1ChoiceTic.addEventListener('click', p1Tic);
  p1ChoiceToe.addEventListener('click', p1Toe);

  function p1Tic(e) {
    if (!player1Choice) {
      player1Choice = 'tic';
      p1ChoiceTic.classList.add('chosen');
      player2Choice = 'toe';
    } else if (player1Choice === 'toe') {
      player1Choice = 'tic';
      p1ChoiceToe.classList.remove('chosen');
      p1ChoiceTic.classList.add('chosen');
      player2Choice = 'toe';
    }
    p1Tokens.forEach(p1t => {
      p1t.src = e.target.src;
      p1t.classList.add('tictac-token');
      if (p1t.classList.contains('toe-token')) {
        p1t.classList.remove('toe-token');
      }
    })
    p2Tokens.forEach(p2t => {
      p2t.src = p2ChoiceToe.src
      p2t.classList.add('toe-token');
      if (p2t.classList.contains('tictac-token')) {
        p2t.classList.remove('tictac-token');
      }
    })
  }
  function p1Toe(e) {
    if (!player1Choice) {
      player1Choice = 'toe';
      p1ChoiceToe.classList.add('chosen');
      player2Choice = 'tic';
    } else if (player1Choice === 'tic') {
      player1Choice = 'toe';
      p1ChoiceTic.classList.remove('chosen');
      p1ChoiceToe.classList.add('chosen');
      player2Choice = 'tic';
    }
    p1Tokens.forEach(p1tk => {
      p1tk.src = e.target.src;
      p1tk.classList.add('toe-token');
      if (p1tk.classList.contains('tictac-token')) {
        p1tk.classList.remove('tictac-token');
      }
    })
    p2Tokens.forEach(p2tk => {
      p2tk.src = p2ChoiceTic.src
      p2tk.classList.add('tictac-token');
      if (p2tk.classList.contains('toe-token')) {
        p2tk.classList.remove('toe-token');
      }
    })
  }
  // WILL NEED TO LOOK AT BELOW
  function allowPlayerTurn() {
    if (whosGo === 'Player1') {
      p1Tokens.forEach(p1tok => p1tok.draggable = true);
      p2Tokens.forEach(p2tok => p2tok.draggable = false);
    } else if (whosGo === 'Player2') {
      p2Tokens.forEach(p2toke => p2toke.draggable = true);
      p1Tokens.forEach(p1toke => p1toke.draggable = false);
    }
  }
  allowPlayerTurn();

  function updateTurn() {
    whosGo === 'Player1' ? whosGo = 'Player2' : whosGo = 'Player1';
    if (whosGo === 'Player1') {
      whosTurn.textContent = `${player1Name}'s Turn!`;
    } else {
      whosTurn.textContent = `${player2Name}'s Turn!`;
      compTurn();
    }
  }

  function setEventListeners() {
    p1Tokens.forEach(tictac => {
      tictac.addEventListener('dragstart', dragStart);
      tictac.addEventListener('dragend', dragEnd);
    })
    
    p2Tokens.forEach(toe => {
      toe.addEventListener('dragstart', dragStart);
      toe.addEventListener('dragend', dragEnd);
    })
    
    cells.forEach(cell => {
      cell.addEventListener('dragover', dragOver);
      cell.addEventListener('dragenter', dragEnter);
      cell.addEventListener('dragleave', dragLeave);
      cell.addEventListener('drop', dragDrop);
    })
  }
  setEventListeners()

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
      let turnIndex = gameboard.indexOf(parseInt(event.target.id));
      gameboard.splice(turnIndex, 1);
      updateTurn();
    }
    if (player1Turns.length >= 3 || player2Turns.length >= 3) {
      checkIfWon();
    }
    allowPlayerTurn();
  }

  function checkIfWon() {
    //loop through player choices and see if they are all within one of the winning combos
    winningCombos.forEach(combo => {
      player1Counter = 0;
      player2Counter = 0;
      player1Turns.forEach(turn => {
        if(combo.includes(turn)){
          player1Counter++
        }
      })
      player2Turns.forEach(turn => {
        if(combo.includes(turn)) {
          player2Counter++
        }
      })
      if (player1Counter === 3) {
        winnerText.textContent = `${player1Name} Wins`;
        // player1Turns = [];
        // player2Turns = [];
        winnerPopup();
      } else  if (player2Counter === 3) {
        winnerText.textContent = `${player2Name} Wins`;
        winnerPopup();
        // player1Turns = [];
        // player2Turns = [];
      }
    })
    if (player1Turns.length + player2Turns.length  === 9) {
      winnerText.textContent = `It's a Draw!`
      winnerPopup()
    }
  }

  function winnerPopup() {
    popup.style.display = 'block';
    replayBtn.addEventListener('click', replay);
  }

  function replay() {
    popup.style.display = 'none';
    gameContainer.innerHTML = gameContainerHTML;
    cells = document.querySelectorAll('.cell');
    p1Tokens = document.querySelectorAll('.p1-token');
    p2Tokens = document.querySelectorAll('.p2-token');
    setEventListeners();
    allowPlayerTurn();
  }

  function compTurn() {
    let randomIndex = Math.floor(Math.random() * gameboard.length);
    let turnChoice = gameboard[randomIndex];
    let turnCell = cellsArray.indexOf(turnChoice);
    cells[turnCell].append(p2Tokens[0]);
    p2Tokens[0].classList.remove('p2-token');
    p2Tokens = document.querySelectorAll('.p2-token');
    player2Turns.push(parseInt(turnCell + 1));
    gameboard.splice(randomIndex, 1);
    checkIfWon();
    updateTurn();
    allowPlayerTurn();
  }
}


