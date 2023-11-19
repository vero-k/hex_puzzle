
import { useContext, createContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from 'axios'

import { GameMenu } from "../controlpanels/GameMenu"
import { GameFooter } from "../controlpanels/GameFooter"

import { World } from '../world/World'

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import GameContext from "../context/GameContext"
import MenuContext from "../context/MenuContext"

import { baseURL } from "../context/Constants"


export const PerspectiveContext = createContext('birdview')


export function Game(props: any) {

  const navigate = useNavigate()

  const { gameStatus, setGameStatus,
    perspective, changePerspective,
    currentToolOp, setCurrentToolOp,} = useContext(MenuContext)


  const {
      baseImageFile, setBaseImageFile,
      baseImageString, setBaseImageString,
      userID, setUserID,
      userName, setUserName,
      gameID, setGameID,
      level, setLevel,
      gameStats, setGameStats,
      baseImgStats, setBaseImgStats,
      gridConstants, setGridConstants,
      gridImgAbsolutes, setGridImgAbsolutes,
      currentConstellation, setCurrentConstellation,
      hexArray, setHexArray,
      hexTable, setHexTable,
      baseImgTable, setBaseImgTable,
      modTrackerTable, setModTrackerTable,
      modTracker, setModTracker,
      tableRaster, setTableRaster,
      tableRaster2, setTableRaster2,
  } = useContext(GameContext)


  useEffect(() => {

    const handleUnload = async (e: any) => {

      await axios.get(baseURL + 'erase',  { params: { userID } });
    
      // Prevent the default action to ensure the request is sent
      e.preventDefault();
      e.returnValue = '';
    };

    window.addEventListener('beforeunload', handleUnload);

    return () => {
        window.removeEventListener('beforeunload', handleUnload);
    };

  }, [])

  
  useEffect(() => {

    if(gameStatus === 'off'){

      const handleUnload = async () => {
        await axios.get(baseURL + 'erase',  { params: { userID } });
      };
  
      handleUnload()
        setBaseImageFile(null)
        setBaseImageString(null)
        setGameID(null)
        setGameStats(null)
        setBaseImgStats(null)
        setGridConstants(null)
        setGridImgAbsolutes(null)
        setCurrentConstellation(null)
        setHexArray(null)
        setHexTable(null)
        setBaseImgTable(null)
        setModTrackerTable(null)
        setModTracker(null)
        setTableRaster(null)
        setTableRaster2(null)
        changePerspective("bird's view")
        setGameStatus('on')
        setCurrentToolOp('')
      navigate('/new_game')
  
      window.addEventListener('beforeunload', handleUnload);
  
      return () => {
          window.removeEventListener('beforeunload', handleUnload);
      };

    }
    
  }, [gameStatus])


  return (
      <Container>
      <Row>
        <GameMenu/>
      </Row>
      <Row 
        style={{
          height: "80hv"
        }}
      >
      <World/>
      </Row>
      <Row>
      <PerspectiveContext.Provider value={perspective}>
          <GameFooter/>
      </PerspectiveContext.Provider>
      </Row>
    </Container>
  )
}
