import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, redirect, RouterProvider } from 'react-router'
import GameView from './GameView'
import { TicTacToeApiClient } from './api'
import { GameLobby } from './GameLobby.tsx'

const api = new TicTacToeApiClient()

const router = createBrowserRouter([
    {
        path: "/",
        Component: App,
        children: [
            {
                path: "/",
                Component: GameLobby,
                loader: async () => {
                    try {
                        const games = await api.getGames();
                        return { games };
                    } catch (error) {
                        console.error(error);
                        return { games: [] };
                    }
                },
            },
            {
                path: "/game/:gameId",
                Component: GameView,
                loader: async ({ params }) => {
                    const gameId = params.gameId;

                    if (!gameId) return redirect("/");

                    const game = await api.getGame(gameId);

                    if (!game) return redirect("/");

                    return { game };
                },
            },
        ],
    },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
