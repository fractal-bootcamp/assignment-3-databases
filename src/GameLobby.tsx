import { Link, useLoaderData, useNavigate } from "react-router"
import type { GameState } from "./game"
import { TicTacToeApiClient } from "./api"
import { useState } from "react"

const api = new TicTacToeApiClient();

function NewGame() {
    const navigate = useNavigate()

    const [player1, setPlayer1] = useState("Player 1")
    const [player2, setPlayer2] = useState("Player 2")

    const handleStartGame = async () => {
        const game = await api.createGame(player1, player2)
        navigate(`/game/${game.id}`)
    }

    return (
        <div id="new-game">
            <label htmlFor="player1Name">
                Player 1:
                <input
                    id="player1Name"
                    placeholder="Player 1"
                    value={player1}
                    onChange={(e) => setPlayer1(e.target.value)}
                />
            </label>

            <label htmlFor="player2Name">
                Player 2:
                <input
                    id="player2Name"
                    placeholder="Player 2"
                    value={player2}
                    onChange={(e) => setPlayer2(e.target.value)}
                    />
            </label>
            <button onClick={handleStartGame}>Start Game</button>
        </div>
    );
}

export function GameLobby() {
    const { games } = useLoaderData<{ games: GameState[] }>()

    const [startingNewGame, setStartingNewGame] = useState(false)

    return (
        <div>
            <h2>Game Lobby</h2>
            {startingNewGame && <NewGame />}
            {!startingNewGame && (
                <button onClick={() => setStartingNewGame(true)}>
                    New Game
                </button>
            )}
            <div id="games-list">
                {games.length === 0 && <div>No games</div>}
                {games.map((game) => (
                    <div key={game.id}>
                        <Link
                            to={`/game/${game.id}`}
                            className="game-item link"
                        >
                            {game.id}
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
