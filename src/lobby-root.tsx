import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import LobbyList from './lobby-list.tsx'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <LobbyList />
    </StrictMode>,
)
