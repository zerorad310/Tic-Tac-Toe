const Gameboard = (() => {
    let board = ['', '', '', '', '', '', '', '', ''];

    const getBoard = () => board;
    const resetBoard = () => board.fill('');
    
    const placeMarker = (index, marker) => {
        if (board[index] === '') {
            board[index] = marker;
            return true;
        }
        return false;
    };

    return { getBoard, placeMarker, resetBoard };
})();

const Player = (name, marker) => {
    return { name, marker };
};

const GameController = (() => {
    const player1 = Player('Human', 'X');
    const player2 = Player('Machine', 'O');
    let currentPlayer = player1;
    let gameOver = false;

    const switchPlayer = () => {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
    };

    const checkWinner = () => {
        const board = Gameboard.getBoard();
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6] // Diagonals
        ];

        for (const combination of winningCombinations) {
            const [a, b, c] = combination;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a]; // Return 'X' or 'O' as winner
            }
        }
        if (!board.includes('')) return 'Draw';
        return null;
    };

    const makeMove = (index) => {
        if (gameOver || !Gameboard.placeMarker(index, currentPlayer.marker)) return;
        DisplayController.render();
        const winner = checkWinner();
        if (winner) {
            gameOver = true;
            DisplayController.showResult(winner);
            return;
        }
        switchPlayer();
        if (currentPlayer === player2) {
            setTimeout(machineMove, 1000);        }
    };

    const machineMove = () => {
        const board = Gameboard.getBoard();
        let availableMoves = board.map((cell, index) => cell === '' ? index : null).filter(index => index !== null);
        if (availableMoves.length > 0) {
            const randomMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
            makeMove(randomMove);
        }
    };

    const restartGame = () => {
        Gameboard.resetBoard();
        gameOver = false;
        currentPlayer = player1;
        DisplayController.render();
        DisplayController.showResult('');
    };

    return { makeMove, restartGame };
})();

const DisplayController = (() => {
    const cells = document.querySelectorAll('.cell');
    const restartButton = document.getElementById('mainButton');
    const messageBox = document.createElement('div');
    messageBox.style.marginTop = '20px';
    messageBox.style.fontSize = '24px';
    messageBox.style.fontWeight = 'bold';
    document.body.appendChild(messageBox);

    const render = () => {
        const board = Gameboard.getBoard();
        cells.forEach((cell, index) => {
            cell.textContent = board[index];
            cell.style.fontSize = '4rem';
            cell.style.fontWeight = 'bold';
            cell.style.display = 'flex';
            cell.style.alignItems = 'center';
            cell.style.justifyContent = 'center';
        });
    };

    const showResult = (winner) => {
        if (winner === 'Draw') {
            messageBox.textContent = "It's a Draw!";
        } else if (winner) {
            messageBox.textContent = `${winner} Wins!`;
        } else {
            messageBox.textContent = '';
        }
    };

    cells.forEach((cell, index) => {
        cell.addEventListener('click', () => GameController.makeMove(index));
    });

    restartButton.addEventListener('click', GameController.restartGame);

    return { render, showResult };
})();

DisplayController.render();