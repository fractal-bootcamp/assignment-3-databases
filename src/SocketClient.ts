import { io, type Socket } from "socket.io-client";
import type { GameState } from "./game";
import { GAME_JOIN_EVENT, GAME_UPDATED_EVENT, GAME_MOVE_EVENT } from "./constants";

class SocketClient {
    private socket: Socket | null = null;

    connect(gameId: string, playerName: string): Promise<[GameState, number]> {
        return new Promise((resolve, reject) => {
            this.socket = io("http://localhost:3000");
            
            this.socket.on("connect", (w) => {
                this.socket?.emit(GAME_JOIN_EVENT, gameId, playerName, (game: GameState, playerIndex: number) => {
                    if (game && playerIndex >= 0) {
                        resolve([game, playerIndex]);
                    } else {
                        reject(new Error("Failed to join game"));
                    }
                });
            });
            
            this.socket.on("error", (error) => {
                reject(new Error(typeof error === 'string' ? error : "Connection error"));
            });
            
            this.socket.on("connect_error", () => {
                reject(new Error("Failed to connect to server"));
            });
        });
    }

    disconnect() {
        this.socket?.disconnect();
        this.socket = null;
    }

    onUpdate(callback: (game: GameState) => void) {
        this.socket?.on(GAME_UPDATED_EVENT, (game: GameState) => {
            callback(game);
        });
    }
    
    makeMove(gameId: string, row: number, col: number): Promise<GameState> {
        return new Promise((resolve, reject) => {
            if (!this.socket) {
                reject(new Error("Not connected to server"));
                return;
            }
            
            this.socket.emit(GAME_MOVE_EVENT, gameId, row, col, (game: GameState | null, error: string | null) => {
                if (error) {
                    reject(new Error(error));
                } else if (game) {
                    resolve(game);
                } else {
                    reject(new Error("Unknown error occurred"));
                }
            });
        });
    }
}

export default SocketClient;
