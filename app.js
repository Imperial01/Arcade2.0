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
let playerBox = document.getElementById('players-container')
let cellEl = document.getElementsByClassName('cells')
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
            return title.innerHTML = winComboA + "  you  win!";
        } 
        if (!gameState.board.includes(null)){
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

function computerMove() {
    let randomNum = Math.floor(Math.random() * 9);
    for (let i = 0; i < gameState.board.length; i++) {
        if(gameState.board[i] == null && gameState.board[i] !== " ")
        gameState.board[randomNum] = gameState.player
    }
}
//-----Event Listener-----
board.addEventListener('click', markCell) // made a markCell() to mark a html elem and change the innerHTML to my player. 
function markCell(event) {
    //let cellEl = document.getElementsByClassName('cells')
    let mark = event.target
    let cellNum = mark.dataset.cell// wanted to get the cell number I clicked on
    if (board.dataset.mode == null)
    return
    if (gameState.board[cellNum] == null && board.dataset.mode === "players") {
        gameState.board[cellNum] = gameState.player
        playerHandler();
    }
    if (gameState.board[cellNum] == null && board.dataset.mode === "computer") {
        gameState.board[cellNum] = gameState.player
        playerHandler();
        computerMove();
    }
    renderboard();
    checkWinner(); // then render it to show what I added to board 
    console.log(gameState.board)
    
}
//-------SUBMIT-----
let playerNav = document.getElementById('players-display')
let enterPlayers = document.getElementById('submit');
let player1 = document.getElementById('player-1');
let player2 = document.getElementById('player-2');
enterPlayers.addEventListener('click', function (e) {
    e.preventDefault();
    if (board.dataset.mode === "players")
        playerNav.innerHTML = player1.value + " VS " + player2.value //displays players
    if (board.dataset.mode === "computer") {
        playerNav.innerHTML = player1.value + " VS Computer"
        
    }
    board.addEventListener('click', markCell)
})

//-----RESET---------
let newGame = document.getElementById('reset')
newGame.addEventListener('click', function (e) {
    title.innerHTML = 'Tic-Tac-Toe'
    playerNav.innerHTML = ''
    e.preventDefault();
    gameState.board = [null, null, null, null, null, null, null, null, null];
    renderboard();
})

//---- ONE PLAYER HANDLER---
let oneUser = document.getElementById('one-player');
oneUser.addEventListener('click', function (e) {
    e.preventDefault();
    playerBox.style.display = "flex"
    player2.style.display = 'none';
    board.dataset.mode = "computer"
})

//---- TWO PLAYER HANDLER----
let twoUsers = document.getElementById('two-player');
twoUsers.addEventListener('click', function (e) {
    e.preventDefault();
    playerBox.style.display = "flex"
    player1.style.display = 'flex';
    player2.style.display = 'flex';
    board.dataset.mode = "players"
})