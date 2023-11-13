
import './style/App.css';
import 'bootstrap/dist/css/bootstrap.min.css'

import { Route, Routes } from "react-router-dom"

import Home from './components/start/Home'
import Start from './components/start/Start'


export default function App() {

  return (
    <Routes>
      
      <Route path="/start" element={<Start />} />
      <Route path="/" element={<Home />} />
      
    </Routes>
  )
}
