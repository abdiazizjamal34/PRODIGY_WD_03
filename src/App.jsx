import React, { useState } from 'react';
import './App.css';

function Square({ value, onClick }) {
  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  );
}

function Board({ players, onRestart }) {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  const handleClick = (index) => {
    if (squares[index] || calculateWinner(squares)) return;

    const newSquares = squares.slice();
    newSquares[index] = isXNext ? 'X' : 'O';
    setSquares(newSquares);
    setIsXNext(!isXNext);
  };

  const winner = calculateWinner(squares);
  const status = winner
    ? `Winner: ${winner === 'X' ? players.player1 : players.player2}`
    : `Next player: ${isXNext ? players.player1 : players.player2}`;

  const handleRestart = () => {
    setSquares(Array(9).fill(null));
    setIsXNext(true);
    onRestart();
  };

  return (
    <div>
      <div className="status">{status}</div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      {winner && <button className="restart-button" onClick={handleRestart}>Restart Game</button>}
    </div>
  );

  function renderSquare(i) {
    return <Square value={squares[i]} onClick={() => handleClick(i)} />;
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function App() {
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');
  const [gameStarted, setGameStarted] = useState(false);

  const startGame = () => {
    if (player1 && player2) {
      setGameStarted(true);
    }
  };

  const restartGame = () => {
    setGameStarted(false);
    setPlayer1('');
    setPlayer2('');
  };

  return (
    <div className="game">
      {!gameStarted ? (
        <div className="player-inputs">
          <div>
            <label>Player 1 (X): </label>
            <input
              type="text"
              value={player1}
              onChange={(e) => setPlayer1(e.target.value)}
            />
          </div>
          <div>
            <label>Player 2 (O): </label>
            <input
              type="text"
              value={player2}
              onChange={(e) => setPlayer2(e.target.value)}
            />
          </div>
          <button onClick={startGame}>Start Game</button>
        </div>
      ) : (
        <div className="game-board">
          <Board players={{ player1, player2 }} onRestart={restartGame} />
        </div>
      )}
    </div>
  );
}

export default App;
