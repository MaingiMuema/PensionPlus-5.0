import React from "react";
import { BrowserRouter as Link } from "react-router-dom";

import PlanSection1 from "./PlanSection1";
import PlanSection2 from "./PlanSection2";

import img3 from "../../Assets/Personal pension.png";
import img4 from "../../Assets/Workplace pension.png";
import img6 from "../../Assets/Phone-app-screenshot.png";
import img8 from "../../Assets/Understand pension mobile screens.png";

const workPlaceLink = (
  <Link class="arrow-button" to="/login">
    Workplace<span class="arrow"></span>
  </Link>
);

const Info = () => {
  const screenWidth = window.screen.width;
  const planSection = screenWidth <= 90 ? <PlanSection1 /> : <PlanSection2 />;

  return (
    <div>
      <div className="container pension-offerings">
        <div className="row">
          <div className="col-lg-2 fadeInUp"></div>
          <div className="col-lg-4 fadeInUp">
            <div className="section2-icons">
              <img
                className="image-fluid"
                src={img3}
                alt="Personalpension icon"
              />
            </div>
            <h3>Personal pension</h3>
            <p>
              With a few easy steps, you can contribute and begin saving on our
              online platform.
            </p>
            <br />
            <Link class="arrow-button" to="/login">
              Personal saver<span class="arrow"></span>
            </Link>
          </div>
          <div className="col-lg-4 fadeInUp">
            <div className="section2-icons">
              <img
                className="image-fluid contributionImg"
                src={img4}
                alt="Personalpension icon"
              />
            </div>
            <h3>Workplace pension</h3>
            <p>
              Our auto-enrolment pension will save you money and get you set for
              your retirement. combine previous pensions with ease. Try it now.
            </p>
            {workPlaceLink}
          </div>
          <div className="col-lg-2 fadeInUp"></div>
        </div>
      </div>
      <hr className="separator" />
      <div className="container combine-section">
        <div className="row">
          <div className="col-lg-6">
            <img
              className="img-fluid img6"
              src={img6}
              alt="transfer-process-screenshot"
            />
          </div>
          <div className="col-lg-6 combine-section-2ndcol">
            <h1 className="Explanation-heading">Combine your pensions</h1>
            <p className="Explanation-p">
              With Pensionplus, you can easily combine your pensions.
              <br />
              <br /> All of your pensions will be combined by our amiable team
              of pension transfer specialists, giving you complete access to
              your money even if you are unaware of every aspect.
              <br />
              <br />
              Additionally, by combining all of your pensions, you may set
              objectives, change how you contribute, and finally get your
              finances back on track.
            </p>
            <Link to="/login">
              <button class="call-to-action">Combine with PensionPlus</button>
            </Link>
          </div>
        </div>
      </div>
      <div className="container plan-section">{planSection}</div>
      <div className="container Learn-more-section">
        <div className="row">
          <div className="col-lg-6">
            <img
              className="img-fluid img7"
              src={img8}
              alt="transfer-process-screenshot"
            />
          </div>
          <div className="col-lg-6">
            <h1 className="Explanation-heading">Understand your pension</h1>
            <p className="Explanation-p">
              Understand how your pension works, keep up with it at all times,
              and manage everything with ease on our website.
              <br />
              <br />
              Find out exactly which firms you are invested in by exploring your
              fund. Then you can hold them accountable by casting your phone's
              vote during board meetings to decide on policies.
            </p>
            <button class="call-to-action">Learn more about pensions</button>
          </div>
        </div>
      </div>
      <hr className="separator" />
    </div>
  );
};

export default Info;
