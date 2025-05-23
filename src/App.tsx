import { useState } from 'react'
import './App.css'
import { GameState, initialGameState, makeMove, getResult } from './game'

function App() {
  const [gameState, setGameState] = useState<GameState>(initialGameState)

  const handleCellClick = (row: number, col: number) => {
    setGameState(prev => makeMove(prev, row, col))
  }

  return (
    <>
      <div>
        <h1>Tic Tac Toe</h1>
        <div className="board">
          {gameState.board.map((row, rowIndex) => (
            <div key={rowIndex} className="row">
              {row.map((cell, colIndex) => (
                <div key={colIndex} className="cell" onClick={() => handleCellClick(rowIndex, colIndex)}>
                  {cell}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="announcement">
          {gameState.result && (
            <div>
              {gameState.result === 'Tie' ? 'Tie' : `Winner: ${gameState.result}`}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default App
