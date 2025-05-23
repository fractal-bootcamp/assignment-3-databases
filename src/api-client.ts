import type { TicTacToeApi } from "./api"
import type { GameState } from "./game"

export class TicTacToeApiClient implements TicTacToeApi {
    async createGame(): Promise<GameState> {
        const response = await fetch("/api/game")
        const gameState = await response.json()
        return gameState
    }

    async makeMove(gameId: string, row: number, col: number): Promise<GameState> {
        const response = await fetch(`/api/game/${gameId}/move`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ row, col }),
        })
        const gameState = await response.json()
        return gameState
    }

    async getGame(gameId: string): Promise<GameState> {
        const response = await fetch(`/api/game/${gameId}`)
        const gameState = await response.json()
        return gameState
    }
}