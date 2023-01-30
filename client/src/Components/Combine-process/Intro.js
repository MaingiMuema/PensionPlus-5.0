import React from 'react'
import BonusBadge from "../Assets/Bonus badge.png"

function Intro() {
  return (
    <div className="">
      <div className="">
        <div className="mt-3">
          <h1 className='fw-bold fs-1 lh-lg'>Combine with Pensionplus</h1>
        </div>
        <div className='container mt-3'>
          <div className='row d-flex align-items-center'>
            <div className='col-2'>
              <img src={BonusBadge} className='img-fluid w-75' alt="Bonus-badge" />
            </div>
            <div className='col-8'>
              <p>
              In a few simple steps, combine your previous pensions <br />
              and move them to the new Pensionplus plan. Earn an additional 1% of <br />
              the total transferred amount for combining <br />
              with Pensionplus.
              </p>
            </div>
            <div className='col-2'></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Intro