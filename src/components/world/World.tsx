import BackGround from "./BackGround"
import Board from "../board/Board"
import {Player} from "../player/Player"

import * as THREE from "three"

import { PerspectiveCamera, Sky } from "@react-three/drei"

import { Canvas, useThree} from "@react-three/fiber"
import { EffectComposer, DepthOfField, Bloom, Noise, Vignette } from '@react-three/postprocessing'


import { useRef, useState} from "react"
import { Controls } from '../controlpanels/Controls'


export const World = (props: any) => {

    console.log("render World")
    
    const [currentTile, setCurrentTileParent] = useState(props.currentConstellation.currentTile)

    return (
        <div
            style={{height:"80vh"}}
        >

            <Canvas>


                <Controls 
                    currentTile={currentTile}
                />
                
                

                <ambientLight color={"white"} intensity={0.5} />

                <primitive object={new THREE.AxesHelper(100)} />
                
                <Player />

                <PerspectiveCamera
                    position={[-2, 8, -10]}
                >

                <Board 
                {...props}
                rotation={[Math.PI /2, 0, 0]}
                position={[-10, -10, -10]}
                currentTile={currentTile}
                setCurrentTileParent={props.setCurrentTile}
                
                />
                
                </PerspectiveCamera>

            
            </Canvas>
        
        </div>
    )
}