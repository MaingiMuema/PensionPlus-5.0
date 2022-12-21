import React from 'react'

const DashboardBtns = ( {img, text} ) => {
  return (
   <div className="col-lg-4 fadeInUp">
   <div className="d-flex justify-content-center">
       <button className="dashboardButton ">
           <div className="buttonIcon">
               <img className="img-fluid bIcon" src={img} alt="total Icon" />
           </div>
           <br />
           <span className="btnText">{text}</span>
       </button>
   </div>
</div>
  )
}

export default DashboardBtns