import React from 'react'
import './Contribution.css'
import FinancialLiteracy from "../Assets/Financial-literacy.png"
import PhonePerson from "../Assets/PhonePerson.png"
import Removal from "../Assets/removal.png"

function Contribution() {
  return (
    <div className='contribution'>
        <div className='container text-start'>
            <div className='row'>
                <div className='col-lg-6 d-flex align-items-center'>
                    <div>
                        <div>
                            <h3 className='lh-lg mb-4'>Agility in your contribution</h3>
                        </div>
                        <p>
                        Pensionplus is designed to help you become more financially secure. 
                        If you choose to contribute, you can add, change, or suspend payments 
                        whenever you want online. <br />
                        <br />
                        You have the choice to either schedule a regular monthly contribution 
                        or make one-time payments anytime you'd like. Money can be added via 
                        Mpesa, Visa, or Mastercard. We let you save as much or as little as you'd want, 
                        unlike some services. There are no payment constraints or minimum contributions.
                        </p>
                    </div>
                </div>
                <div className='col-lg-6'>
                    <img src={FinancialLiteracy} className='img-fluid' alt="financial" />
                </div>
            </div>
            <div className='row'>
                <div className='col-lg-6 d-flex justify-content-center'>
                    <img src={PhonePerson} className='img-fluid' alt="financial" />
                </div>
                <div className='col-lg-6 d-flex align-items-center'>
                    <div className=''>
                        <div>
                            <h3 className='lh-lg mb-4'>Utilize out pension calculator to plan ahead.</h3>
                        </div>
                        <p>
                            You can look forward to a fulfilling retirement by planning 
                            how much to save into your pension with the aid of our pension 
                            calculator. <br />
                            <br />
                            Knowing how much to save for a pension can be difficult, 
                            but we've got you covered. To determine how much to contribute 
                            to your Pensionplus pension, you can use our pension calculator. <br />
                            <br />
                            Just insert your: <br />
                            <br />
                            <ul className='fw-bold'>
                                <li>Age</li>
                                <li>Annual income</li>
                                <li>Anticipated retirement age</li>
                                <li>Sum of the current pension pool</li>
                                <li>Desired annual retirement income</li>
                                <li>Personal monthly contribution</li>
                                <li>Employer monthly contribution</li>
                                <li>Personal one-off contribution</li>
                            </ul>
                            <br />
                            We'll show you how much money to contribute and how much money 
                            you can anticipate receiving upon your retirement.
                        </p>
                        <button className='pension mt-3'>Pension Calculator</button>
                    </div>
                </div>
            </div>
        </div>
        <div className='removal mb-0'>
            <div className='container text-start'>
                <div className='row'>
                        <div className='col-lg-6 d-flex align-items-center justify-content-center'>
                            <div className=''>
                                <div className=''>
                                    <h3 className='heading lh-lg mb-4'>Retire to Comfort!</h3>
                                </div>
                                <p>
                                Combine some or all your previous pension funds into a unified 
                                online plan. The registration process takes less than 4 minutes.
                                </p>
                                <button className='get-started mt-4'>Get Started</button>
                            </div>
                        </div>
                        <div className='col-lg-6'>
                            <img src={Removal} className='img-fluid' alt="removal" />
                        </div>
                    </div>
            </div>
        </div>
    </div>
  )
}

export default Contribution