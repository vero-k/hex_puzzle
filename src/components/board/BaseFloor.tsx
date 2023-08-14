import { useState, useMemo, useRef } from 'react';
import { TextureLoader } from 'three/src/loaders/TextureLoader';

const loader = new TextureLoader()




export function BaseHex(props: any) {

  const tkey = props.tkey
  
  const [status, setStatus] = useState<string>(props.status)

  const trackerTable = props.baseImgTable.get(tkey)
  const table = trackerTable.modMap

  const [currentTextureNr, setCurrentTextureNr] = useState<number>(trackerTable.currentListing)
  const [currentTextureKey, setCurrentTextureKey] = useState<string>(table.get(trackerTable.currentListing).type) 
  const [currentTexture, setCurrentTexture] = useState(() => loader.load(table.get(trackerTable.currentListing).image))
  
  const geo = useRef(null)

  
  const changeTexture = (props: any, e: any) => {
    if(currentTextureKey){
      const nr = currentTextureNr
      if(currentTextureNr > 0){
        const newNr = currentTextureNr - 1
        const key = table.get(newNr).type
        const img = loader.load(table.get(newNr).image)
        trackerTable.currentListing = newNr
        setCurrentTextureNr(newNr)
        setCurrentTextureKey(key)
        setCurrentTexture(img)
      }
      
    }
    
  }

  
  return (
    <mesh 
        {... props}
        receiveShadow={true}
        status={status}

        onDoubleClick={(e) => changeTexture(props, e)}
        >
      <cylinderGeometry ref={geo} args={[props.gridConstants.hexRadius, props.gridConstants.hexRadius, 0.1, 6]} />
      <meshStandardMaterial 
        map={currentTexture}  
        metalness={0.5}
        />
    </mesh>
  );
}




export function BaseFloor(props: any) {


  return (
    <group
      {...props}
      key={props.currentTile}
      position={[0, 0, 0]}
    >
        {props.currentConstellation.currentHexBase.map((hexKey: number) => {
          const hex = props.hexTable.get(hexKey)
          return (
            <BaseHex
              {...props}
              key={hex.tkey}
              tkey={hex.tkey}
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
