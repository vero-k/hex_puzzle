
import { useState, useMemo } from "react"

import { Menu } from '../controlpanels/Menu'
import {PerspectiveMenu} from '../controlpanels/PerspectiveMenu'
import { EndGameModal } from "../controlpanels/EndGameModal"
import { GameHeader } from "../controlpanels/GameHeader"
import { World } from '../world/World'


export default function Game(props: any) {

  const [isBirdEye, setIsBirdEye] = useState(true)
  const [modalShow, setModalShow] = useState(false);


  return (
      <>

          <GameHeader 
            modalctrl={() => setModalShow(true)}
          />

          <EndGameModal 
            show={modalShow}
            onHide={() => setModalShow(false)}
          />

          <PerspectiveMenu 
            changePerspective={() => setIsBirdEye((prev) => {return !prev})}
          />

          

          <Menu {...props}
          />

        
          <World 
            {...props}
            isBirdEye={isBirdEye}
          />


      </>

  )
}
