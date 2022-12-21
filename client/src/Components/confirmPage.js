import { HashRouter as Router, Route, Switch, Link } from "react-router-dom";
import NavbarSignedIn from "./Navbar-SignedIn";
import React, { useState, useEffect } from "react";
import $ from "jquery";
import  Axios  from "axios";

import "semantic-ui-css/semantic.min.css";
import { Icon } from "semantic-ui-react";

//Images
import img1 from "../Assets/confirmPageVector.png";

const ConfirmPage = () => {
    //Providers List
    const [providerList, setProviderList] = useState([]);
    

  //Get pension providers
   const pensionProvider = () => {
    scrollWin();

    Axios.post("http://localhost:5000/pensionProvider", {      
    }).then((response) => {
      console.log(response.data.message);
      if(response.data.message == "Providers are missing."){
        setProviderList([
          {
            PensionProvider: 'You haven\'t selected any Pension Providers!'
          }
        ])
      }
      else{
        setProviderList(response.data.message);
      }      
    });
  };

  //Transfer status
  const [transferStatus, setTransferStatus] = useState(1);

    //Update status table
    const queueTransfer = () => {
      scrollWin();
      setTransferStatus(1);
      Axios.post("http://localhost:5000/queueTransfer", { 
      transferStatus: transferStatus,  
      
      }).then((response) => {
        console.log(response.data.message);
        setProviderList(response.data.message);
        
      });
    };

  const [checkPath, setcheckPath] = useState();

  const checkBtn = () =>{
    if(document.getElementById('consentInput1').checked && document.getElementById('consentInput2').checked){
      queueTransfer();
      window.location.href="/#/userDashboard";
      //setcheckPath("/userDashboard");
    }
    else{
      alert("Please agree to our terms!")
      window.location.href="/#/confirmPage";
  }
  }

  //Login status
  const [loginStatus, setLoginStatus] = useState("false");

  const checkLogin= () => {
    Axios.post("http://localhost:5000/auth", {
      
    }).then((response) => {
        console.log(response.status);
        if(response.data.message == 'Not authenticated'){
          window.history.go(-1);
        }
        else{
          setLoginStatus("true")
        }
  
    });
  };


//On load scroll to top
function scrollWin() {
  window.scrollTo(0, 0);
}

  return (
    <div onLoadCapture={checkLogin} onLoad={pensionProvider} className="container-fluid account-section">
      <div class="container">
        <>
          <Router>
            <Switch>
              <Route exact path="/confirmPage">
                <NavbarSignedIn />
              </Route>
            </Switch>
          </Router>
        </>
        <Link to="/pensionDetails">
          <span>
            <Icon className="back-arrow" name="arrow left" />
            Back
          </span>
        </Link>
      </div>
      <div class="row">
        <div class="col-lg-6">
          <div class="blueDiv fadeInLeft">
            <h1>Confirm Transfer</h1>
          </div>
          <div className="confirm-vectorImg">
            <img
              className="img-fluid confirmPage-vector fadeInLeft"
              src={img1}
              alt="PensionDetails vector"
            />
          </div>
        </div>
        <div class="col-lg-6 fadeInUp">
          <div className="confirm-Provider">
            <h3>Pensions to Transfer</h3>
            <div>
            {
              providerList.map(provider => 
                  <li class="pendingTransfer">
                    <span className="pendingTransferProviderName">{provider.providerName}</span>
                  </li>    
                  )
             }
            </div>
            <form action="handler.php" method="POST" className="completeForm">
              <div>
                <label for="consentInput">
                  <input id="consentInput1" type="checkBox" />

                  <span className="consentPhrase">
                    I consent to adding these pensions' remaining sums to my new
                    Pensionplus portfolio.
                  </span>
                </label>
                <label className="consentLabel" for="terms">
                  <input id="consentInput2" type="checkBox" />

                  <span className="consentPhrase">
                    I hereby confirm to have read, comprehended, and agreed to
                    the Terms, including the Declarations, Data Protection, and
                    Transfer authorizations therein.
                  </span>
                </label>
              </div>
            </form>

            <Link to={checkPath} onMouseDown={checkBtn}><button className="createACC-btn">Complete</button></Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmPage;
