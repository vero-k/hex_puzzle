
import { useContext } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import MenuContext from '../context/MenuContext';
import GameContext from '../context/GameContext';

import {PerspectiveMenus} from '../controlpanels/PerspectiveMenus'

export const GameFooter = (props: any) => {


    const {gridConstants, gameStats} = useContext(GameContext)
    const {changePerspective} = useContext(MenuContext)

    const togglePerspective = () => changePerspective(prev => ((prev === "bird's view")? "first person view":"bird's view"))

    return (
        <Container>
            <Row>
                <Col
                    style={{
                        alignContent: "center"
                      }}
                >
                    <Row>
                    {"width: " + gridConstants.gridWidthCount.toString()}
                    </Row>
                    <Row>
                    {"height: " + gridConstants.gridHeightCount.toString()}
                    </Row>
                </Col>
                <Col
                    style={{
                        alignContent: "center"
                      }}
                >
                    <Row>
                    {"level: " + gameStats.level.toString()}
                    </Row>
                    <Row>
                    {"difficulty: " + gameStats.difficulty.toString()}
                    </Row>
                    
                    
                </Col>
                <Col>
                    <PerspectiveMenus
                    togglePerspective={togglePerspective}
                    />
                </Col>
            </Row>
        </Container>
        
    )
}