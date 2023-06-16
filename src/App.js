import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
const rowStyle = {
  display: 'flex'
}
const squareStyle = {
  'width': '60px',
  'height': '60px',
  'backgroundColor': '#ddd',
  'margin': '4px',
  'display': 'flex',
  'justifyContent': 'center',
  'alignItems': 'center',
  'fontSize': '20px',
  'color': 'white'
}
const boardStyle = {
  'backgroundColor': '#eee',
  'width': '208px',
  'alignItems': 'center',
  'justifyContent': 'center',
  'display': 'flex',
  'flexDirection': 'column',
  'border': '3px #eee solid'
}
const containerStyle = {
  'display': 'flex',
  'alignItems': 'center',
  'flexDirection': 'column'
}
const instructionsStyle = {
  'marginTop': '5px',
  'marginBottom': '5px',
  'fontWeight': 'bold',
  'fontSize': '16px',
}
const buttonStyle = {
  'marginTop': '15px',
  'marginBottom': '16px',
  'width': '80px',
  'height': '40px',
  'backgroundColor': '#8acaca',
  'color': 'white',
  'fontSize': '16px',
}
function Square({ value, onClick }) {
  return (
    <div
      className="square"
      style={squareStyle} onClick={onClick}>
      {value}
    </div>
  );
}
function Board() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [winner, setWinner] = useState(null);
  const handleClick = (index) => {
    if (board[index] === null && !winner) {
      const newBoard = [...board];
      newBoard[index] = currentPlayer;
      setBoard(newBoard);
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
      checkWinner(newBoard)
    }
  }
  const checkWinner = (board) => {
    const winningCombinations = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]
    ]
    for (let combination of winningCombinations) {
      const [a, b, c] = combination;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setWinner(board[a]);
        break;
      }
    }
  }
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer('X');
    setWinner(null);
  }
  const renderSquare = (index) => {
    return (
      <Square value={board[index]} onClick={() => handleClick(index)} />
    )
  }
  return (
    <div style={containerStyle} className="gameBoard">
      <div id="statusArea" className="status" style={instructionsStyle}>Next player: <span>{currentPlayer}</span></div>
      {winner && <div id="winnerArea" className="winner" style={instructionsStyle}>Winner: <span>{winner}</span></div>}
      <button style={buttonStyle} onClick={resetGame}>Reset</button>
      <div style={boardStyle}>
        <div className="board-row" style={rowStyle}>
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="board-row" style={rowStyle}>
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="board-row" style={rowStyle}>
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>
    </div>
  );
}
export const  Game=() =>{
  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
    </div>
  );
}
