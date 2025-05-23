import express from "express";
import ViteExpress from "vite-express";
import { InMemoryTicTacToeApi } from "./src/in-memory-api";

const api = new InMemoryTicTacToeApi()
const app = express();
app.use(express.json());
app.get("/message", (_, res) => res.send("Hello from express!"));
app.get("/api/game", async (_, res) => {
    const game = await api.createGame()
    res.json(game)
})
app.post("/api/game/:gameId/move", async (req, res) => {
    const { gameId } = req.params
    const { row, col } = req.body
    const game = await api.makeMove(gameId, row, col)
    res.json(game)
})
app.get("/api/game/:gameId", async (req, res) => {
    const { gameId } = req.params
    const game = await api.getGame(gameId)
    res.json(game)
})


ViteExpress.listen(app, 3000, () => console.log("Server is listening..."));