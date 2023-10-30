
import { useFrame, useThree } from '@react-three/fiber';
import { useRef, useState, useEffect } from 'react';
import { Mesh } from 'three';


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
    regular: 0x7abf69,
    current: 0xc94b1a,
    neighbour: 0x23f7cd,
  },
  mouseIn : {
    regular: 0xbf697d,
    current: 0xc99b1a,
    neighbour: 0xd9fcf5,
  }
}



//////

export function GroundHex(props: any) {

  const refGroundTile = useRef<Mesh>(null!);


  const tkey = props.tkey;
  const [status, setStatus] = useState(props.status)
  const [groundColor, setGroundColor] = useState(groundColors.mouseOut[props.status as keyof HexState])


  /// event handlers

  const handlePointerEnter = () => {
    console.log(tkey + "  x: " + props.x + "  y: " + props.y )
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


  useEffect(() => {
    
  })

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
      <mesh 
        
        >

        <cylinderGeometry args={[props.gridConstants.hexRadius, props.gridConstants.hexRadius, 0.1, 6]} />

        <meshPhysicalMaterial 
          transparent={true}
          opacity={0.3}
          transmission={0.9}  
          color={groundColor}
          sheen={0.5}
        />
        
      </mesh>


  
    </group>
    
  );
  
}




export function GroundFloor(props: any) {

  

  return (
    <group
      {...props}
      key={props.currentTile}
      position={[0, 0.2, 0]}
    >
        {props.currentConstellation.currentHexGround.map((hexKey: number) => {
          const hex = props.hexTable.get(hexKey)
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
