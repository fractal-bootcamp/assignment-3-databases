import express from "express";
import ViteExpress from "vite-express";
import { InMemoryTicTacToeApi } from "./src/api";
import { DbTicTacToeApi } from "./src/db/db";
import expressWs from "express-ws";
import { WsRouter } from "./src/ws-router";
const app = express();
app.use(express.json())
expressWs(app)

const api = new DbTicTacToeApi()
const wsRouter = new WsRouter()
app.get("/api/games", async (_, res) => {
    const games = await api.getOpenGames()
    res.json(games)
})
app.get("/api/game/:gameId", async (req, res) => {
    const game = await api.getGame(req.params.gameId)
    res.json(game)
})
app.post("/api/game", async (req, res) => {
    const game = await api.createGame()
    res.json(game)
})
app.post("/api/game/:gameId/move", async (req, res) => {
    const game = await api.makeMove(req.params.gameId, req.body.row, req.body.col)
    res.json(game)
})
app.ws("/api/game/:gameId", async (ws, req) => {
    const gameId = req.params.gameId
    wsRouter.registerListener(gameId, ws)
    wsRouter.broadcastGameState(gameId, await api.getGame(gameId))
    ws.on("message", async (msg) => {
        const move = JSON.parse(msg.toString())
        const game = await api.makeMove(gameId, move.row, move.col)
        wsRouter.broadcastGameState(gameId, game)
    })
})

ViteExpress.listen(app, 3000, () => console.log("Server is listening..."));