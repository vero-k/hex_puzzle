import axios from 'axios'

import { useEffect, useContext} from "react"
import { useNavigate } from 'react-router-dom'

import Spinner from 'react-bootstrap/Spinner'
import Container from 'react-bootstrap/Container'

import GameContext from '../context/GameContext'

import { HexImageTracker, HexImageData } from '../game/HexConcepts'

import { baseURL } from '../context/Constants'



////////////////////////////////////////////////////////////////
export default function LoadingTwo (props: any) {

  const navigate = useNavigate();
  const { gameID, setModTracker, setTableRaster } = useContext(GameContext);

  useEffect(() => {
    const loadAsyncStuff = async () => {
      try {
        const modTrackerResp = await axios.get(`${baseURL}grid-image/?gameID=${gameID}`);
        const newModTracker = new Map<number, Array<string>>()
        const newTableRaster = new Map<number, HexImageTracker>()

        for (const [key, value] of Object.entries(modTrackerResp.data)) {
          const keyInt = parseInt(key);
          newModTracker.set(keyInt, value);
          const hexImageDataMap = new Map<number, HexImageData>()
          for(let j = 0; j < value.length; j++) {
            hexImageDataMap.set(j, {
              listing: j,
              type: value[j],
              image: null,
              tkey: parseInt(key),
            })
          }
          newTableRaster.set(keyInt, {
            tkey: keyInt,
            currentListing: value.length - 1,
            modMap: hexImageDataMap
          });
        }

        setModTracker(newModTracker);
        setTableRaster(newTableRaster);

        navigate('/loading-p3');
      } catch (error) {
        console.error("Error in LoadingTwo:", error);
      }
    };

    loadAsyncStuff();
  }, [gameID, setModTracker, setTableRaster, navigate]);



  return (
    <Container
    className='container-spinner'
      style={{
        alignContent: "center",
        alignSelf: "center",
        height: "50vh"
      }}
    >
      <Spinner className="spinner" animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
          <span>PART two</span>
      </Spinner>

    </Container>

)

    
}
  
