
import { useFrame, useThree, } from '@react-three/fiber';
import { useRef, useState, useEffect, useContext } from 'react';
import { Mesh } from 'three';
import { Selection, Select, EffectComposer, Outline } from '@react-three/postprocessing'

import GameContext from '../context/GameContext';
////

interface HexState {
  regular: number,
  current: number,
  neighbour: number,
}

interface MouseState {
  mouseOut: HexState,
  mouseIn: HexState,
}


const groundColors: MouseState = {
  mouseOut : {
    regular: 0xffffff,
    current: 0xffffff,
    neighbour: 0xffffff,
  },
  mouseIn : {
    regular: 0xaaaaaa,
    current: 0xbbbbbb,
    neighbour: 0xcccccc,
  }
}



//////

export function GroundHex(props: any) {

  const refGroundTile = useRef<Mesh>(null!);


  const tkey = props.tkey;
  const [status, setStatus] = useState(props.status)
  const [groundColor, setGroundColor] = useState(groundColors.mouseOut[props.status as keyof HexState])
  const {gridConstants } = useContext(GameContext)


  // event handlers

  const handlePointerEnter = () => {
    setGroundColor(groundColors.mouseIn[status as keyof HexState])
  }

  const handlePointerLeave= () => {
    setGroundColor(groundColors.mouseOut[status as keyof HexState])
  }

  const handleClick = (props: any, e: any) => {
    if(status === 'neighbour'){
      let shadowProps = props;
      props.makeAStep(tkey)
    }
  }

  useFrame(({clock}) => {

    if(status !== "regular"){
      const a = clock.getElapsedTime() 
      refGroundTile.current.position.y = Math.abs(0.2 * (Math.sin(3 * a)))
    }
    
  });


  return (

    <group
      {... props}
      ref={refGroundTile}

      receiveShadow={true}
      status={status}

      onClick={(e) => handleClick(props, e)}
      onPointerEnter={handlePointerEnter} // see note 1
      onPointerLeave={handlePointerLeave} // see note 1
    >
      <Select enabled={status==="neighbour"}>
      <mesh 
        
        >

        <cylinderGeometry args={[gridConstants.hexRadius, gridConstants.hexRadius, 0.1, 6]} />

        <meshPhysicalMaterial 
          transparent={true}
          opacity={0.1}
          transmission={0.9}  
          color={groundColor}
          sheen={0.5}
        />
        
      </mesh>


      </Select>
    </group>
    
  );
  
}




export function GroundFloor(props: any) {

  
  const {currentConstellation} = useContext(GameContext)
  const {hexTable} = useContext(GameContext)

  return (
    <group
      {...props}
      key={currentConstellation.currentTile}
      position={[0, 0.2, 0]}
    >
        {currentConstellation.currentHexGround.map((hexKey: number) => {
          const hex = hexTable.get(hexKey)
          return (
            <GroundHex
              {...props}
              key={hex.tkey}
              tkey={hex.tkey}
              x= {hex.gridX}
              y={hex.gridY}
              position={[hex.posX, hex.posY, hex.posZ]}
              rotation={[0, - Math.PI / 6, 0]}
              status={hex.status}
            />
          )
        }
            
        )}

    </group>
    
  );


}
