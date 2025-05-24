import { integer, jsonb, pgTable, varchar } from "drizzle-orm/pg-core";
import type { Player, Board } from "../game";

export const ticTacToeTable = pgTable("tic_tac_toe", {
  id: varchar({ length: 255 }).notNull().primaryKey(),
  currentPlayer: varchar({ length: 255 }).notNull(),
  board: jsonb().$type<Board>().notNull(),
  result: varchar({ length: 255 }),
});