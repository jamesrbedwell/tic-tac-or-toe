//PAGE 1 SELECTORS
const playSoloBtn = document.querySelector('.play-solo-btn');
const letsPlayBtn = document.querySelector('.lets-play-btn');
const errorMessage = document.querySelector('.error-message');

//NAME SELECTORS
const p1NameElems = document.querySelectorAll('.p1name');
const p2NameElems = document.querySelectorAll('.p2name');

//TURN SELECTOR
const whosTurn = document.querySelector('.whos-turn');

//TOKEN CHOICE SELECTORS
const p1Choices = document.querySelectorAll('.p1-choice');
const p2Choices = document.querySelectorAll('.p2-choice');
const chooseAgainBtns = document.querySelectorAll('.choose-again-btn');

//SELECTED TOKEN SELECTORS
let p1Tokens = document.querySelectorAll('.p1-token');
let p2Tokens = document.querySelectorAll('.p2-token');

//BUTTON SELECTORS
const backBtn = document.querySelector('.back-btn');
const playBtn = document.querySelector('.play-btn');
const backChoiceBtn = document.querySelector('.back-choice-btn');

//LEADERBOARD SELECTORS
const leaderNames = document.querySelector('.leader-names');
const leaderScores = document.querySelector('.leader-scores');

// let leaderNameArray = Object.keys(localStorage);
// let leaderScoresArray = Object.values(localStorage);
// leaderNames.textContent = leaderNameArray.join(' ');
// leaderScores.textContent = leaderScoresArray.join(' ');

//OTHER SELECTORS
const winnerText = document.querySelector('.the-winner');

const gameContainer = document.querySelector('.game-container');

let cells = document.querySelectorAll('.cell');

let p1WinsText = document.querySelector('.p1wins');
let p2WinsText = document.querySelector('.p2wins');

const popup = document.querySelector('.winner-popup');
const popupClose = document.querySelector('.close');
const replayBtn = document.querySelector('.replay-btn');
const finishBtn = document.querySelector('.finish-btn').addEventListener('click', function(){
  window.location.reload();
  window.scrollTo(0,0);
  // localStorage.setItem(`${player1Name}`, `${p1Wins}`);
  // localStorage.setItem(`${player2Name}`, `${p2Wins}`);
});

// SET STANDARD EVENT LISTENERS
letsPlayBtn.addEventListener('click', startGame);
playSoloBtn.addEventListener('click', startGame);
backBtn.addEventListener('click', back);
playBtn.addEventListener('click', play);
backChoiceBtn.addEventListener('click', backToChoices);
chooseAgainBtns.forEach(btn => btn.addEventListener('click', chooseAgain));

// SET STANDARD FUNCTIONS
function back() {
  document.querySelector('.page1').scrollIntoView({behavior: 'smooth'});
  player1TokenChoice = '';
  player2TokenChoice = '';
  p2Choices.forEach(choice => chice)
}

function play() {
  if (player1TokenChoice === 'tictac' && player2TokenChoice === 'tictac') {
    p2Tokens.forEach(p2tok => {
      p2tok.src = 'images/tictacalt.svg';
    })
  } else if (player1TokenChoice === 'toe' && player2TokenChoice === 'toe') {
    p2Tokens.forEach(p2tok => {
      p2tok.src = 'images/toealt.svg';
    })
  }
  document.querySelector('.page3').scrollIntoView({behavior: 'smooth'});
  gameContainerHTML = gameContainer.innerHTML;
}

function backToChoices() {
  document.querySelector('.page2').scrollIntoView({behavior: 'smooth'});
}

// SET VARIABLES
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

let playingSolo = false;
let whosGo = 'Player1';
let player1Name;
let player2Name;

let player1TokenChoice;
let player2TokenChoice;

let player1Token;
let player2Token;

let player1Turns = [];
let player2Turns = [];

let player1Counter;
let player2Counter;

let draggedItem;
let gameContainerHTML;

let playBoard = [1,2,3,4,5,6,7,8,9];
let cellsArray = [1,2,3,4,5,6,7,8,9];
let choicesmade = 0;

let p1Wins = 0;
let p2Wins = 0;

let won = false;

function startGame(event) {
  event.preventDefault();
  event.target.classList.contains('play-solo-btn') ? playingSolo = true : playingSolo = false;
  if (playingSolo) {
    player1Name = document.querySelector('.player1-name').value;
    player2Name = `Han Solo`; 
  } else if (!playingSolo) {
    player1Name = document.querySelector('.player1-name').value;
    player2Name = document.querySelector('.player2-name').value;
  }
  if (!player1Name || !player2Name) {
    errorMessage.textContent = 'Please enter your name!!!'
  } else {
    p1NameElems.forEach(e => e.textContent = player1Name); // Place Names on layout
    p2NameElems.forEach(e => e.textContent = player2Name); // Place Names on layout
    //go to next page and set title of whos turn
    whosTurn.textContent = `${player1Name}'s Turn!`;
    document.querySelector('.page2').scrollIntoView({behavior: 'smooth'});

    continueGame();
  }
}

function continueGame() {
  p1Choices.forEach(choice => {
    choice.addEventListener('click', tokenChoice);
    choice.addEventListener('mouseover', event.target.classList.add('token-hover'));
    choice.addEventListener('mouseleave', event.target.classList.remove('token-hover')); 
    choice.style.cursor = 'pointer';  
  });

  if (!playingSolo) {
    //add event listeners for player1's token choice
    p2Choices.forEach(choice => {
      choice.addEventListener('click', tokenChoice);
      choice.addEventListener('mouseover', event.target.classList.add('token-hover'));
      choice.addEventListener('mouseleave', event.target.classList.remove('token-hover')); 
      choice.style.cursor = 'pointer';  
    });
  }
}

function tokenChoice(event) {
  //player 1
  event.target.addEventListener('mouseover', function(event){
  })
  if (event.target.classList.contains('p1-choice')) {
    if (event.target.classList.contains('tictac')) {
      player1TokenChoice = 'tictac';
      event.target.classList.add('chosen');
    } else if (event.target.classList.contains('toe')) {
      player1TokenChoice = 'toe';
      event.target.classList.add('chosen');
    }
    choicesmade++
    p1Choices.forEach(choice => {
      choice.removeEventListener('click', tokenChoice);
      choice.removeEventListener('mouseover', event.target.classList.add('token-hover'));
      choice.removeEventListener('mouseleave', event.target.classList.remove('token-hover'));
      choice.style.cursor = 'auto'; 
    });
    p1Tokens.forEach(token => {
      token.src = event.target.src;
      token.classList.add(`${player1TokenChoice}-token`);
    });
    chooseAgainBtns.forEach(btn => btn.addEventListener('click', chooseAgain));
  }
  if (event.target.classList.contains('p2-choice')) {  // player 2
    if (event.target.classList.contains('tictac')) {
      player2TokenChoice = 'tictac';
      event.target.classList.add('chosen');
    } else if (event.target.classList.contains('toe')) {
      player2TokenChoice = 'toe';
      event.target.classList.add('chosen');
    }
    choicesmade++
    p2Choices.forEach(choice => {
      choice.removeEventListener('click', tokenChoice);
      choice.removeEventListener('mouseover', event.target.classList.add('token-hover'));
      choice.removeEventListener('mouseleave', event.target.classList.remove('token-hover'));
      choice.style.cursor = 'auto'; 
    });
    p2Tokens.forEach(token => {
      token.src = event.target.src;
      token.classList.add(`${player2TokenChoice}-token`);
    });
    chooseAgainBtns.forEach(btn => btn.addEventListener('click', chooseAgain));
  }
  if (!playingSolo && choicesmade === 2) {
    playBtn.classList.add('play-animation');
  } else if (playingSolo && choicesmade === 1) {
    playBtn.classList.add('play-animation');
    if (player1TokenChoice === 'tictac') {
      player2TokenChoice = 'toe';
      p2Tokens.forEach(token => {
        token.src = 'images/toe.svg'
        token.classList.add(`${player2TokenChoice}-token`);
      })
    } else {
      player2TokenChoice = 'tictac';
      p2Tokens.forEach(token => {
        token.src = 'images/tictac.svg'
        token.classList.add(`${player2TokenChoice}-token`);
      })
    }
  }
}

function chooseAgain(event) {
  if (event.target.classList.contains('p1ca')) {
    player1TokenChoice = '';
    choicesmade--;
    p1Choices.forEach(choice => {
      choice.addEventListener('click', tokenChoice);
      choice.addEventListener('mouseover', event.target.classList.add('token-hover'));
      choice.addEventListener('mouseleave', event.target.classList.remove('token-hover')); 
      choice.style.cursor = 'pointer';
      if (choice.classList.contains('chosen')) {
        choice.classList.remove('chosen');
      }
      p1Tokens.forEach(token => {
        token.src = '';
        if (token.classList.contains('toe-token')) {
          token.classList.remove('toe-token');
        } else if (token.classList.contains('tictac-token')) {
          token.classList.remove('tictac-token');
        }
      });  
    })
  } else if (event.target.classList.contains('p2ca')) {
    player2TokenChoice = '';
    choicesmade--;
    p2Choices.forEach(choice => {
      choice.addEventListener('click', tokenChoice);
      choice.addEventListener('mouseover', event.target.classList.add('token-hover'));
      choice.addEventListener('mouseleave', event.target.classList.remove('token-hover')); 
      choice.style.cursor = 'pointer';
      if (choice.classList.contains('chosen')) {
        choice.classList.remove('chosen');
      }
      p2Tokens.forEach(token => {
        token.src = '';
        if (token.classList.contains('toe-token')) {
          token.classList.remove('toe-token');
        } else if (token.classList.contains('tictac-token')) {
          token.classList.remove('tictac-token');
        }
      });    
    })
  }
}

function allowTurn() {
  p1Tokens = document.querySelectorAll('.p1-token');
  p2Tokens = document.querySelectorAll('.p2-token');
  if (whosGo === 'Player1') {
    p1Tokens.forEach(p1tok => p1tok.draggable = true);
    p2Tokens.forEach(p2tok => p2tok.draggable = false);
  } else if (whosGo === 'Player2' && playingSolo) {
    p1Tokens.forEach(p1tok => p1tok.draggable = false);
    p2Tokens.forEach(p2tok => p2tok.draggable = false);
  } else if (whosGo === 'Player2') {
    p2Tokens.forEach(p2tok => p2tok.draggable = true);
    p1Tokens.forEach(p1tok => p1tok.draggable = false);
  }
}
allowTurn();

function setEventListenersForGame() {
  p1Tokens.forEach(token => {
    token.addEventListener('dragstart', dragStart);
    token.addEventListener('dragend', dragEnd);
  })
  
  p2Tokens.forEach(token => {
    token.addEventListener('dragstart', dragStart);
    token.addEventListener('dragend', dragEnd);
  })
  
  cells.forEach(cell => {
    cell.addEventListener('dragover', dragOver);
    cell.addEventListener('dragenter', dragEnter);
    cell.addEventListener('dragleave', dragLeave);
    cell.addEventListener('drop', dragDrop);
  })
}
setEventListenersForGame();

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
    draggedItem.classList.replace(`${player1TokenChoice}-token`, `${player1TokenChoice}-played`);
    draggedItem.classList.remove('p1-token');
    draggedItem.draggable = false;
    player1Turns.push(parseInt(event.target.id));
    if (playingSolo) {
      let turnIndex = playBoard.indexOf(parseInt(event.target.id));
      playBoard.splice(turnIndex, 1);   
    }
  } else if (whosGo === 'Player2' && !playingSolo) {
    draggedItem.classList.replace(`${player2TokenChoice}-token`, `${player2TokenChoice}-played`);
    draggedItem.classList.remove('p1-token');
    draggedItem.draggable = false;
    player2Turns.push(parseInt(event.target.id));  
  }
  if (player1Turns.length >= 3 || player2Turns.length >= 3) {
    checkIfWon();
  }
  if (!won) {
    updateTurn();
    allowTurn();
  }
}

function updateTurn() {
  console.log(whosGo)
  whosGo === 'Player1' ? whosGo = 'Player2' : whosGo = 'Player1';
  if (whosGo === 'Player1') {
    whosTurn.textContent = `${player1Name}'s Turn!`;
  } else if (whosGo === 'Player2' && playingSolo) {
    whosTurn.textContent = `${player2Name}'s Turn!`;
    setTimeout(compTurn, 2000);
  } else {
    whosTurn.textContent = `${player2Name}'s Turn!`;
  }
}

function checkIfWon() {
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
      p1Wins++
      won = true;
      winnerPopup();
    } else  if (player2Counter === 3) {
      winnerText.textContent = `${player2Name} Wins`;
      won = true;
      p2Wins++
      winnerPopup();      
    } else if (player1Turns.length + player2Turns.length  === 9) {
      winnerText.textContent = `It's a Draw!`
      winnerPopup();
    }
  })
}

function winnerPopup() {
  p1WinsText.textContent = `Wins: ${p1Wins}`;
  p2WinsText.textContent = `Wins: ${p2Wins}`;
  popup.style.display = 'block';
  replayBtn.addEventListener('click', replay);
}

function replay() {
  player1Counter = 0;
  player2Counter = 0;
  player1Turns = [];
  player2Turns = [];
  playBoard = [1,2,3,4,5,6,7,8,9];
  popup.style.display = 'none';
  gameContainer.innerHTML = gameContainerHTML;
  cells = document.querySelectorAll('.cell');
  p1Tokens = document.querySelectorAll('.p1-token');
  p2Tokens = document.querySelectorAll('.p2-token');
  p1WinsText = document.querySelector('.p1wins');
  p2WinsText = document.querySelector('.p2wins');
  won = false;
  setEventListenersForGame();
  updateTurn();
  allowTurn();
  p1WinsText.textContent = `Wins: ${p1Wins}`;
  p2WinsText.textContent = `Wins: ${p2Wins}`;
}

function compTurn() {
  let randomIndex = Math.floor(Math.random() * playBoard.length);
  let turnChoice = playBoard[randomIndex];
  let turnCell = cellsArray.indexOf(turnChoice);
  cells[turnCell].append(p2Tokens[0]);
  p2Tokens[0].classList.remove('p2-token');
  p2Tokens = document.querySelectorAll('.p2-token');
  player2Turns.push(parseInt(turnCell + 1));
  playBoard.splice(randomIndex, 1);
  checkIfWon();
  updateTurn();
  allowTurn();
}