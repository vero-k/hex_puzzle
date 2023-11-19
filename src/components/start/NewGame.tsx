import { useState, useEffect, useCallback, useContext} from 'react';
import { useNavigate, useLocation } from "react-router-dom"

import GameContext from '../context/GameContext'

import Form from 'react-bootstrap/Form';

import Footer from '../controlpanels/Footer'
import {Header} from '../controlpanels/Header'


export default function NewGame() {


  const navigate = useNavigate()



  const begin = (e: any) => {
    e.preventDefault()
  }  

  const newplayer = (e: any) => {
    e.preventDefault();
    navigate('/begin');
  }

  return (
    <>

            <Header />

            <div className={"container-fluid"}>

              <div className={"container-fluid"}>
                <div className={"container"}>
                  <div className={"row justify-content-md-center pt-3 pb-4 mt-3 mb-4"}>

                    <Form.Group>
                      <button type="submit" className="btn btn-outline-dark" onClick={begin}>Start New Game</button>
                    </Form.Group>
                    <Form.Group>
                      <button type="submit" className="btn btn-outline-dark" onClick={newplayer}>New Player</button>
                    </Form.Group>

                  </div>
                </div>
              </div>
            </div>

      <Footer />

    </>
)
  
}





