import React from 'react'
import AddMoney1 from "../Assets/AddMoneyPage1.png"
import AddMoney2 from "../Assets/AddMoneyPage2.png"
import AddMoney3 from "../Assets/AddMoneyPage3.png"

function Payment() {
  return (
    <div className='payment'>
        <div className='container'>
            <div className='row'>
                    <div className='col-lg-4 d-flex justify-content-center'>
                        <img src={AddMoney1} alt="mobile" />
                    </div>
                    <div className='col-lg-4 d-flex justify-content-center'>
                        <img src={AddMoney2} alt="mobile" />
                    </div>
                    <div className='col-lg-4 d-flex justify-content-center'>
                        <img src={AddMoney3} alt="mobile" />
                    </div>
            </div>
        </div>
    </div>
  )
}

export default Payment