import { useState, useEffect, useMemo } from 'react'
import './App.css'
import type { GameState } from './game'
import { TicTacToeApiClient } from './api-client'

function App() {
  const apiClient = useMemo(() => new TicTacToeApiClient(), [])
  const [gameState, setGameState] = useState<GameState | null>(null)

  async function initializeGame() {
    const initialState = await apiClient.createGame()
    setGameState(initialState)
  }

  useEffect(() => {
    // note: this is called twice in development due to using StrictMode, which intentionally invokes
    // all effects twice (???)
    // in production, it's called once, due to the empty dependency array.
    initializeGame()
  }, [])

  const handleCellClick = async (row: number, col: number) => {
    if (gameState) {
      try {
        const updatedState = await apiClient.makeMove(gameState.id, row, col)
        setGameState(updatedState)
      } catch (error) {
        console.error('Failed to make move:', error)
      }
    }
  }

  if (!gameState) {
    return <div>Loading...</div>
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
