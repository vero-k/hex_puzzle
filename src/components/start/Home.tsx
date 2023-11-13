
import { Link } from "react-router-dom"
import {Header} from '../controlpanels/Header';
import Footer from '../controlpanels/Footer';


export default function Home() {


  return (
    <>
            <Header />

            <div className={"container-fluid"}>

              <div className={"container-fluid"}>
              <div className={"container"}>

              <div className={"row justify-content-md-center pt-3 pb-4 mt-3 mb-4"}>

              <div className="container my-5">
              <div className="row p-4 pb-0 pe-lg-0 pt-lg-5 align-items-center rounded-3 border shadow-lg">
                <div className="col-lg-4 p-3 p-lg-5 pt-lg-3">
                  <h1 className="display-4 fw-bold lh-1">Cairo</h1>
                  <p className="lead">Walk the world, fix the ground you walk on.</p>
                  <div className="d-grid gap-2 d-md-flex justify-content-md-start mb-4 mb-lg-3">
                    <button type="button" className="btn btn-outline-dark px-4 me-md-2 fw-bold"><Link to="/start">Start Playing</Link></button>
                    
                  </div>
                </div>
                <div className="col-lg-6 offset-lg-1 p-0 overflow-hidden shadow-lg">
                    <img className="rounded-lg-3" src={'./hexagon.jpg'} alt="" width="720"  />
                </div>
              </div>
              
            </div>
              

              </div>

              </div>
              
              </div>
              
              
            </div>

            <Footer />

    </>
  )
}

