import axios from 'axios'

import React, { useState, useEffect, useMemo, useContext} from "react"
import { useLocation, useNavigate } from 'react-router-dom'

import Spinner from 'react-bootstrap/Spinner'
import Container from 'react-bootstrap/Container'

import  {Game}  from '../game/Game'
import { Buffer } from 'buffer'

import GameContext from '../context/GameContext'
import { GameProvider } from '../context/GameProvider'

import { HexImageTracker, HexObject, HexImageData } from '../game/HexConcepts'

import { nanoid } from 'nanoid'



/// CONSTANTS
export let GRIDWIDTHCOUNT: number = 5
export let GRIDHEIGHTCOUNT: number = 5
export const GRIDCOUNT: number = GRIDHEIGHTCOUNT * GRIDWIDTHCOUNT

export const RADIUS: number = 1.0
export const HEXWIDTH: number = 2.0 * RADIUS
export const HEXHEIGHT: number = Math.sqrt(3) * RADIUS
export const HORIZONTAL_SPACING: number = HEXWIDTH * 3.0 / 4.0
export const VERTICAL_SPACING: number = HEXHEIGHT

export const GRIDWIDTH: number = (GRIDWIDTHCOUNT -1) * HORIZONTAL_SPACING + HEXWIDTH
export const GRIDHEIGHT: number = GRIDHEIGHTCOUNT * HEXHEIGHT + HEXHEIGHT / 2.0

export const STARTING_HEX_COMPLETED = [0, 1, 11, 12, 132, 143]
export const STARTING_HEX_BASE = [0, 1, 11, 12, 132, 143]
export const STARTING_HEX_GROUND = [0, 1, 11, 12, 132, 143]

export const STARTING_TILE = 0

const GRIDFORMS = {
  desktop : [2, 1],
  mobile : [1, 2],
  square : [1, 1]
}

const GRIDSIZES = {
  small : 8,
  medium : 15,
  large : 25
}



////////////////////////////////////////////////////////////////
export default function Loading (props: any) {

  const navigate = useNavigate()
  const location = useLocation();

  const { setBaseImageFile } = useContext(GameContext)
  setBaseImageFile(location.state?.imgFile)

  const { setBaseImageString } = useContext(GameContext)
  setBaseImageString(location.state?.base64Image)

  const { userID } = useContext(GameContext)

  const { level } = useContext(GameContext)

  const gameStats = {
    score: 0,
    level: level? 1:(level+1),
    startingTile: 0,
    difficulty: location.state?.difficulty
  }
  const { setGameStats } = useContext(GameContext)
  setGameStats(gameStats)

  let imgType: string = 'jpg'

  if(location.state?.imgType.includes("png")){
      imgType = 'png'
  }
  
  const baseImgStats = {
    orgWidth : location.state?.orgWidth,
    orgHeight : location.state?.orgHeight,
    imgWidth : location.state?.imgWidth,
    imgHeight : location.state?.imgHeight,
    imgTop: location.state?.imgTop,
    imgLeft: location.state?.imgLeft,
    imgType: imgType,
  }

  const { setBaseImgStats} = useContext(GameContext)
  setBaseImgStats(baseImgStats)

  const GRIDWIDTHCOUNT = GRIDFORMS[baseImgStats.fieldForm][0] * GRIDSIZES[baseImgStats.fieldSize]
  const GRIDHEIGHTCOUNT = GRIDFORMS[baseImgStats.fieldForm][1] * GRIDSIZES[baseImgStats.fieldSize]
  const GRIDCOUNT = GRIDWIDTHCOUNT * GRIDWIDTHCOUNT
  
  const gridConstants = {
      fieldSize: baseImgStats.fieldSize,
      fieldForm: baseImgStats.fieldForm,
      gridWidthCount : GRIDWIDTHCOUNT,
      gridHeightCount : GRIDHEIGHTCOUNT,
      gridCount: GRIDCOUNT,

      hexWidth : HEXWIDTH,
      hexHeight:  HEXHEIGHT,
      hexRadius : RADIUS,
      hexHorizontalSpacing: HORIZONTAL_SPACING,
      hexVerticalSpacing: VERTICAL_SPACING,
      gridWidth: (GRIDWIDTHCOUNT - 1) * HORIZONTAL_SPACING + HEXWIDTH,
      gridHeight: Math.floor(GRIDHEIGHTCOUNT * HEXHEIGHT + HEXHEIGHT / 2.0),
  }

  const { setGridConstants } = useContext(GameContext)
  setGridConstants(gridConstants) 
  
  
  const gridImgAbsolutes = {
      hexWidthAbsolute: Math.floor(baseImgStats.imgWidth / gridConstants.gridWidthCount),
      hexRadiusAbsolute: Math.floor(baseImgStats.imgWidth / gridConstants.gridWidthCount) / 2,
      hexHeightAbsolute: Math.floor(Math.floor(baseImgStats.imgHeight / gridConstants.gridHeightCount) / 2.0 * Math.sqrt(3)),

      gridWidthAbsolute:  gridConstants.gridWidthCount * Math.floor(baseImgStats.imgWidth / gridConstants.gridWidthCount),
      gridHeightAbsolute:  gridConstants.gridHeightCount * Math.floor(Math.floor(baseImgStats.imgHeight / gridConstants.gridHeightCount) / 2.0 * Math.sqrt(3)),
  }

  const { setGridImgAbsolutes } = useContext(GameContext)
  setGridImgAbsolutes(gridImgAbsolutes)


  const islandTiles = [Math.floor(gridConstants.gridCount * Math.random()), Math.floor(gridConstants.gridCount * Math.random()), Math.floor(gridConstants.gridCount * Math.random())]

  const currentConstellation = {
      currentTile: STARTING_TILE,
      neighboursToCurrent: [STARTING_TILE + 1, STARTING_TILE + gridConstants.gridHeightCount, ],

      currentHexComplete: [STARTING_TILE, ].concat(islandTiles),
      currentHexBase: [STARTING_TILE, ].concat(islandTiles),
      currentHexGround: [STARTING_TILE, STARTING_TILE + 1, STARTING_TILE + gridConstants.gridHeightCount, ].concat(islandTiles),
  }


  const hexArray: Array<HexObject> = [...Array(gridConstants.gridCount).keys()].map(i => {
        
    const x = Math.floor(i / gridConstants.gridHeightCount)
    const y = i % gridConstants.gridHeightCount

    const posX = gridConstants.hexRadius + x * gridConstants.hexHorizontalSpacing
    const verticalShiftDown = (x % 2) == 0
    const verticalShift = (verticalShiftDown)? 0: gridConstants.hexVerticalSpacing / 2.0
    const posZ = gridConstants.hexRadius + y * gridConstants.hexVerticalSpacing + verticalShift
    const isTop = y === 0
    const isBottom = y === (gridConstants.gridHeightCount - 1)
    const isLeft = x === 0
    const isRight = x === (gridConstants.gridWidthCount - 1)
    const isEdge = (isTop || isLeft || isBottom || isRight)
    const isCorner = (isTop && isLeft) || (isTop && isRight) || (isBottom && isLeft) || (isBottom && isRight)

    return {
      tkey: i,
      gridX: x,
      gridY: y,
      posX: posX,
      posY: 0,
      posZ: posZ,
      neighbours: [],
      neighboursCoord: {},
      neighboursObject: {},
      isEdge: isEdge,
      isCorner: isCorner,
      isLeft: isLeft,
      isRight: isRight,
      isTop: isTop,
      isBottom: isBottom,
      verticalShiftDown: verticalShiftDown
    }
  })



  const hexTable = new Map<number, HexObject>()

  hexArray.forEach((hex, index) => {
      if(!hex.verticalShiftDown){
          
          hex.neighboursCoord = {
              'north': (!hex.isTop)? [hex.gridX, hex.gridY - 1] : null, 
              'south': (!hex.isBottom)? [hex.gridX, hex.gridY + 1]: null, 
              'northeast': (!hex.isRight)? [hex.gridX + 1, hex.gridY] : null,
              'southeast': !(hex.isBottom || hex.isRight)? [hex.gridX + 1, hex.gridY + 1]: null, 
              'northwest' : !(hex.isLeft)? [hex.gridX -1, hex.gridY]: null, 
              'southwest' : !(hex.isLeft || hex.isBottom)? [hex.gridX -1, hex.gridY + 1]: null,
          }

          hex.neighboursObject = {
            'north': (hex.neighboursCoord.north)? index - 1: null, 
            'south': (hex.neighboursCoord.south)? index + 1 : null, 
            'northeast': (hex.neighboursCoord.northeast)? index + gridConstants.gridHeightCount : null, 
            'southeast' : (hex.neighboursCoord.southeast)? index + gridConstants.gridHeightCount + 1 : null, 
            'northwest' : (hex.neighboursCoord.northwest)? index - gridConstants.gridHeightCount : null, 
            'southwest' : (hex.neighboursCoord.southwest)? index - gridConstants.gridHeightCount + 1 : null,
          }

          if(hex.neighboursCoord.north){
            hex.neighbours.push(index-1)
          }

          if(hex.neighboursCoord.south){
            hex.neighbours.push(index+1)
          }

          if(hex.neighboursCoord.northeast){
            hex.neighbours.push(index + gridConstants.gridHeightCount,)
          }

          if(hex.neighboursCoord.northwest){
            hex.neighbours.push(index - gridConstants.gridHeightCount)
          }

          if(hex.neighboursCoord.southeast){
            hex.neighbours.push(index + gridConstants.gridHeightCount + 1)
          }

          if(hex.neighboursCoord.southwest){
            hex.neighbours.push(index - gridConstants.gridHeightCount + 1)
          }

          
        
      } else {

        hex.neighboursCoord = {
          'north': (!hex.isTop)? [hex.gridX, hex.gridY - 1] : null, 
          'south': (!hex.isBottom)? [hex.gridX, hex.gridY + 1]: null, 
          'northeast': !(hex.isRight || hex.isTop)? [hex.gridX + 1, hex.gridY -1] : null,
          'southeast': (!hex.isRight)? [hex.gridX + 1, hex.gridY]: null, 
          'northwest' : !(hex.isLeft || hex.isTop)? [hex.gridX -1, hex.gridY-1]: null, 
          'southwest' : (!hex.isLeft)? [hex.gridX -1, hex.gridY]: null,
      }

      hex.neighboursObject = {
        'north': (hex.neighboursCoord.north)? index - 1: null, 
        'south': (hex.neighboursCoord.south)? index + 1 : null, 
        'northeast': (hex.neighboursCoord.northeast)? index + gridConstants.gridHeightCount - 1 : null, 
        'southeast' : (hex.neighboursCoord.southeast)? index + gridConstants.gridHeightCount : null, 
        'northwest' : (hex.neighboursCoord.northwest)? index - gridConstants.gridHeightCount -1 : null, 
        'southwest' : (hex.neighboursCoord.southwest)? index - gridConstants.gridHeightCount : null,
      }

      if(hex.neighboursCoord.north){
        hex.neighbours.push(index-1)
      }

      if(hex.neighboursCoord.south){
        hex.neighbours.push(index+1)
      }

      if(hex.neighboursCoord.northeast){
        hex.neighbours.push(index + gridConstants.gridHeightCount -1,)
      }

      if(hex.neighboursCoord.northwest){
        hex.neighbours.push(index - gridConstants.gridHeightCount -1)
      }

      if(hex.neighboursCoord.southeast){
        hex.neighbours.push(index + gridConstants.gridHeightCount)
      }

      if(hex.neighboursCoord.southwest){
        hex.neighbours.push(index - gridConstants.gridHeightCount)
      }

    }})

  currentConstellation.neighboursToCurrent = hexTable.get(currentConstellation.currentTile).neighbours

  hexArray.forEach((hex, index) => {
    const isCurrent = (index === currentConstellation.currentTile)? true: false
    const isNeighbour = currentConstellation.neighboursToCurrent.includes(index)? true : false 
    const status = isCurrent? "current" : (isNeighbour? "neighbour":"regular")
    hex.status = status
  })
  

  const { setCurrentConstellation } = useContext(GameContext)
  setCurrentConstellation(currentConstellation)

  const { setHexArray } = useContext(GameContext)
  setHexArray(hexArray)

  const { setHexTable } = useContext(GameContext)
  setHexTable(hexTable)

  const { setBaseImgTable } = useContext(GameContext)
  const { setModTrackerTable } = useContext(GameContext)




  useEffect(() => {

      const baseURL = "http://127.0.0.1:5000/"

      const formData = new FormData()
      formData.append('file', location.state?.imgFile)
      formData.append('userID', userID)
      formData.append('level', gameStats.level.toString())
      formData.append('difficulty', gameStats.difficulty)
      formData.append("orgWidth", baseImgStats.orgWidth.toString())
      formData.append("orgHeight", baseImgStats.orgHeight.toString())
      formData.append('height', baseImgStats.imgHeight.toString())
      formData.append('width', baseImgStats.imgWidth.toString())
      formData.append('top', baseImgStats.imgTop.toString())
      formData.append('left', baseImgStats.imgLeft.toString())
      formData.append('hexNrWidth', gridConstants.gridWidthCount.toString())
      formData.append('hexNrHeight', gridConstants.gridHeightCount.toString())


      const loadAsyncStuff = async () => {

          const modTracker = new Map<number, Array<string>>()
          const tableRaster = new Map<number, HexImageTracker>()

          try {

            await axios.post(baseURL + 'postImage/', formData, {
              headers: {
                'Content-Type' : 'multipart/form-data'
              }
            })

            

            try {

              const modTrackerResp = await axios.get(baseURL + 'gridImage/?userID=' + props.userID)

              for (const [key, value] of Object.entries(modTrackerResp.data)) {
                modTracker.set(parseInt(key), value)
                tableRaster.set(parseInt(key), {
                  modMap: new Map<number, HexImageData>(),
                  currentListing: value.length - 1,
                  tkey: parseInt(key),
                })
              }


              try {

                const getImages = [] 

                for(let i = 0; i < props.gridConstants.gridCount; i++){
                  getImages.push(
    
                    new Promise((resolve, reject) => {
                      axios.get(baseURL + 'getImage/?userID=' + props.userID + "&currentImg=" + i, {
                        responseType: 'arraybuffer'
                      })
                      .then(response => {
      
                        let b64encoded = Buffer.from(response.data, 'binary').toString('base64')
                        let mimetype="image/jpeg"
                        const base64 = "data:"+mimetype+";base64,"+b64encoded
                      
                        tableRaster.get(i).modMap.set(0, {
                          listing: 0,
                          type: 'original',
                          image: base64,
                          tkey: i,
                        })

                        resolve(base64)
                      })
                      .catch(err => {
                        console.error(err)
                        reject('nothing here')
                      })
                    })
    
                  )
    
                  const modArray = modTracker.get(i)
    
                  for(let m = 1; m < modArray.length; m++){
                    getImages.push(
    
                      new Promise((resolve, reject) => {
                        const layer = m
                        axios.get(baseURL + 'getImageMods/?userID=' + props.userID + "&currentImg=" + i + "&layer=" + layer, {
                          responseType: 'arraybuffer'
                        })
                        .then(response => {
        
                          let b64encoded = Buffer.from(response.data, 'binary').toString('base64')
                          let mimetype="image/jpeg"
                          const base64 = "data:"+mimetype+";base64,"+b64encoded

                          tableRaster.get(i).modMap.set(m, {
                            listing: m,
                            type: modArray[m],
                            image: base64,
                            tkey: i,
                          })
  
                          resolve(base64)
                        })
                        .catch(err => {
                          console.error(err)
                          reject('nothing here')
                        })
                      })
      
                    )
                  }
                    
                }
    
    
                Promise.all(getImages).then((values) => {
                  setBaseImgTable(tableRaster)
                  setModTrackerTable(modTracker)

                  navigate('/game')
                })

              } catch {

              }

            } catch {

            }

          } catch {

          }  



          

          
      };
  
      loadAsyncStuff();

      
      const handleUnload = async (e: any) => {

        await axios.post(baseURL + 'erase/?userID=' + props.userID , {
          headers: {
            'Content-Type' : 'multipart/form-data'
          }
        })
      
        // Prevent the default action to ensure the request is sent
        e.preventDefault();
        e.returnValue = '';
      };

      window.addEventListener('beforeunload', handleUnload);

      return () => {
          window.removeEventListener('beforeunload', handleUnload);
      };


  }, [])


  return (
      <Container
        style={{
          alignContent: "center",
          alignSelf: "center",
          height: "50vh"
        }}
      >

        <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
        </Spinner>

      </Container>

  )
 
    
}
  
