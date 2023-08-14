
import './style/App.css';
import 'bootstrap/dist/css/bootstrap.min.css'

import { Route, Routes } from "react-router-dom"

import Home from './Home'
import Start from './Start'


export default function App() {

  return (
    <Routes>
      
      <Route path="/start" element={<Start />} />
      <Route path="/" element={<Home />} />
      
    </Routes>
  )
}
