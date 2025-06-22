import { useState } from 'react';
import './App.css';

function Square({ value, onClick }) {
  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  );
}

function Board({ squares, onClick }) {
  function renderSquare(i) {
    return <Square value={squares[i]} onClick={() => onClick(i)} key={i} />;
  }

  return (
    <div className="board">
      {[0, 1, 2].map(row => (
        <div className="board-row" key={row}>
          {renderSquare(row * 3)}
          {renderSquare(row * 3 + 1)}
          {renderSquare(row * 3 + 2)}
        </div>
      ))}
    </div>
  );
}

function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);

  const current = history[stepNumber];
  const winner = calculateWinner(current);

  function handleClick(i) {
    const newHistory = history.slice(0, stepNumber + 1);
    const currentSquares = [...newHistory[newHistory.length - 1]];
    if (winner || currentSquares[i]) return;
    currentSquares[i] = xIsNext ? 'X' : 'O';
    setHistory([...newHistory, currentSquares]);
    setStepNumber(newHistory.length);
    setXIsNext(!xIsNext);
  }

  function jumpTo(step) {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
  }

  const moves = history.map((_, move) => {
    const desc = move ? 'Ir para jogada #' + move : 'Início do jogo';
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  });

  let status = winner
    ? 'Vencedor: ' + winner
    : 'Próximo jogador: ' + (xIsNext ? 'X' : 'O');

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={current} onClick={handleClick} />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6],
  ];
  for (let [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default Game;
