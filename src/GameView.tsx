import type { GameState } from "./game";
import { useCallback, useMemo, useState } from "react";
import { TicTacToeApiClient } from "./api";
import { useLoaderData } from "react-router";

export function GameView() {
    const { game: initialGame } = useLoaderData()
    const api = useMemo(() => new TicTacToeApiClient(), [])

    const [game, setGame] = useState<GameState | undefined>(initialGame)

    const handleCellClick = useCallback(
        async (row: number, col: number) => {
            const newGame = await api.makeMove(game!.id, row, col);
            setGame(newGame);
        },
        [api, game]
    );

    if (!game) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div id="player-names">
                <h3>Players</h3>
                <div>{game.player1} (X) </div>
                <div>{game.player2} (O) </div>
            </div>
            {!game.result && (
                <div id="current-player">
                    {game.currentPlayer === "X" ? game.player1 : game.player2} (
                    {game.currentPlayer}) is playing
                </div>
            )}
            <div className="announcement">
                {game.result && (
                    <div>
                        {game.result === "Tie"
                            ? "Tie :("
                            : `Winner: ${game.result === 'X' ? game.player1 : game.player2}!`}
                    </div>
                )}
            </div>
            <div className="board">
                {game.board.map((row, rowIndex) => (
                    <div key={rowIndex} className="row">
                        {row.map((cell, colIndex) => (
                            <div
                                key={colIndex}
                                className="cell"
                                onClick={() =>
                                    handleCellClick(rowIndex, colIndex)
                                }
                            >
                                {cell}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </>
    );
}

export default GameView;
