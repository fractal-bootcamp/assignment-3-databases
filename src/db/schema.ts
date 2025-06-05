import { jsonb, pgTable, varchar } from "drizzle-orm/pg-core";
import type { Board } from "../game";

export const gamesTable = pgTable("tic_tac_toe_games", {
    id: varchar({ length: 255 }).primaryKey(),
    player1: varchar({ length: 255 }).notNull(),
    player2: varchar({ length: 255 }).notNull(),
    currentPlayer: varchar({ length: 255 }).notNull(),
    board: jsonb().$type<Board>().notNull(),
    result: varchar({ length: 255 }),
});
