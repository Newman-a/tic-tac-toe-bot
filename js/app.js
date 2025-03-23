const gameBoard = document.querySelector('.game__board');
const messageTurn = document.querySelector('.game__turn');
const endGame = document.querySelector('.endgame');
const endGameResult = document.querySelector('.endgame__result');
const buttonReset = document.querySelector('.endgame__button');

// Inicio
const play = document.querySelector('.play__button');
const playshow = document.querySelector('.play');

// Nombre de los jugadores
const nameXO = document.querySelector('.name');

play.addEventListener('click', () => {
    playshow.classList.remove('play--mostrar');
    startGame();
});

let isTurnX = true;
let turn = 0;
let maxTurn = 9;
let players = {
    x: "cross",
    o: "circle"
};

// Clase para el bot
class Bot {
    constructor(player) {
        this.player = player; // 'cross' o 'circle'
    }

    makeMove(cells) {
        const availableCells = Array.from(cells).filter(cell => !cell.classList.contains('cross') && !cell.classList.contains('circle'));
        if (availableCells.length > 0) {
            const bestMove = this.getBestMove(cells);
            bestMove.click();
        }
    }

    getBestMove(cells) {
        const board = Array.from(cells).map(cell => {
            if (cell.classList.contains('cross')) return 'X';
            if (cell.classList.contains('circle')) return 'O';
            return null;
        });

        let bestScore = -Infinity;
        let bestMove;

        for (let i = 0; i < board.length; i++) {
            if (board[i] === null) {
                board[i] = 'O'; // El bot es 'O'
                const score = this.minimax(board, 0, false);
                board[i] = null;

                if (score > bestScore) {
                    bestScore = score;
                    bestMove = cells[i];
                }
            }
        }

        return bestMove;
    }

    minimax(board, depth, isMaximizing) {
        const winner = this.checkWinner(board);

        if (winner === 'O') return 10 - depth; // El bot gana
        if (winner === 'X') return depth - 10; // El jugador humano gana
        if (this.isBoardFull(board)) return 0; // Empate

        if (isMaximizing) {
            let bestScore = -Infinity;
            for (let i = 0; i < board.length; i++) {
                if (board[i] === null) {
                    board[i] = 'O';
                    const score = this.minimax(board, depth + 1, false);
                    board[i] = null;
                    bestScore = Math.max(score, bestScore);
                }
            }
            return bestScore;
        } else {
            let bestScore = Infinity;
            for (let i = 0; i < board.length; i++) {
                if (board[i] === null) {
                    board[i] = 'X';
                    const score = this.minimax(board, depth + 1, true);
                    board[i] = null;
                    bestScore = Math.min(score, bestScore);
                }
            }
            return bestScore;
        }
    }

    checkWinner(board) {
        const winnerCombination = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Filas
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columnas
            [0, 4, 8], [2, 4, 6] // Diagonales
        ];

        for (const combination of winnerCombination) {
            const [a, b, c] = combination;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a]; // Devuelve 'X' o 'O'
            }
        }

        return null; // No hay ganador
    }

    isBoardFull(board) {
        return board.every(cell => cell !== null); // Verifica si el tablero está lleno
    }
}

const bot = new Bot(players.o); // Crear una instancia del bot para el jugador 'O'

function startGame() {
    createBoard();
    messageTurn.textContent = isTurnX ? `X` : `O`;
    isTurnX = true;
    turn = 0;
    endGame.classList.remove('show');

    if (!isTurnX) {
        bot.makeMove(document.querySelectorAll('.cell')); // El bot hace su movimiento si es su turno
    }
}

function createBoard() {
    const cells = 9;

    while (gameBoard.firstElementChild) {
        gameBoard.firstElementChild.remove();
    }

    for (let i = 0; i < cells; i++) {
        const div = document.createElement('div');
        const design = ['clase-0', 'clase-1', 'clase-2', 'clase-3', 'clase-4', 'clase-5', 'clase-6', 'clase-7', 'clase-8'];

        div.classList.add('cell');

        for (let j = 0; j <= design.length; j++) {
            if (i === j) {
                div.classList.add(design[j]);
            }
        }

        div.addEventListener('click', handleGame, { once: true });

        gameBoard.append(div);
    }
}

function handleGame(e) {
    const currentCell = e.currentTarget;
    const currentTurn = isTurnX ? players.x : players.o;

    turn++;
    drawShape(currentCell, currentTurn);

    if (checkWinner(currentTurn)) {
        return;
    }

    if (turn === maxTurn) {
        showEndgame(false);
    }

    changeTurn();

    if (!isTurnX && turn < maxTurn && !checkWinner(currentTurn)) {
        setTimeout(() => {
            bot.makeMove(document.querySelectorAll('.cell')); // El bot hace su movimiento después de que el jugador humano haya jugado
        }, 500); // Retraso para simular que el bot está "pensando"
    }
}

function drawShape(element, newClass) {
    element.classList.add(newClass);
}

function changeTurn() {
    isTurnX = !isTurnX;
    messageTurn.textContent = isTurnX ? `X` : `O`;
}

function checkWinner(currentPlayer) {
    const cells = document.querySelectorAll('.cell');

    const winnerCombination = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Filas
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columnas
        [0, 4, 8], [2, 4, 6] // Diagonales
    ];

    const winner = winnerCombination.some(combination => {
        if (combination.every(position => cells[position].classList.contains(currentPlayer))) {
            combination.forEach(position => {
                isTurnX ? cells[position].classList.add('crossWinner') : cells[position].classList.add('circleWinner');
            });
            return true;
        }
        return false;
    });

    if (winner) {
        showEndgame(true);
        return true;
    }

    return false;
}

function showEndgame(winner) {
    endGame.classList.add('show');

    if (winner) {
        endGameResult.textContent = `¡${isTurnX ? "X" : "O"} ha ganado el juego!😁👌`;
    } else {
        endGameResult.textContent = "¡Empate!";
    }
}

buttonReset.addEventListener('click', () => {
    startGame(); // Se reinicia el juego
    messageTurn.textContent = isTurnX ? `X` : `O`; // El mensaje de turno se reinicia
});