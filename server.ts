import express from "express";
import ViteExpress from "vite-express";
import { DbTicTacToeApi } from "./src/db/db";
import { ApiError, NotFoundError } from "./src/errors";

const app = express();
app.use(express.json());

const api = new DbTicTacToeApi();

app.get("/api/games", async (req, res) => {
    const games = await api.getGames();
    res.json(games);
});

app.get("/api/game/:gameId", async (req, res) => {
    const game = await api.getGame(req.params.gameId);
    res.json(game);
});

app.post("/api/game", async (req, res) => {
    const game = await api.createGame(req.body.player1, req.body.player2);
    res.json(game);
});

app.post("/api/game/:gameId/move", async (req, res) => {
    const game = await api.makeMove(req.params.gameId, req.body.row, req.body.col);
    res.json(game);
});

const jsonErrorHandler = (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    if (res.headersSent) {
        return next(err);
    }

    if (err instanceof NotFoundError) {
        res.status(404);
    } else {
        res.status(500);
    }

    res.json({
        status: res.statusCode,
        message: err.message,
    } as ApiError);
};

app.use(jsonErrorHandler);

ViteExpress.listen(app, 3000, () => console.log("Server is listening..."));
