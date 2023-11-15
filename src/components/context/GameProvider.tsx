import React, { useState } from 'react';
import GameContext from './GameContext';

import { HexImageTracker } from '../game/HexConcepts';

export const GameProvider = ({ children }) => { 

  const [baseImageFile, setBaseImageFile] = useState({})
  const [baseImageString, setBaseImageString] = useState({})

  const [userID, setUserID] = useState({})
  const [userName, setUserName] = useState({})

  const [gameStats, setGameStats] = useState()
  const [baseImgStats, setBaseImgStats] = useState()

  const [gridConstants, setGridConstants] = useState() //
  const [gridImgAbsolutes, setGridImgAbsolutes] = useState() //
  const [currentConstellation, setCurrentConstellation] = useState()
  const [hexArray, setHexArray] = useState()
  const [hexTable, setHexTable] = useState()
  const [baseImgTable, setBaseImgTable] = useState(new Map<number, HexImageTracker>())
  const [modTrackerTable, setModTrackerTable] = useState(new Map<number, Array<string>>())

  // The value prop is where you provide the data you want to distribute
  return (
    <GameContext.Provider value={{ 
        baseImageFile, setBaseImageFile,
        baseImageString, setBaseImageString,
        userID, setUserID,
        userName, setUserName,
        gameStats, setGameStats,
        baseImgStats, setBaseImgStats,
        gridConstants, setGridConstants,
        gridImgAbsolutes, setGridImgAbsolutes,
        currentConstellation, setCurrentConstellation,
        hexArray, setHexArray,
        hexTable, setHexTable,
        baseImgTable, setBaseImgTable,
        modTrackerTable, setModTrackerTable,
    }}>
      {children}
    </GameContext.Provider>
  );
};