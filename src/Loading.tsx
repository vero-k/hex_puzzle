import axios from 'axios'

import { useState, useEffect } from "react"

import  Game  from './components/game/Game'

import { Buffer } from 'buffer'




interface HexImageData {

  listing: number,
  type: string,
  image: any,
  tkey: number,

}


interface HexImageTracker {

  modMap: Map<number, HexImageData>,
  currentListing: number,
  tkey: number,
  
}


export default function Loading (props: any) {

  const [creating, setCreating] = useState(true)
  const [baseImgTable, setBaseImgTable] = useState(new Map<number, HexImageTracker>())
  const [modTrackerTable, setModTrackerTable] = useState(new Map<number, Array<string>>())

  useEffect(() => {

      const baseURL = "http://127.0.0.1:5000/"

      const formData = new FormData()
      formData.append('file', props.baseImageFile)
      formData.append('userID', props.userID)
      formData.append('level', props.gameStats.level.toString())
      formData.append('difficulty', props.gameStats.difficulty)
      formData.append("orgWidth", props.baseImgStats.orgWidth.toString())
      formData.append("orgHeight", props.baseImgStats.orgHeight.toString())
      formData.append('height', props.baseImgStats.imgHeight.toString())
      formData.append('width', props.baseImgStats.imgWidth.toString())
      formData.append('top', props.baseImgStats.imgTop.toString())
      formData.append('left', props.baseImgStats.imgLeft.toString())
      formData.append('hexNrWidth', props.gridConstants.gridWidthCount.toString())
      formData.append('hexNrHeight', props.gridConstants.gridHeightCount.toString())


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
                  setCreating(false) 
                  setBaseImgTable(tableRaster)
                  setModTrackerTable(modTracker)
                })

              } catch {

              }

            } catch {

            }

          } catch {

          }  



          

          
      };
  
      loadAsyncStuff();


  }, [])



    if(creating){
        return (
            <>
            <div
                style={{ width: "100vw", height: "100vh" }}
            >
                waiting

            </div>
            
            </>
    
        )
    } else {
        return (
            <>
            <div
                style={{ width: "100vw", height: "100vh" }}
            >
                    <Game 
                        {...props}
                        baseImgTable={baseImgTable}
                        modTrackerTable={modTrackerTable}
                    />
            </div>
            
            </>
    
        )
    }
    
  }
  
