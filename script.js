// шаблон модуля для доски с методами: установки символа в клетку, получения доски 
const Gameboard = () => {
    const board = [];
    const rows = 3;
    const columns =3;

    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let k = 0; k < columns; k++) {
            // задаем массив с объектами cell, который имеет свои методы для проверки значения и добавления символа в клетку
            board[i].push(Cell())
        }
    }
    const getBoard = () => board;

    const setSymbol = (row, column, player) => {
        if (board[row][column].getValue() === "") {
            board[row][column].addSymbol(player);
        }
    }
    const getSymbol = (row, column) => {
        return board[row][column].getValue()
    }
    // метод чтобы вывести 2d массив с значениями в консоль
    const printBoard = () => {
        const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()))
        console.log(boardWithCellValues);
    };

    return {
        getBoard,
        setSymbol,
        printBoard,
        getSymbol
    };
};

//объект cell через фабричную функцию
function Cell() {
    let value = "";

    const addSymbol = (player) => {
        value = player;
    };

    const getValue = () => value;

    return {
        addSymbol,
        getValue
    };
}

const GameController = (playerOneName = "Player X", playerTwoName = "Player O")  => {
    const board = Gameboard();

    const players = [
        {
            name:  playerOneName,
            token: "x"
        },
        {
            name: playerTwoName,
            token: "o"
        }
    ];

    let activePlayer = players[0];

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };

    const getActivePlayer = () => activePlayer;

    const printNewRound = () => {
        board.printBoard();
        console.log(`${getActivePlayer().name}'s turn.`);
    };

    const playRound = (row, column) => {
        console.log(`${getActivePlayer().name} makes move`);
        if (board.getSymbol(row, column) !== "") {
            console.log("This cell is already taken. Please choose another one.");
            return;
        }

        board.setSymbol(row, column, getActivePlayer().token)
        switchPlayerTurn();
        printNewRound();
    };

    printNewRound();

    return {
        playRound,
        getActivePlayer
    };


};

const game = GameController();


