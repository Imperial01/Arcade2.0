const gameState = {
    player: "X",
    board: [null, null, null, null, null, null, null, null, null]
}
const winCombo = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]

//--- DOM------
let title = document.getElementById('title')
let board = document.querySelector('#board-container');
let playerNav = document.getElementById('players-display')
let player1 = document.getElementById('player-1');
let player2 = document.getElementById('player-2');
let enterPlayers = document.getElementById('submit');
let newGame = document.getElementById('reset')

//----Render Function ------
function renderboard() {
    board.innerHTML = ''
    for (let i = 0; i < gameState.board.length; i++) {
        let square = gameState.board[i] // loop through the board
        let squares = document.createElement('div')
        squares.innerHTML = square
        squares.className = "cells"
        squares.dataset.cell = i
        board.appendChild(squares)
    }
}
renderboard();


function checkWinner() {
    for (let i = 0; i < winCombo.length; i++) { // i want to loop through the winCombo 
        let index = winCombo[i]
        let winComboA = gameState.board[index[0]] // get all the winCombo at first index 
        let winComboB = gameState.board[index[1]]// second index
        let winComboC = gameState.board[index[2]]// third index 
        if (winComboA && winComboA === winComboB && winComboA === winComboC) {
            board.removeEventListener('click', markCell)
            return title.innerHTML = winComboA + " you win!";
        } else if (!gameState.board.includes(null)) {
            board.removeEventListener('click', markCell)
            return title.innerHTML = "DRAW!";
        }
    }

}


//-----Helper Function----  needed this to switch between X and O 

function playerHandler() {
    if (gameState.player === "X") {
        gameState.player = "O"
    } else {
        gameState.player = "X"
    }
}
//-----Event Listener-----


board.addEventListener('click', markCell) // made a markCell() to mark a html elem and change the innerHTML to my player. 
function markCell(event) {
    let cellEl = document.getElementsByClassName('cells')
    let mark = event.target
    let cellNum = mark.dataset.cell// wanted to get the cell number I clicked on
    if (gameState.board[cellNum] == null) {
        gameState.board[cellNum] = gameState.player
    }
    // applied that dataset number to my board. "- 1" because my data-cell starts at 1 and I wanted to target my gamestate.board at the first index.
    playerHandler();
    checkWinner(); // then render it to show what I added to board 
    renderboard();
    console.log(gameState.board)
    console.log(cellEl)

}

enterPlayers.addEventListener('click', function (e) {
    e.preventDefault();
    playerNav.innerHTML = player1.value + " VS " + player2.value //displays players
})

newGame.addEventListener('click', function (e) {
    e.preventDefault();
    title.innerHTML = 'Tic-Tac-Toe'
    playerNav.innerHTML = ''
    gameState.board = [null, null, null, null, null, null, null, null, null];
    renderboard();
    
    
})