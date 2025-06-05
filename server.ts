import express from "express";
import ViteExpress from "vite-express";
import { DbTicTacToeApi } from "./src/db/db";

const app = express();
app.use(express.json())

const api = new DbTicTacToeApi()

app.get("/api/game/:gameId", async (req, res) => {
    const game = await api.getGame(req.params.gameId)
    res.json(game)
})
app.post("/api/game", async (req, res) => {
    const game = await api.createGame()
    res.json(game)
})

app.get("/api/games", async (req, res) => {
    const games = await api.getGames()
    res.json(games)
})

app.post("/api/game/:gameId/move", async (req, res) => {
    const game = await api.makeMove(req.params.gameId, req.body.row, req.body.col)
    res.json(game)
})

const PORT = parseInt(process.env.PORT || "3000");

ViteExpress.listen(app, PORT,
    () => console.log(`Server is listening at http://localhost:${PORT}`));
