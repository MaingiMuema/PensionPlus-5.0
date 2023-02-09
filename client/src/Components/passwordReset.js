import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import NavbarSignedIn from "./Navbar-SignedIn";
import Navbar from "./NavBar";
import React from "react";
import "semantic-ui-css/semantic.min.css";
import { Icon } from "semantic-ui-react";
import { useState, useEffect } from "react";
import Axios from "axios";
import Cookies from 'js-cookie';

//Localhost url for the server
const domain = "http://localhost:5000"; 

const PasswordReset = () => {
  //Login status
  const [loginStatus, setLoginStatus] = useState("false");

  const checkLogin = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    Axios.post(domain + "/auth", {}).then((response) => {
      if (response.data.message == "Not authenticated") {
        
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

  const setPasswordReset = () => {

    Axios.post(domain + "/setPasswordReset", {}).then((response) => {
      let Id = response.data[0].PasswordResetId.toString();
      setLinkId(Id); 
    });
  };

  const [userEmail, setUserEmail] = useState("test@run.com");

  var navbar;

  if(loginStatus == "true"){
    navbar = (
        <>
        <Router>
          <Switch>
            <Route exact path="/PasswordReset">
              <NavbarSignedIn />
            </Route>
          </Switch>
        </Router>
      </>
    )
  }
  else{
    navbar = (
        <>
        <Router>
          <Switch>
            <Route exact path="/PasswordReset">
              <Navbar/>
            </Route>
          </Switch>
        </Router>
      </>
    )
  }

  let cookieName = Cookies.get('email');

  var strpos = cookieName.indexOf("expires");

  console.log(strpos);
  
  let Email = cookieName.slice(0, strpos);

  const checkEmail = () =>{
    alert("Please check code sent to your Email");
  }

  return (
    <div onLoadCapture={checkLogin} className="container-fluid account-section">
      <div class="container">
       {navbar}
        {backArrow}
      </div>
      <div className="row">
        <div className="col-lg-5">
          <div className="dashboardBlueDiv fadeInLeft">
            <h1>Reset Password</h1>
          </div>
        </div>
        <div className="col-lg-7 PasswordResetContainer d-flex justify-content-center">
          <div className="card pswdChangeCard fadeInRight">
            <span className="text-center">
             <b>We can send you a login code</b>
            </span>
            <span className="text-center referText">
              We'll send it to {Email}
            </span>
            <button className="copylink" onClick={checkEmail}>Continue</button>
            <div className="d-flex justify-content-center">
              <span>
                <Link to="/login">Login</Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordReset;
