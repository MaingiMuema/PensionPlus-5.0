import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Navbar from "./NavBar";
import NavbarSignedIn from "./Navbar-SignedIn";
import "semantic-ui-css/semantic.min.css";
import { Icon } from "semantic-ui-react";
import Axios from "axios";
import { useEffect, useState } from "react";

//Images

import img2 from "../Assets/Bonus badge.png";
import img3 from "../Assets/Personal pension.png";

//Localhost url for the server
const domain = "http://localhost:5000"; 
const ComingSoon = () =>{


  //Login status
  const [loginStatus, setLoginStatus] = useState("false");
 
  const checkLogin = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    Axios.post(domain + "/auth", {}).then((response) => {
      console.log(response.status);
      if (response.data.message == "Not authenticated") {
      } else {
        setLoginStatus("true");
      }
    });
  };

  var NavBar;

  if (loginStatus == "true") {
    
    NavBar = (
      <>
        <Router>
          <Switch>
            <Route exact path="/comingSoon">
              <NavbarSignedIn />
            </Route>
          </Switch>
        </Router>
      </>
    );
  } else {
    NavBar = (
      <>
        <Router>
          <Switch>
            <Route exact path="/comingSoon">
              <Navbar />
            </Route>
          </Switch>
        </Router>
      </>
    );
  }

    
  return (
    <div
      onLoadCapture={checkLogin}
      className="container-fluid"
      id="calculatorContainer"
    >
      <div className="container">{NavBar}</div>

      <div className="container-fluid" id="pensionCalculatorHeader">
        <div className="row">
          <div className="col-lg-2"></div>
          <div className="col-lg-8 fadeInUp">
            <h1 className="text-center">Coming Soon</h1>
            <p className="text-center pCalculatorParagraph">
             Page under construction
            </p>
          </div>
          <div className="col-lg-2"></div>
        </div>
      </div>
    </div>
  );
}

export default ComingSoon;
