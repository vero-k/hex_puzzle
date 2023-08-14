import {useState, useEffect} from 'react';
import {BaseFloor} from './BaseFloor';
import {GroundFloor} from './GroundFloor';
import { useThree } from "@react-three/fiber";


export default function Board(props: any){

    const [currentViewPosition, setCurrentViewPosition] = useState()
    const [currentViewRotation, setCurrentViewRotation] = useState()

    const [currentTile, setCurrentTile] = useState(0);


    function degree2rad(degree: number): number{
        return degree * (Math.PI / 180)
      }

    
      const {
        gl, // WebGL renderer
        scene, // Default scene
        camera, // Default camera
        size, // Bounds of the view (which stretches 100% and auto-adjusts)
        viewport, // Bounds of the viewport in 3d units + factor (size/viewport)
        mouse, // Current, centered, normalized 2D mouse coordinates
        raycaster, // Intternal raycaster instance
        clock, // THREE.Clock (useful for useFrame deltas)
        invalidate, // Invalidates a single frame (for <Canvas invalidateFrameloop />)
      } = useThree();
    

    let makeAStep: any = (currentTile: number) => {


        props.currentConstellation.neighboursToCurrent.forEach((i: number) => {
            const neighbour= props.hexTable.get(i)
            neighbour.status = "regular"
            console.log(neighbour)
        })

        const currTile = currentTile
        const currentHex = props.hexTable.get(currTile)
        const currNeighbours = currentHex.neighbours

        currNeighbours.forEach((i: number) => {
            if(!props.currentConstellation.currentHexBase.includes(i)){
                props.currentConstellation.currentHexBase.push(i)
            }
            if(!props.currentConstellation.currentHexGround.includes(i)){
                props.currentConstellation.currentHexGround.push(i)
            }
            if(!props.currentConstellation.currentHexComplete.includes(i)){
                props.currentConstellation.currentHexComplete.push(i)
            }
            
            const neighbour = props.hexTable.get(i)
            neighbour.status = "neighbour"
        })
        
        props.currentConstellation.currentTile = currTile
        props.currentConstellation.neighboursToCurrent = currNeighbours

        currentHex.status = "current"

        setCurrentTile(currentTile)
        props.setCurrentTileParent(currentTile)
    };

    useEffect(() => {
        
    })


    return(
        <group
            rotation={[0, 0, 0]}
            position={[0, 0, 0]}
        >
            

            <GroundFloor 
                {...props}
                key={currentTile*10 + 1}
                makeAStep={makeAStep}
                currentTile={currentTile}
            />

            <BaseFloor 
                {...props}
                key={currentTile*10 + 2}
                currentTile={currentTile}
            />


        </group>
    )

    
}