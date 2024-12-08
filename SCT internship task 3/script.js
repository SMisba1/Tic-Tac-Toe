const board = document.querySelector("#board");
const cells = document.querySelectorAll("[data-cell]");
const messageElement = document.querySelector("#message");
const winnerMessage = document.querySelector("#winner-message");
const restartButton = document.querySelector("#restart");
const playerVsPlayer = document.querySelector("#player-vs-player");
const playerVsComputer = document.querySelector("#player-vs-computer");

let isPlayerTurn = true; // true: 'X', false: 'O'
let isComputerMode = false;
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

// Event listeners for game modes
playerVsPlayer.addEventListener("click", () => startGame(false));
playerVsComputer.addEventListener("click", () => startGame(true));

// Start game
function startGame(computerMode) {
    isComputerMode = computerMode;
    resetBoard();
    messageElement.style.display = "none";
}

// Reset board
function resetBoard() {
    cells.forEach((cell) => {
        cell.classList.remove("taken", "x", "o");
        cell.textContent = "";
        cell.addEventListener("click", handleClick, { once: true });
    });
    isPlayerTurn = true;
}

// Handle click on a cell
function handleClick(e) {
    const cell = e.target;
    const currentClass = isPlayerTurn ? "x" : "o";

    placeMark(cell, currentClass);
    if (checkWin(currentClass)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        isPlayerTurn = !isPlayerTurn;
        if (isComputerMode && !isPlayerTurn) computerMove();
    }
}

// Place mark on cell
function placeMark(cell, currentClass) {
    cell.classList.add("taken", currentClass);
    cell.textContent = currentClass.toUpperCase();
}

// Check if current player wins
function checkWin(currentClass) {
    return winningCombinations.some((combo) =>
        combo.every((index) => cells[index].classList.contains(currentClass))
    );
}

// Check for draw
function isDraw() {
    return [...cells].every((cell) => cell.classList.contains("taken"));
}

// End the game
function endGame(draw) {
    if (draw) {
        winnerMessage.textContent = "It's a Draw!";
    } else {
        winnerMessage.textContent = `${isPlayerTurn ? "X" : "O"} Wins!`;
    }
    messageElement.style.display = "block";
}

// Computer move (random)
function computerMove() {
    const availableCells = [...cells].filter((cell) => !cell.classList.contains("taken"));
    const randomCell = availableCells[Math.floor(Math.random() * availableCells.length)];
    setTimeout(() => randomCell.click(), 500); // Add slight delay for realism
}

// Restart game
restartButton.addEventListener("click", resetBoard);
