import { Link, useLoaderData } from "react-router"
import type { GameState } from "./game"
import { useState } from "react"

export function GameLobby() {

    const { games: initialGames } = useLoaderData<{ games: GameState[] }>()

    const [games, setGames] = useState<GameState[]>(initialGames)

    return (
        <div>
            <h2>Game Lobby</h2>
            we got games, lots of games, hot fresh games
            {games.map(game => (
                <div key={game.id}>
                    <Link to={`/game/${game.id}`}>{game.id}</Link>
                </div>
            ))}
        </div>
    )
}
