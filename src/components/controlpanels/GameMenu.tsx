

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

import MenuContext from '../context/MenuContext';
import { useContext, useState, useEffect} from 'react';



export const GameMenu = (props: any) => {

    const { setGameStatus } = useContext(MenuContext)
    const { gameStatus } = useContext(MenuContext)
    const [gameState, setGameState] = useState(gameStatus)
    

    const handleExit = () => {
      setGameStatus()
      setGameState()
    }

    const handleClickMirror = () => {
      props.setCurrentToolOp("mirror")
    }

    const handleClickWheel = () => {
      props.setCurrentToolOp("rotate")
    }

    const handleClickGlasses = () => {
      props.setCurrentToolOp("blur")
    }

    const handleClickWhisk = () => {
      props.setCurrentToolOp("blend")
    }

    const handleClickPaint = () => {
      props.setCurrentToolOp("colorinvert")
    }

    const handleClickShoo = () => {
      props.setCurrentToolOp("cat")
    }

    const handleClickWrench = () => {
      props.setCurrentToolOp("deform")
    }

    useEffect(() => {
      // erase 
    }, [setGameState])



    return (
        <Tabs
          defaultActiveKey="game"
          id="fill-tab-example"
          className="mb-3"
          fill
        >
          <Tab eventKey="game" title="Game">
            
            <ListGroup 
              horizontal
            >
              <ListGroup.Item>
              <OverlayTrigger
                  placement="bottom"
                  overlay={<Tooltip id="button-mirror">Reflect</Tooltip>}
                >
                  {({ ref, ...triggerHandler }) => (
                    <div
                      {...triggerHandler}
                      className={(props.currentToolOp === "mirror")? "active-toolbar-div":"toolbar-div"}
                      onClick={handleClickMirror}
                    >
                      <Image
                        ref={ref}
                        thumbnail
                        src="symbols/mirror.png"
                        className={"toolbar-img"}
                      />
                    </div>
                  )}
                </OverlayTrigger>
              </ListGroup.Item>
              <ListGroup.Item><OverlayTrigger
                  placement="bottom"
                  overlay={<Tooltip id="button-mirror">Blur</Tooltip>}
                >
                  {({ ref, ...triggerHandler }) => (
                    <div
                      {...triggerHandler}
                      className={(props.currentToolOp === "blur")? "active-toolbar-div":"toolbar-div"}
                      onClick={handleClickGlasses}
                    >
                      <Image
                        ref={ref}
                        thumbnail
                        src="symbols/glasses.png"
                        className={"toolbar-img"}
                      />
                    </div>
                  )}
                </OverlayTrigger></ListGroup.Item>
              <ListGroup.Item><OverlayTrigger
                  placement="bottom"
                  overlay={<Tooltip id="button-mirror">Blend</Tooltip>}
                >
                  {({ ref, ...triggerHandler }) => (
                    <div
                      {...triggerHandler}
                      className={(props.currentToolOp === "blend")? "active-toolbar-div":"toolbar-div"}
                      onClick={handleClickWhisk}
                    >
                      <Image
                        ref={ref}
                        thumbnail
                        src="symbols/whisk.png"
                        className={"toolbar-img"}
                      />
                    </div>
                  )}
                </OverlayTrigger></ListGroup.Item>
              <ListGroup.Item><OverlayTrigger
                  placement="bottom"
                  overlay={<Tooltip id="button-mirror">Deform</Tooltip>}
                >
                  {({ ref, ...triggerHandler }) => (
                    <div
                      {...triggerHandler}
                      className={(props.currentToolOp === "deform")? "active-toolbar-div":"toolbar-div"}
                      onClick={handleClickWrench}
                    >
                      <Image
                        ref={ref}
                        thumbnail
                        src="symbols/wrench.png"
                        className={"toolbar-img"}
                      />
                    </div>
                  )}
                </OverlayTrigger></ListGroup.Item>
                <ListGroup.Item><OverlayTrigger
                  placement="bottom"
                  overlay={<Tooltip id="button-mirror">Shooo Cat</Tooltip>}
                >
                  {({ ref, ...triggerHandler }) => (
                    <div
                      {...triggerHandler}
                      className={(props.currentToolOp === "cat")? "active-toolbar-div":"toolbar-div"}
                      onClick={handleClickShoo}
                    >
                      <Image
                        ref={ref}
                        thumbnail
                        src="symbols/shoo.png"
                        className={"toolbar-img"}
                      />
                    </div>
                  )}
                </OverlayTrigger></ListGroup.Item>
                <ListGroup.Item><OverlayTrigger
                  placement="bottom"
                  overlay={<Tooltip id="button-mirror">Wheel</Tooltip>}
                >
                  {({ ref, ...triggerHandler }) => (
                    <div
                      {...triggerHandler}
                      className={(props.currentToolOp === "rotate")? "active-toolbar-div":"toolbar-div"}
                      onClick={handleClickWheel}
                    >
                      <Image
                        ref={ref}
                        thumbnail
                        src="symbols/steering-wheel.png"
                        className={"toolbar-img"}
                      />
                    </div>
                  )}
                </OverlayTrigger></ListGroup.Item>
                <ListGroup.Item><OverlayTrigger
                  placement="bottom"
                  overlay={<Tooltip id="button-mirror">Color</Tooltip>}
                >
                  {({ ref, ...triggerHandler }) => (
                    <div
                      {...triggerHandler}
                      className={(props.currentToolOp === "colorinvert")? "active-toolbar-div":"toolbar-div"}
                      onClick={handleClickPaint}
                    >
                      <Image
                        ref={ref}
                        thumbnail
                        src="symbols/paint.png"
                        className={"toolbar-img"}
                      />
                    </div>
                  )}
                </OverlayTrigger></ListGroup.Item>
            </ListGroup>

          </Tab>
          <Tab eventKey="player" title="Player">
            
          </Tab>
          <Tab eventKey="settings" title="Settings">
      
          </Tab>
          <Tab eventKey="exit" title="Exit">
            <Button variant="primary" onClick={handleExit}>
                {'Exit Game'}
            </Button>
          </Tab>
    </Tabs>
    )
}