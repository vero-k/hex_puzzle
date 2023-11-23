import {useState, useEffect, useContext} from 'react';
import {BaseFloor} from './BaseFloor';
import {GroundFloor} from './GroundFloor';
import { useThree } from "@react-three/fiber";

import GameContext from '../context/GameContext';


export default function Board(props: any){

    const [currentViewPosition, setCurrentViewPosition] = useState()
    const [currentViewRotation, setCurrentViewRotation] = useState()


    const {
        currentConstellation, setCurrentConstellation,
        hexTable,
    } = useContext(GameContext)


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

        // set all neighbors to the current (former tile) to regular
        currentConstellation.neighboursToCurrent.forEach((i: number) => {
            const neighbour= hexTable.get(i)
            neighbour.status = "regular"
        })

        const nextCurrentTile = currentTile
        const nextCurrentHex = hexTable.get(nextCurrentTile)
        const nextCurrentNeighbours = nextCurrentHex.neighbours

        nextCurrentNeighbours.forEach((i: number) => {
            if(!currentConstellation.currentHexBase.includes(i)){
                currentConstellation.currentHexBase.push(i)
            }
            if(!currentConstellation.currentHexGround.includes(i)){
                currentConstellation.currentHexGround.push(i)
            }
            if(!currentConstellation.currentHexComplete.includes(i)){
                currentConstellation.currentHexComplete.push(i)
            }
            
            const neighbour = hexTable.get(i)
            neighbour.status = "neighbour"
        })
        

        currentConstellation.currentTile = nextCurrentTile
        currentConstellation.neighboursToCurrent = nextCurrentNeighbours

        nextCurrentHex.status = "current"
        setCurrentConstellation(prev => ({
            ...prev,
            currentTile: nextCurrentTile
        }))
    }

    

    return(
        
        <group
            rotation={[0, 0, 0]}
            position={[-10, 2, 0]}
            scale={[1, 1, 1]}
        >
            

            <GroundFloor 
                {...props}
                key={currentConstellation.currentTile*10 + 1}
                makeAStep={makeAStep}
            />

            <BaseFloor 
                {...props}
                key={currentConstellation.currentTile*10 + 2}
            />


        </group>
    )

    
}