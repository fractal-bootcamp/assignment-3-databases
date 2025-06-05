import { useState } from "react";
import type { GameState } from "./game"
import { TicTacToeApiClient } from "./api";
import { useLoaderData } from "react-router";

const api = new TicTacToeApiClient()

export function GameView() {

    const { game: initialGame } = useLoaderData<{ game: GameState }>()

    const [gameState, setGameState] = useState<GameState>(initialGame);

    const handleCellClick = async (row: number, col: number) => {
        const game = await api.makeMove(gameState.id, row, col);
        setGameState(game);
    }

    return (
        <div>
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
    )
}
