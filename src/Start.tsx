import { useState, useEffect, useCallback } from 'react'

import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';


import Footer from './components/controlpanels/Footer'
import Header from './components/controlpanels/Header'
import Creation from './Creation'


import ImageCrop from './components/start/ImageCrop'



export default function Start() {

  const [start, setStart] = useState(false)

  const [choice, setChoice] = useState('fromDevice')
  const [fieldForm, setFieldForm] = useState('square')
  const [fieldSize, setFieldSize] = useState('medium')
  const [difficulty, setDifficulty] = useState('normal')

  const [imageTopic, setImageTopic] = useState('')

  const [orgWidth, setOrgWidth] = useState(0)
  const [orgHeight, setOrgHeight] = useState(0)
  const [imgWidth, setImgWidth] = useState(0)
  const [imgHeight, setImgHeight] = useState(0)
  const [imgTop, setImgTop] = useState(0)
  const [imgLeft, setImgLeft] = useState(0)

  const [imgType, setImgType] = useState('')
  const [imgFile, setImgFile] = useState(undefined)
  const [base64Image, setBase64Image] = useState(undefined)
  const [croppedImage, setCroppedImage] = useState(undefined)

  const [readInImage, setReadInImage] = useState(false)
  const [cropInProgress, setCropInProgress] = useState(false)


  const startLoading =  (e: any) => {
    localStorage.clear()
    setStart(true)
  }


  const handleChoiceChange = (event: any) => {
    setChoice(event.target.value)
  }


  const handleFileRead = (event: any) => {
    if(event.target.files[0]){
      setImgFile(event.target.files[0])
      setImgType(event.target.files[0].type)
      setReadInImage(true)
    }
    
  }

  const handleFileFetch = (event: any) => {

    
  }


  const handleFileLibrary = (event: any) => {

    
  }


  const getImgSize = useCallback(
    (imagesrc: any) => {
      return new Promise((resolve, reject) => {
        let img = new Image()
        img.src = imagesrc
        img.onload = () => {
          resolve({
            width: img.width,
            height: img.height
          })
        }
        
      }
        
      )
    }, []
  )

  useEffect(() => {

    if(imgFile && readInImage){

      const readImage = () => {

        return new Promise((resolve, reject) => {
          const fileReader = new FileReader()
          fileReader.readAsDataURL(imgFile)
          fileReader.onload = () => {
            const image = fileReader.result
            resolve(image)
            
          }
          fileReader.onerror = (error) => {
            reject(error);
          }
        })
      }
  
  
      readImage()
      .then(res1 => {

        getImgSize(res1).then(res2 => {
          setBase64Image(res1)
          setImgHeight(res2.height)
          setOrgHeight(res2.height)
          setImgWidth(res2.width)
          setOrgWidth(res2.width)
          setCropInProgress(true)
        }).catch(error => console.log(error))
        
      })
      .catch(error => console.log(error))

    }

    
    
  }, [readInImage])



  if(start){
    return(
      <>
      <Creation
        orgWidth={orgWidth}
        orgHeight={orgHeight}
        imgWidth={imgWidth}
        imgHeight={imgHeight}
        imgTop={imgTop}
        imgLeft={imgLeft}
        imgType={imgType}
        base64Image={base64Image}
        imgFile={imgFile}
        fieldForm={fieldForm}
        fieldSize={fieldSize}
        difficulty={difficulty}
        choice={choice}
      />
    </>
    )
    

  } else {
    return (
      <>
  
              <Header />

              {cropInProgress && 
                      

                      <ImageCrop 
                        image={base64Image}
                        fieldForm={fieldForm}
                        setImage={setBase64Image}
                        setOrgHeight={setOrgHeight}
                        setOrgWidth={setOrgWidth}
                        setFieldForm={setFieldForm}
                        setImgHeight={setImgHeight}
                        setImgWidth={setImgWidth}
                        setImgTop={setImgTop}
                        setImgLeft={setImgLeft}
                        setCropInProgress={setCropInProgress}
                      />


              } 
  
              <div className={"container-fluid"}>
  
                <div className={"container-fluid"}>
                  <div className={"container"}>
                    <div className={"row justify-content-md-center pt-3 pb-4 mt-3 mb-4"}>
  

                      { false &&
                        <Form.Group className="mb-3" controlId="formBasicText" >
                        <Form.Label>Field Form</Form.Label>
                        <Form.Select aria-label="Default select" value={fieldForm} onChange={(e) => setFieldForm(e.target.value)}>
                          <option value="square">Square 1:1 </option>
                          <option value="desktop">Desktop 2:1</option>
                          <option value="mobile">Mobile 1:2</option>
                        </Form.Select>
                        <Form.Text className="text-muted">
                          Optional.
                        </Form.Text>
                      </Form.Group>
                      }

                    <Form.Group controlId="formFile" className="mb-3">
                      <FormControl>
                        <FormLabel id="demo-radio-buttons-group-label">Select Base Image</FormLabel>
                          <RadioGroup
                            aria-labelledby="radio-group-imagechoice"
                            defaultValue="fromDevice"
                            name="radio-buttons-group"
                            value={choice}
                            onChange={handleChoiceChange}
                          >
                              <FormControlLabel value="fromDevice" control={<Radio />} label="From Device" />
                              <FormControlLabel value="pick" control={<Radio />} label="Image from our Library" />
                              <FormControlLabel value="fetch" control={<Radio />} label="Image from Unsplashed" />


                          </RadioGroup>

                        </FormControl>
                      

                          { (choice === 'fromDevice') && 
                            <div>
                          <Form.Control type="file" accept="image/jpeg" onChange={handleFileRead}/>
                          {croppedImage && <img src={croppedImage} />}
                            </div>
                          }

                          { (choice === 'pickIt') && 
                            <div>
                              <Form.Label>Select One</Form.Label>
                              <Form.Control type="input" accept="text" onChange={handleFileLibrary}/>
                              {(croppedImage) && <img src={croppedImage} />}
                            </div>
                          }

                          { (choice === 'fetchIt') && 
                            <div>
                              <button type="submit" className="btn btn-outline-dark" onClick={handleFileFetch}>Fetch Image</button>
                              <Form.Label>{ " Optional: Enter a topic for the Image " }</Form.Label>
                              <Form.Control type="input" accept="text" onChange={(e) => setImageTopic(e.target.value)}/>
                              {(croppedImage) && <img src={croppedImage} />}
                            </div>
                          }

                          
                      </Form.Group>
                      
                      

                      <Form.Group className="mb-3" controlId="formBasicText" >
                        <Form.Label>Field Size</Form.Label>
                        <Form.Select aria-label="Default select" value={fieldSize} onChange={(e) => setFieldSize(e.target.value)}>
                          <option value="medium">Medium</option>
                          <option value="large">Large</option>
                          <option value="small">Small</option>
                        </Form.Select>
                        <Form.Text className="text-muted">
                          Optional.
                        </Form.Text>
                      </Form.Group>


                      <Form.Group className="mb-3" controlId="formBasicText" >
                        <Form.Label>Difficulty</Form.Label>
                        <Form.Select aria-label="Default select" value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
                          <option value="easy">Easy</option>
                          <option value="normal">Normal</option>
                          <option value="advanced">Advanced</option>
                          <option value="hard">Hard</option>
                          <option value="expert">Expert</option>
                        </Form.Select>
                        <Form.Text className="text-muted">
                          Optional.
                        </Form.Text>
                      </Form.Group>


                      <Form.Group>
                        <button type="submit" className="btn btn-outline-dark" onClick={startLoading}>Start Game</button>
                      </Form.Group>

  
                    </div>
                  </div>
                </div>
              </div>
  
        <Footer />
  
      </>
    )
  }

}
