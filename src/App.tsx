
import './style/App.css';
import 'bootstrap/dist/css/bootstrap.min.css'

import { Route, Routes } from "react-router-dom"

import { GameProvider } from './components/context/GameProvider';

import Home from './components/start/Home'
import Start from './components/start/Start'
import Loading from './components/start/Loading'
import {Game} from './components/game/Game'
import Begin from './components/start/Begin'

export default function App() {

  return (
    <GameProvider>
      <Routes>
        <Route path='/game' element={<Game />} />
        <Route path="/loading" element={<Loading />} />
        <Route path="/chooseImage" element={<Start />} />
        <Route path="/begin" element={<Begin />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </GameProvider>
  )
}
