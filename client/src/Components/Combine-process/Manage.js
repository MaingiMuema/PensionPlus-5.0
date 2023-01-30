import React from 'react'
import "./Manage.css"

import PensionPlan from "../Assets/PensionPlanScreen1.png"
import PensionPlanTilted from "../Assets/PensionPlanScreen1-Tilted.png"
import DoubleMobile from "../Assets/2phones.png"

function Manage() {
  return (
    <div className='manage mt-5'>
        <div className='container pb-5'>
            <div className='row'>
                <div className='col-lg-6'>
                    <div className="heading text-start">
                        <h1 className='py-5'>Easy! Right?</h1>
                        <h4 className='pb-3'>With just a few clicks, manage your pension.</h4>
                    </div>
                    <div className="content text-start">
                        <p>
                            We'll email you to let you know when your old pensions have been
                            transferred to us and your new pension is prepared. To view the status
                            of your pension, log into your account whenever you like. From your account 
                            you will be able to:
                        </p>
                        <br />
                        <ul>
                            <li>See how your new Pensionplus pension is performing in real-time</li>
                            <li>Track Pensionplus performance over time</li>
                            <li>Follow up on uncompleted pension transfers from your previous providers.</li>
                            <li>Contribute funds to your Pensionplus pension</li>
                        </ul>
                    </div>
                </div>
                <div className="col-lg-6 d-flex align-items-center">
                    <img src={DoubleMobile} className='img-fluid' alt="mobile-img" />
                </div>
            </div>
        </div>
    </div>
  )
}

export default Manage