import BackGround from "./BackGround"
import Board from "../board/Board"
import {Player} from "../player/Player"

import * as THREE from "three"

import { PerspectiveCamera, Sky } from "@react-three/drei"

import { Canvas, useThree} from "@react-three/fiber"
import { EffectComposer, Selection, Outline, DepthOfField, Bloom, Noise, Vignette } from '@react-three/postprocessing'


import { useRef, useState, useContext} from "react"
import { Controls } from '../controlpanels/Controls'

import GameContext from "../context/GameContext"


export const World = (props: any) => {

    const { currentConstellation } = useContext(GameContext)
    const { setCurrentConstellation } = useContext(GameContext)


    return (
        <div className="canvas">

            <Canvas>

               
                
                {/* <BackGround 
                    rotation={[Math.PI /2, 0, 0]}
                    position={[-100, 10, 100]}
                />
 */}

                <ambientLight color={"white"} intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                <pointLight position={[-10, -10, -10]} />

                <primitive object={new THREE.AxesHelper(100)} /> 
                
                <Controls />
                <Player />

                <PerspectiveCamera
                    position={[-2, 8, -10]}
                >

                <Selection>
                        <EffectComposer multisampling={5} autoClear={false}>
                        <Outline blur visibleEdgeColor="pink" edgeStrength={50} width={500} />
                        </EffectComposer>

                <Board 
                {...props}
                rotation={[Math.PI /2, 0, 0]}
                position={[-10, -10, -10]}
                />
                </Selection>

                </PerspectiveCamera>
                
            
            </Canvas>
        
        </div>
    )
}