import React from 'react'
import BonusBadge from "../Assets/Bonus badge.png"

function Intro() {
  return (
    <div className="">
      <div className="">
        <div className="mt-5">
          <h3 className='fw-bold fs-1 lh-lg'>Contribute to your pot</h3>
        </div>
        <div className='container mt-0'>
          <div className='row d-flex align-items-center'>
            <div className='col-3'>
              <img src={BonusBadge} className='img-fluid w-75' alt="Bonus-badge" />
            </div>
            <div className='col-lg-6'>
              <p className='fs-5'>
                Start saving for a better retirement by adding money to your 
                Pensionplus pot and instantly earn a one-time additional 2% of 
                the total contribution.
              </p>
            </div>
            <div className='col-lg-3'></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Intro

