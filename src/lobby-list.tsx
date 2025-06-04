import { useEffect, useMemo, useState } from "react"
import { TicTacToeApiClient } from "./api"
import type { GameState } from "./game"

export default function LobbyList() {
    const api = useMemo(() => new TicTacToeApiClient(), [])
    const [gameList, setGameList] = useState<GameState[] | undefined>()
    async function initializeGame() {
        const initialState = await api.getOpenGames()
        setGameList(initialState)
    }

    function goToLobby(gameId: string) {
        window.location.href = `/game/${gameId}`
    }

    async function newGame() {
        const game = await api.createGame()
        goToLobby(game.id)
    }

    useEffect(() => {
        initializeGame()
    }, [])
    return (
        <div className="w-full min-h-screen flex flex-col items-center gap-4 font-family-sans py-8 overflow-y-auto">
            <div className="w-full flex flex-col items-center gap-4">
                <h1 className="text-2xl font-bold">Tic Tac Toe Lobby List</h1>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={newGame}>New Game</button>
            </div>
            {gameList ? (
                <div className="w-full flex flex-col items-center gap-4">
                    {gameList.map((game) => <LobbyCard key={game.id} game={game} onClick={() => goToLobby(game.id)} />)}
                </div>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    )
}

function LobbyCard({ game, onClick }: { game: GameState, onClick: () => void }) {
    return (
        <div className="w-3/4 bg-gray-100 p-4 rounded-md hover:bg-gray-200" onClick={onClick}>
            <p className="text-lg font-semibold">Lobby ID: {game.id}</p>
            <p className="text-md ">Current Player: {game.currentPlayer}</p>
        </div>
    )
}