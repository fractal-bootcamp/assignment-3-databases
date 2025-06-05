import { useEffect, useState } from "react";
import type { GameState } from "./game"
import { TicTacToeApiClient } from "./api";
import { useLoaderData } from "react-router";
import { io } from "socket.io-client";
import { GAME_UPDATED, USER_JOINED } from "../constants";

const api = new TicTacToeApiClient()

export function GameView() {

    const { game: initialGame } = useLoaderData<{ game: GameState }>()

    const [gameState, setGameState] = useState<GameState>(initialGame);

    const handleCellClick = async (row: number, col: number) => {
        const game = await api.makeMove(gameState.id, row, col);
        setGameState(game);
    }

    useEffect(() => {
        const socket = io("http://localhost:3000");
        socket.on("connect", () => {
            console.log("connected to socket");
            // Join the game room
            socket.emit("join-game", gameState.id);
            
            socket.on(USER_JOINED, (userId: string) => {
                console.log(`user ${userId} joined`);
            });
            socket.on(GAME_UPDATED, (game: GameState) => {
                console.log("game updated", game);
                setGameState(game);
            });
        });
        
        return () => {
            socket.disconnect();
        };
    }, [gameState.id]);

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
