import { Button
 } from "react-bootstrap"



export const GameHeader = (props: any) => {
    return (
        <>
            <Button variant="primary" onClick={props.modalctrl}>
            {'Exit Game'}
            </Button>
        </>
    )
}