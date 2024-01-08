import React from "react";
import { BrowserRouter as Link } from "react-router-dom";
import img1 from "../../Assets/Hero-Section-Phone-_1_.webp";
import img2 from "../../Assets/Bonus badge.png";

const getStartedBtn = (
    <Link to="/pensionDetails">
      <button>Get started</button>
    </Link>
  );

const Hero = () => {
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-lg-6 hero-section-wording">
            <h1 className="fadeInBottom">Enjoy your financial prospects</h1>
            <p className="fadeInLeft">
              Take charge of your retirement now with our award-winning pension.
              You can combine your pensions, increase your pool, and get ready
              to enjoy retirement. Combine, Contribute and withdraw online.
            </p>
            {getStartedBtn}
            <img className="bonusimg" src={img2} alt="offer" />
          </div>
          <div className="col-lg-6 fadeInUp">
            <img
              className="img-fluid Hero-section-img1"
              src={img1}
              alt="Hero-section-img1"
            />
          </div>
          <div className="cookieAlert fadeInRight">
            <span className="">
              Our site uses cookies. Read our{" "}
              <Link to="privacy-policy">privacy policy.</Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
