import 'dotenv/config';

import { drizzle } from 'drizzle-orm/postgres-js'
import type { TicTacToeApi } from '../api';
import  { type GameState, createGame as createGameState, makeMove as makeMoveState } from '../game';
import { gamesTable } from './schema';
import { eq } from 'drizzle-orm';
import postgres from 'postgres';
import { NotFoundError } from '../errors';

const client = postgres(process.env.SUPABASE_URL!)
const db = drizzle(client);

export class DbTicTacToeApi implements TicTacToeApi {
    async getGames(): Promise<GameState[]> {
        try {
            const results: GameState[] = await db.select().from(gamesTable) as GameState[]
            return results
        } catch (error) {
            console.error(error)
            throw new Error('Failed to get games')
        }
    }

    async createGame(player1: string, player2: string): Promise<GameState> {
        try {
            const game = createGameState(player1, player2)
            const values: typeof gamesTable.$inferInsert = game
            await db.insert(gamesTable).values(values)
            return game
        } catch (error) {
            console.error(error)
            throw new Error('Failed to create game')
        }
    }

    async makeMove(gameId: string, row: number, col: number): Promise<GameState> {
        try {
            const game = await this.getGame(gameId)
            const newGame = makeMoveState(game, row, col)
            const values: typeof gamesTable.$inferInsert = newGame
            await db.update(gamesTable).set(values).where(eq(gamesTable.id, gameId))
            return newGame
        } catch (error) {
            console.error(error)
            throw new Error('Failed to make move')
        }
    }

    async getGame(gameId: string): Promise<GameState> {
        const results = await db.select().from(gamesTable).where(eq(gamesTable.id, gameId)) as GameState[]
        if (results.length === 0) {
            throw new NotFoundError('Game not found')
        }
        const game = results[0]
        return game;
    }
}
