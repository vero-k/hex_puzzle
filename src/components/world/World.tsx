import BackGround from "./BackGround"
import Board from "../board/Board"
import {Player} from "../player/Player"

import * as THREE from "three"

import { PerspectiveCamera, Sky } from "@react-three/drei"

import { Canvas, useThree} from "@react-three/fiber"
import { EffectComposer, DepthOfField, Bloom, Noise, Vignette } from '@react-three/postprocessing'


import { useRef, useState, useContext} from "react"
import { Controls } from '../controlpanels/Controls'

import GameContext from "../context/GameContext"


export const World = (props: any) => {

    const { currentConstellation } = useContext(GameContext)
    const { setCurrentConstellation } = useContext(GameContext)


    return (
        <div className="canvas">

            <Canvas>

                <Controls />
                

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
                />
                
                </PerspectiveCamera>

            
            </Canvas>
        
        </div>
    )
}