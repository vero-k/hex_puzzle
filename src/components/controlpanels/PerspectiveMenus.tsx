import Button from 'react-bootstrap/Button'
import {useState, useContext} from 'react'
import { PerspectiveContext } from '../game/Game'


export const PerspectiveMenus = (props: any) => {

    const perspective = useContext(PerspectiveContext)

    return(<>
    
        <Button variant="primary" onClick={() => togglePerspective()}>
                {"change to " + perspective}
        </Button>

    </>)
}