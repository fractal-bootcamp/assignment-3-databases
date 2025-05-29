import  { type GameState, createGame as createGameState, makeMove as makeGameMove} from "./game";

export interface TicTacToeApi {
    createGame(): Promise<GameState>
    makeMove(gameId: string, row: number, col: number): Promise<GameState>
    getGame(gameId: string): Promise<GameState>
}

export class InMemoryTicTacToeApi implements TicTacToeApi {
    private games: Map<string, GameState> = new Map()

    async createGame(): Promise<GameState> {
        const game = createGameState()
        this.games.set(game.id, game)
        return game;
    }

    async getGame(gameId: string): Promise<GameState> {
        const game = this.games.get(gameId)
        if (!game) {
            throw new Error("Game not found")
        }
        return game;
    }

    async makeMove(gameId: string, row: number, col: number): Promise<GameState> {
        const game = await this.getGame(gameId)
        const newGame = makeGameMove(game, row, col)
        this.games.set(gameId, newGame)
        return newGame
    }
}