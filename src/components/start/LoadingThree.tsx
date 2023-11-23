import axios from 'axios'

import { useEffect, useContext, useState} from "react"
import { useNavigate } from 'react-router-dom'

import Spinner from 'react-bootstrap/Spinner'
import Container from 'react-bootstrap/Container'

import { Buffer } from 'buffer'

import GameContext from '../context/GameContext'

import { baseURL } from '../context/Constants'


////////////////////////////////////////////////////////////////
export default function LoadingThree (props: any) {

  const navigate = useNavigate()

  const { userID, gameID, tableRaster, setTableRaster, gridConstants } = useContext(GameContext);

  
  useEffect(() => {

    const toBase64 = (url, index) => {
      return axios
          .get(url, {
              responseType: 'arraybuffer'
          })
          .then(response => ({Buffer.from(response.data, 'binary').toString('base64'), index})
          .catch(error => console.error('Error converting image to Base64', error));
    };


    const fetchImages = async () => {

      const response = await axios.get(`${baseURL}get-all-image/?count=${gridConstants.count}&userID=${userID}`)
      const updatedTable = tableRaster

      if (response.data && response.data.length > 0) {

        let i = 0
        for (const imageUrl of response.data) {
          const {base64Image, index} = await toBase64(imageUrl, i)
          updatedTable.get(index).modMap.get(0).set('image', `data:image/jpeg;base64,${base64Image}`)
        }

      }

      setTableRaster(updatedTable);
      navigate('/loading-p4');

      
    };

    fetchImages();
  }, [userID, gameID, gridConstants, tableRaster, setTableRaster, navigate]);
 


  useEffect(() => {
    const fetchImages = async () => {
      const requests = [];
      for (let i = 0; i < gridConstants.gridCount; i++) {
        requests.push(axios.get(`${baseURL}get-image/?gameID=${gameID}&userID=${userID}&currentImg=${i}`, {
          responseType: 'arraybuffer'
        }));
      }

      try {
        const responses = await Promise.all(requests);
        const updatedTable = tableRaster

        responses.forEach((response, index) => {
          let b64encoded = Buffer.from(response.data, 'binary').toString('base64');
          let mimetype = "image/jpeg";
          const base64 = `data:${mimetype};base64,${b64encoded}`;

          updatedTable.get(index).modMap.set(0, {
            listing: 0,
            type: 'original',
            image: base64,
            tkey: index,
          });
        });

        setTableRaster(updatedTable);
        navigate('/loading-p2');
      } catch (error) {
        console.error("Error loading images:", error);
        // Handle the error appropriately here
      }
    };

    fetchImages();
  }, [userID, gameID, gridConstants, tableRaster, setTableRaster, navigate]);




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
            <span>PART three</span>
        </Spinner>

      </Container>

  )
 
    
}
  
