/* eslint-disable import/first */
import React from "react";

import { Icon } from "semantic-ui-react";
import { BrowserRouter as Link } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      <footer className="footer-section">
        <div class="container">
          <div class="footer-cta pt-5 pb-5">
            <div class="row">
              <div class="col-xl-4 col-md-4 mb-30">
                <div class="single-cta">
                  <i class="fas fa-map-marker-alt"></i>
                  <div class="cta-text">
                    <h4>Find us</h4>
                    <br />
                    <span>
                      Pension Tower
                      <br /> off Waiyaki Way, Westlands
                    </span>
                  </div>
                </div>
              </div>
              <div class="col-xl-4 col-md-4 mb-30">
                <div class="single-cta">
                  <i class="fas fa-phone"></i>
                  <div class="cta-text">
                    <h4>Call us</h4>
                    <br />
                    <span>+254 (0)20278100</span>
                  </div>
                </div>
              </div>
              <div class="col-xl-4 col-md-4 mb-30">
                <div class="single-cta">
                  <i class="far fa-envelope-open"></i>
                  <div class="cta-text">
                    <h4>Mail us</h4>
                    <br />
                    <span className="sanlamEmail">
                      <a className="mailLink" href="mailto:info@sanlam.co.ke">
                        info@pensionplus.co.ke
                      </a>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="footer-content pt-5 pb-5">
            <div class="row">
              <div class="col-xl-6 col-lg-6 mb-50">
                <div class="footer-widget">
                  <div class="footer-logo">
                    {/* <a href="index.html">
                      <img src={img12} class="img-fluid" alt="logo" />
                    </a> */}
                  </div>
                  <div className="footer-text">
                    <p>
                      {" "}
                      Pension Plus is an insurer licensed to conduct life
                      insurance business and is a licensed financial services
                      provider and a registered credit provider.
                    </p>
                  </div>
                  <div class="footer-social-icon">
                    <span>Follow us</span>
                    <a href="https://t.co/dO9zlSZlF2">
                      <Icon className="media-icon" name="linkedin" />
                    </a>
                    <a href="https://t.co/dO9zlSZlF2">
                      <Icon className="media-icon" name="facebook" />
                    </a>
                    <a href="https://twitter.com/ThisguyCharles1">
                      <Icon className="media-icon" name="twitter" />
                    </a>
                  </div>
                </div>
              </div>
              <div class="col-xl-6 col-lg-6 col-md-6 mb-30">
                <div class="footer-widget">
                  <div class="footer-widget-heading">
                    <h3>Useful Links</h3>
                  </div>
                  <ul>
                    <li>
                      <Link href="#">Our pension</Link>
                    </li>
                    <li>
                      <Link to="/userDashboard">Combine</Link>
                    </li>
                    <li>
                      <Link to="/userDashboard">contribute</Link>
                    </li>
                    <li>
                      <Link to="/comingSoon">Plans</Link>
                    </li>
                    <li>
                      <Link to="/userDashboard">Pension Calcuator</Link>
                    </li>
                    <li>
                      <Link to="/contributeProcess">Self-employed Saver</Link>
                    </li>
                    <li>
                      <Link to="/combineProcess">Workplace Pension</Link>
                    </li>
                    <li>
                      <Link to="/terms">Terms and conditions</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="copyright-area">
          <div class="container">
            <div class="row">
              <div class="col-xl-6 col-lg-6 text-center text-lg-left">
                <div class="copyright-text">
                  <p>
                    Copyright &copy; <span>{new Date().getFullYear()}</span>,
                    All Right Reserved |{" "}
                    <a href="https://codepen.io/anupkumar92/">PensionPlus Limited</a>
                  </p>
                </div>
              </div>
              <div class="col-xl-6 col-lg-6 d-none d-lg-block text-right"></div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
