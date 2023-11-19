import axios from 'axios'

import { useEffect, useContext, useState} from "react"
import { useLocation, useNavigate } from 'react-router-dom'

import Spinner from 'react-bootstrap/Spinner'
import Container from 'react-bootstrap/Container'

import { Buffer } from 'buffer'

import GameContext from '../context/GameContext'

import { baseURL } from '../context/Constants'


////////////////////////////////////////////////////////////////
export default function Loadingp3 (props: any) {

  const navigate = useNavigate()

  const { userID, gameID, modTracker, tableRaster, gridConstants, setBaseImgTable, setModTrackerTable } = useContext(GameContext);

  useEffect(() => {
    const fetchImageModifications = async () => {
      const requests = [];

      for (let i = 0; i < gridConstants.gridCount; i++) {
        const modArray = modTracker.get(i);

        for (let m = 1; m < modArray.length; m++) {
          const layer = m;
          requests.push(axios.get(`${baseURL}get-image-mods/?gameID=${gameID}&userID=${userID}&currentImg=${i}&layer=${layer}`, {
            responseType: 'arraybuffer'
          }).then(response => {
            let b64encoded = Buffer.from(response.data, 'binary').toString('base64');
            let mimetype = "image/jpeg";
            const base64 = `data:${mimetype};base64,${b64encoded}`;

            if (!tableRaster.has(i)) {
              tableRaster.set(i, { modMap: new Map() });
            }

            tableRaster.get(i).modMap.set(m, {
              listing: m,
              type: modArray[m],
              image: base64,
              tkey: i,
            });
          }));
        }
      }

      try {
        await Promise.all(requests);
        setBaseImgTable(tableRaster);
        setModTrackerTable(modTracker);
        navigate('/game');
      } catch (error) {
        console.error("Error loading image modifications:", error);
        // Handle the error appropriately here
      }
    };

    fetchImageModifications();
  }, [userID, gameID, modTracker, tableRaster, gridConstants, setBaseImgTable, setModTrackerTable, navigate]);


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
            <span>PART 3</span>
        </Spinner>

      </Container>

  )
 
    
}
  

  
