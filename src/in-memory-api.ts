import type { TicTacToeApi } from "./api"
import type { GameState } from "./game"
import { createGame as createNewGame, makeMove } from './game'

export class InMemoryTicTacToeApi implements TicTacToeApi {
    private games = new Map<string, GameState>()

    async createGame(): Promise<GameState> {
        const game = createNewGame()
        this.games.set(game.id, game)
        return Promise.resolve(game)
    }

    async makeMove(gameId: string, row: number, col: number): Promise<GameState> {
        const game = this.games.get(gameId)
        if (!game) {
            return Promise.reject("Game not found?")
        }
        const newGame = makeMove(game, row, col)
        this.games.set(gameId, newGame)
        return Promise.resolve(newGame)
    }

    async getGame(gameId: string): Promise<GameState | undefined> {
        return Promise.resolve(this.games.get(gameId))
    }
}