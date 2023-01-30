import React from 'react'
import Title1 from "../Assets/1.png"
import Title2 from "../Assets/2.png"
import Title3 from "../Assets/3.png"
import CreateAccount1 from "../Assets/Mobile-Create-account1.png"
import CreateAccount2 from "../Assets/Mobile-Create-account2.png"
import CombineScreen from "../Assets/CombineScreen.png"

function Pension() {
  return (
    <div className='Pension mb-5'>

        <div className='container'>
            <div className="row">
                <div className='col-lg-6 d-flex align-items-center'>
                    <div className='mt-5 ms-5'>
                        <div className=''>
                            <span className="d-flex align-items-center">
                                <img src={Title1} alt="1" />
                                <h5 className='heading d-flex align-items-center px-3'>Create an account</h5>
                            </span>
                        </div>
                        <div className="text-start mt-3">
                            <p>
                            Since it is free to join PensionPlus,
                            there are no additional fees for
                            contributions, withdrawals, or transferring your 
                            existing pensions to us
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6">
                    <img src={CreateAccount1} className='img-fluid m-75 h-auto' alt="mobile-img" />
                </div>
            </div>
        </div>

        <div className="container"> 
            <div className='row'>
                <div className="col-lg-6">
                    <img src={CreateAccount2} className='img-fluid' alt="mobile-img" />
                </div>
                <div className='col-lg-6 d-flex align-items-center'>
                    <div>
                        <span className="d-flex text-start align-items-center">
                            <img src={Title2} className='img-fluid pe-3' alt="2" />
                            <h5 className='heading'>Provide details concerning old pensions</h5>
                        </span>
                        <div className="text-start mt-3">
                        The more details you can offer about your former pension providers, 
                        the quicker we can locate and transfer your funds. <br />
                        <br />
                        If you don't have all the information right away, don't stress; you 
                        can always add it later. Even though you can mention your current employer 
                        pension to us, we typically won't transfer it to PensionPlus until you change jobs.
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="container">
            <div className='row'>
                <div className='col-lg-6'>
                    <div className="d-flex align-items-center">
                        <img src={Title3} className='img-fluid pe-3' alt="3" />
                        <h5 className='heading'>We combine your pensions</h5>
                    </div>
                    <div className="text-start mt-3">
                    To start the process of transferring your funds to your new 
                    Pensionplus pension, we will now start contacting your former 
                    pension providers. <br />
                    <br />
                    If we establish that your former pension has additional benefits 
                    or guarantees, or that your prior pension provider charges an exit 
                    cost of more than Ksh1000, we will notify you before proceeding 
                    with the transfer. <br />
                    <br />
                    You can track the status of the transfer process from the dashboard. 
                    We notify you once the transfer is done. <br />
                    <br />
                    </div>
                </div>
                <div className="col-lg-6">
                    <img src={CombineScreen} className='img-fluid' alt="mobile-img" />
                </div>
            </div>
        </div>
    </div>
  )
}

export default Pension