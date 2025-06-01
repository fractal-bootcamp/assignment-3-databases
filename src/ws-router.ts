import type { GameState } from "./game"

export class WsRouter {
    private listeners: Map<string, WebSocket[]> = new Map()

    public registerListener(gameId: string, listener: WebSocket) {
        if (!this.listeners.has(gameId)) {
            this.listeners.set(gameId, [])
        }
        this.listeners.get(gameId)!.push(listener)
    }

    public broadcastGameState(gameId: string, gameState: GameState) {
        if (!this.listeners.has(gameId)) {
            return
        }
        this.listeners.get(gameId)!.forEach((listener) => {
            listener.send(JSON.stringify(gameState))
        })
    }
    
}