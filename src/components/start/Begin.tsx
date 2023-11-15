import { useState, useEffect, useCallback, useContext} from 'react';
import { useNavigate, useLocation } from "react-router-dom"

import GameContext from '../context/GameContext'

import Form from 'react-bootstrap/Form';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';


import Footer from '../controlpanels/Footer'
import {Header} from '../controlpanels/Header'

import axios from 'axios'
import { nanoid } from 'nanoid'


export default function Begin() {

  const location = useLocation()
  const navigate = useNavigate()

  const [name, setName] = useState('anonymous')

  const { setUserName } = useContext(GameContext)

  const { setUserID } = useContext(GameContext)


  const begin = async (e: any) => {

    localStorage.clear()
    setUserName(location.state?.name)

    const userID = nanoid()
    setUserID(userID)

    const baseURL = "http://127.0.0.1:5000/"

    const formData = new FormData()
    formData.append('userName', location.state?.name)
    formData.append('userID', userID)
    
    
    const loadAsyncStuff = async () => {

        try {

          await axios.post(baseURL + 'newUser/', formData, {
            headers: {
              'Content-Type' : 'multipart/form-data'
            }
          })

          navigate(
            '/chooseImage'
          )
        } catch {

        }

    loadAsyncStuff();

    }

    }  

  const handleNameInput = (event: any) => {
    setName(event.target.value)
  }

  return (
    <>

            <Header />

        

            <div className={"container-fluid"}>

              <div className={"container-fluid"}>
                <div className={"container"}>
                  <div className={"row justify-content-md-center pt-3 pb-4 mt-3 mb-4"}>

                  <Form.Group controlId="formFile" className="mb-3">
                    <FormControl>

                      <FormLabel id="">Enter your Name</FormLabel>
                      <TextField
                        required
                        id="outlined-required"
                        label="Required"
                        onChange={handleNameInput}
                        />
                           
                    </FormControl>
                  </Form.Group>

                    <Form.Group>
                      <button type="submit" className="btn btn-outline-dark" onClick={begin}>Continue</button>
                    </Form.Group>


                  </div>
                </div>
              </div>
            </div>

      <Footer />

    </>
)
  
}





