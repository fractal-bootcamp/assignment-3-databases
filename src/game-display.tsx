import { useEffect, useMemo, useRef, useState } from 'react'
import './App.css'
import { type GameState } from './game'

function GameDisplay() {
  const gameId = window.location.pathname.split('/').pop()
  const [gameState, setGameState] = useState<GameState | undefined>()
  const ws = useMemo<WebSocket>(() => {
    const ws = new WebSocket(`/api/game/${gameId}`)
    ws.onmessage = (event) => {
      const move = JSON.parse(event.data)
      console.log(move)
      setGameState(move)
    }
    return ws
  }, [])

  async function handleCellClick(row: number, col: number) {
    ws.send(JSON.stringify({ row, col }))
  }

  if (!gameState) {
    return (
      <div>Loading...</div>
    )
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

export default GameDisplay
