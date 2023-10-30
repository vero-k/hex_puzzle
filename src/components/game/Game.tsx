
import { useState, useMemo, useContext, createContext } from "react"


import { GameMenu } from "../controlpanels/GameMenu"
import { GameFooter } from "../controlpanels/GameFooter"

import { World } from '../world/World'

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


export const PerspectiveContext = createContext('birdview')

export function Game(props: any) {

  const [gameStatus, setGameStatus] = useState('on')
  const [perspective, changePerspective] = useState("bird's view")
  const [currentToolOp, setCurrentToolOp] = useState('')


  return (

      <Container
      
        
      >
      <Row>
        <GameMenu
          gameStatus={gameStatus}
          setGameStatus={setGameStatus}
          setCurrentToolOp={setCurrentToolOp}
        />
      </Row>
      <Row 
        style={{
          height: "80hv"
        }}
      >
      <World 
        {...props}
        isBirdEye={(perspective === "bird's view")? true:false}
        currentToolOp={currentToolOp}
      />
      </Row>
      <Row>
      <PerspectiveContext.Provider 
        value={perspective}
      >
          <GameFooter
            {...props}
            changePerspective={changePerspective}
          />
          
      </PerspectiveContext.Provider>
      </Row>
    </Container>


  )
}
