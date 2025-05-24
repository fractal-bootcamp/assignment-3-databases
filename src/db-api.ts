import type { TicTacToeApi } from "./api"
import type { GameResult, GameState, Player } from "./game"
import { createGame as createNewGame, makeMove } from "./game";
import 'dotenv/config';
import { drizzle } from 'drizzle-orm/postgres-js';
import { eq } from 'drizzle-orm';
import { ticTacToeTable } from './db/schema';

export class DatabaseTicTacToeApi implements TicTacToeApi {
    private db = drizzle(process.env.DATABASE_URL!);

    async createGame(): Promise<GameState> {
        const game = createNewGame()
        const values: typeof ticTacToeTable.$inferInsert = game
        await this.db.insert(ticTacToeTable).values(values)
        return game
    }

    async makeMove(gameId: string, row: number, col: number): Promise<GameState> {
        const game = await this.getGame(gameId)
        if (!game) {
            return Promise.reject("Game not found?")
        }
        const updatedGame = makeMove(game, row, col)
        await this.db.update(ticTacToeTable)
            .set(updatedGame)
            .where(eq(ticTacToeTable.id, gameId))
        return updatedGame
    }

    async getGame(gameId: string): Promise<GameState | undefined> {
        console.log("get game in db", gameId)
        const result = await this.db.select().from(ticTacToeTable).where(eq(ticTacToeTable.id, gameId))
        if (result.length == 0) {
            return Promise.resolve(undefined)
        }

        const row = result[0]
        return {
            id: row.id,
            currentPlayer: row.currentPlayer as Player,
            board: row.board,
            result: row.result as GameResult
        }
    }
}