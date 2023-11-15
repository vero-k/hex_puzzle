
import { useState, useMemo, useContext, createContext } from "react"


import { GameMenu } from "../controlpanels/GameMenu"
import { GameFooter } from "../controlpanels/GameFooter"

import { World } from '../world/World'

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import MenuProvider from '../context/MenuProvider';
import MenuContext from "../context/MenuContext";

export const PerspectiveContext = createContext('birdview')

export function Game(props: any) {

  return (
    <MenuProvider>
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
      <PerspectiveContext.Provider>
          <GameFooter/>
      </PerspectiveContext.Provider>
      </Row>
    </Container>
  </MenuProvider>

  )
}
