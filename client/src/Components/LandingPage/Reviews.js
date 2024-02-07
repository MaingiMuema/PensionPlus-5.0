import React from "react";

//Images

import img9 from "../../Assets/reviwer1.png";
import img10 from "../../Assets/reviwer2.png";
import img11 from "../../Assets/reviwer3.png";

const Reviews = () => {
  return (
    <div>
      <div className="container review-section">
        <h1 className="text-center">Reviews</h1>
        <div className="row">
          <div className="col-lg-4">
            <div className="review-card">
              <img className="img-fluid reviewer" src={img9} alt="reviewer-1" />
              <p className="testimonial">
                I came across Pensionplus online and was immediately impressed
                by how it gives you flexibility. You possess a level of
                consciousness and awareness that none of my previous pensions
                has.
              </p>
              <p className="reviewer-title">
                Monica Aysher, Real-Estate Manager
              </p>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="review-card">
              <img
                className="img-fluid reviewer"
                src={img10}
                alt="reviewer-2"
              />
              <p className="testimonial">
                It's easy to believe that pensions don't matter while you're
                young. However, the earlier you start, the simpler it is later
                on because of compound interest.
              </p>
              <p className="reviewer-title">
                Sam Bank-Ford, Blockchain analyst
              </p>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="review-card">
              <img
                className="img-fluid reviewer reviewer3"
                src={img11}
                alt="reviewer-3"
              />
              <p className="testimonial">
                I am self-employed, Pensionplus makes it simple for me to save
                for my retirement.
              </p>
              <p className="reviewer-title">
                Eunice Helker, Digital sales consultant
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
