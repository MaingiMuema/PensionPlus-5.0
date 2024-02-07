import React from 'react'
import { BrowserRouter as Link } from "react-router-dom";

import img7 from "../../Assets/Pension Plan phones.png";

const PlanSection2 = () => {
  return (
    <div className="row">
      <div className="col-lg-6">
        <h1 className="Explanation-heading">
          Choose from a variety of specialized pension plans.
        </h1>
        <p className="Explanation-p">
          From our selection of diversified funds, choose the investing strategy
          that's right for you, and then see your money grow in real time.
          <br />
          <br />
          To get the most out of your pension, set your savings objectives,
          change your strategies, and obtain automated tax relief. From
          climate-conscious investments to pension plans designed to safeguard
          your retirement income, we have it all.
          <br />
          <br />
          When you merge pensions with us, you can choose a plan or we'll invest
          your funds in a Tailored option which automatically shifts your money
          into safer investments as you age.
        </p>
        <br />
        <br />
        <Link class="call-to-action" to="/comingSoon">
          Explore our plans
        </Link>
      </div>
      <div className="col-lg-6">
        <img
          className="img-fluid img7"
          src={img7}
          alt="transfer-process-screenshot"
        />
      </div>
    </div>
  )
}

export default PlanSection2