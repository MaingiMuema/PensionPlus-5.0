import React from 'react'
import './Retire.css'
import PensionScreen from "../Assets/PensionPlanScreen2.png"

function Retire() {
  return (
    <div className='retire'>
        <div className='container'>
            <div className='row'>
                <div className='col-lg-6 d-flex align-items-center'>
                    <div className='text-start'>
                        <div className="heading">
                            <h5>Retire with comfort!</h5>
                        </div>
                        <div className="content text-start py-4">
                            <p>
                            Combine some or all your previous pension funds 
                            into a unified online plan. The registration process takes 
                            less than 4 minutes.
                            </p>
                        </div>
                        <button className='get-started'>Get Started</button>
                    </div>
                </div>
                <div className='col-lg-6'>
                    <img src={PensionScreen} className='img-fluid' alt="mobile" />
                </div>
            </div>
        </div>
    </div>
  )
}

export default Retire