#TicTacs or Toes - An alternative to naughts and crosses.
----

[PLAY HERE!](http://jamesrbedwell.github.io/tic-tac-or-toe)

## INSTRUCTIONS

1. Enter your name, or names if you are playing two player. Then click the relevant button.
2. Each player needs to select a token. Then press PLAY at the bottom of the screen.
... If you are playing solo the computer token will choose automatically.
3. It's game time, when it is your turn click and drag your token to your prefered play area.
4. Keep going until you win/lose/draw.
5. Play again because you enjoyed it so much!

----

##MADE WITH
* HTML
* CSS
* JAVASCRIPT

##THOUGHT PROCESS
Make a game thats pretty straight forward a bit more interesting! Try not to follow the standard approch of clicking to show where a player has taken a turn by introducing more interactivity. In this version players are able to drag their 'tokens' to where they want to play.
Add a gimic of playing with tictacs or a toe.

##WOULD I DO ANYTHING DIFFERENTLY
I would have incorporated the game logic and computer player logic to begin with.  I created them seperately then had to try and combine afterwards.

The drag and drop feature was a lot of work, once trying to replay. There was a lot of adding and removing of event listeners.

I'd like to think I could write less code, however at the time of creating it is used the tools that I knew and had available.

I'm pretty sure there are a few little bugs here and there, but finding them is difficult.

I would like to include more validation. A review by a UX designer would really help!.

##WILL I ADD NEW FEATURES
I started looking at having a local leader board.  Which would be good to see, however a global leader board would be much more useful, so I've left that idea for the time being.

I had plans to have a foot that you could pull the toes off and also a tictac container you could shake to get the counters out. Both of which are probably a bit out of my depth of knowledge at the moment. I will play around with this idea.



### To Do List
- [x] Create files/folders
    - [x] Create boiler plate, and check all work.

- [x] Create html Game Board
    - [x] within its own gameboard container
    - [x] 3x3 Grid - 9 square DIVS (could be media queried)
    - [x] Border Styling
    - [x] CSS - not first/last
    - [x] Display: Grid?
    - [x] Each cell has an ID and a class of cell for styling.

- [x] Make gameboard interactive
    - [x] event listeners on each cell
    - [x] click changes text content to X or O alternatively

- [x] Create an array of arrays of winning options

- [x] Create an array for each of the players moves. This will get pushed to with the cell ID each time the player clicks.

- [x] Create game logic, if the players array includes a combo of any of the winning options then that player wins.
    - [x] loop through the winning options each time the player plays.
    - [x] check to see if they match.
    - [x] if they match display the winner.
    - [x] add to a win count for each player

- [x] Make the gameboard cells to receive dropped elements.

- [x] Create 5x dragable elements for each player.

- [x] If the element is dropped in a cell it adds to the players play list.

- [x] Styles 
    - [x] the dragable elements with tic-tacs or toes.
    - [x] headings etc.
    - [x] inputs for player names

#STYLES BROKEN DOWN

- [x] Create 3 100% divs, with buttons that link back and forward with a transition. **Maybe not back and forward**

#EXTRA HTML/JS

- [x] Input for players to put in their names
- [x] Option to choose their tokens
- [x] Grid where they can drag their tokens over to the board 
- [x] Once square dropped in, no longer droppable!

- [x] Create an option to allow players to insert usernames.

- [x] Upload to github pages
