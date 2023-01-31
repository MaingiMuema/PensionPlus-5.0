import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import NavbarSignedIn from "./Navbar-SignedIn";
import React from "react";
import "semantic-ui-css/semantic.min.css";
import { Icon } from "semantic-ui-react";
import { useState, useEffect } from "react";
import Axios from "axios";

//Localhost url for the server
const domain = "http://localhost:5000"; 

const Referral = () => {
  //Login status
  const [loginStatus, setLoginStatus] = useState("false");

  const checkLogin = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    setReferral();
    Axios.post(domain + "/auth", {}).then((response) => {
      if (response.data.message == "Not authenticated") {
        window.history.go(-1);
      } else {
        setLoginStatus("true");
      }
    });
  };

  var backArrow;

  backArrow = (
    <Link to="/userDashboard">
      <span>
        <Icon className="back-arrow" name="arrow left" />
        Back
      </span>
    </Link>
  );

  const [linkId, setLinkId] = useState();

  const setReferral = () => {

    Axios.post(domain + "/setReferral", {}).then((response) => {
      let Id = response.data[0].referralId.toString();
      setLinkId(Id); 
    });
  };

  let referralLink = "http://localhost:3000?referral=" + linkId;

  return (
    <div onLoadCapture={checkLogin} className="container-fluid account-section">
      <div class="container">
        <>
          <Router>
            <Switch>
              <Route exact path="/referral">
                <NavbarSignedIn />
              </Route>
            </Switch>
          </Router>
        </>
        {backArrow}
      </div>
      <div className="row">
        <div className="col-lg-5">
          <div className="dashboardBlueDiv fadeInLeft">
            <h1>Refer a friend</h1>
          </div>
        </div>
        <div className="col-lg-7 referralContainer d-flex justify-content-center">
          <div className="card refferalCard fadeInRight">
            <span className="referHeading text-center">
              Refer a friend and get 1% bonus of their first deposit.
            </span>
            <span className="text-center referText">
              Share the link below with your friends to refer them.
            </span>
            <div className="referralLinkCard">
              <a href={referralLink} id="refLink">
              {referralLink}
              </a>
            </div>
            <button className="copylink" onClick={() => {navigator.clipboard.writeText(referralLink)}}>Copy Link</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Referral;
