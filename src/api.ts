import type { GameState } from "./game"
export interface TicTacToeApi {
    createGame(): Promise<GameState>
    makeMove(gameId: string, row: number, col: number): Promise<GameState>
    getGame(gameId: string): Promise<GameState | undefined>
}
