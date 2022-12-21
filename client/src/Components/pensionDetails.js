import { HashRouter as Router, Route, Switch, Link } from "react-router-dom";
import NavbarSignedIn from "./Navbar-SignedIn";
import React, { useRef } from "react";
import SignatureCanvas from "react-signature-canvas";
import { useState, useEffect } from "react";
import Axios from "axios";

import "semantic-ui-css/semantic.min.css";
import { Icon } from "semantic-ui-react";

//Images
import img1 from "../Assets/pensionDetail vector.png";
import img2 from "../Assets/successTick.png";
import img3 from "../Assets/digital-signature 1.png";

const PensionDetails = () => {
  //Input value

  const [inputValue, setInputValue] = useState();

  let onChange = (event) => {
    const newValue = event.target.value;
    setInputValue(newValue);
  };

  const [inputValue2, setInputValue2] = useState();

  let onChange2 = (event) =>{
    const newValue = event.target.value;
    setInputValue2(newValue);
  }

  const [employerfundstatus, setEmployerFundStatus] = useState('false');

  const fundStatus = () =>{
    const status = document.getElementById('employerfundstatus').checked;
    if(status){
      setEmployerFundStatus('true');
    }
    else{
      setEmployerFundStatus('false');
    }
  }

  const [inputValue3, setInputValue3] = useState();

  let onChange3 = (event) =>{
    const newValue = event.target.value;
    setInputValue3(newValue);
  }


  const checkAlerts = () => {
    if (inputValue == null) {
      alert("Please input provider name!");
    }
  };

  //dropdown select

  const [value, setValue] = React.useState('Britam');

  const handleSelect = (event) => {
    setValue(event.target.value);
  };

  const handleModal = () => {
    document.getElementById("s-card").style.display = "flex";
    document.getElementById("s-card").style.zIndex = "1";
  };

  const handleModal2 = () => {
    document.getElementById("s-card").style.display = "none";
    document.getElementById("s-card").style.zIndex = "-1";
  };

  const handleSigModal = () => {
    handleModal2();
    document.getElementById("sig-card").style.display = "flex";
    document.getElementById("sig-card").style.zIndex = "1";
  };


  //Signature form
  var screenWidth = window.screen.width;
  var signature;

  let sigPad = useRef({});

  if (screenWidth <= 750) {
    signature = (
      <SignatureCanvas
        penColor="black"
        ref={sigPad}
        canvasProps={{ width: 300, height: 150, className: "signatureInput" }}
      />
    );
  } else if (screenWidth > 750 && screenWidth < 1100) {
    signature = (
      <SignatureCanvas
        penColor="black"
        ref={sigPad}
        canvasProps={{ width: 600, height: 150, className: "signatureInput" }}
      />
    );
  } else {
    signature = (
      <SignatureCanvas
        penColor="black"
        ref={sigPad}
        canvasProps={{ width: 800, height: 150, className: "signatureInput" }}
      />
    );
  }

  var sigData = "";

  function clear() {
    sigPad.current.clear();
  }

  function save() {
    sigData = sigPad.current.toDataURL();
  }

  function show() {
    sigPad.current.fromDataURL(sigData);
  }

  //Path
  const [sig, setSig] = useState();
  const userSignature =sig;
  const [checkPath, setcheckPath] = useState();

  function showAlert() {
    alert("Please input signature!");
  }

  const handlePath = () => {
    save();

    if (
      sigData ==
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAyAAAACWCAYAAAAmC+ydAAAAAXNSR0IArs4c6QAACXpJREFUeF7t1zENAAAMw7CVP+mxyOURqGTtyc4RIECAAAECBAgQIEAgEli0Y4YAAQIECBAgQIAAAQInQDwBAQIECBAgQIAAAQKZgADJqA0RIECAAAECBAgQICBA/AABAgQIECBAgAABApmAAMmoDREgQIAAAQIECBAgIED8AAECBAgQIECAAAECmYAAyagNESBAgAABAgQIECAgQPwAAQIECBAgQIAAAQKZgADJqA0RIECAAAECBAgQICBA/AABAgQIECBAgAABApmAAMmoDREgQIAAAQIECBAgIED8AAECBAgQIECAAAECmYAAyagNESBAgAABAgQIECAgQPwAAQIECBAgQIAAAQKZgADJqA0RIECAAAECBAgQICBA/AABAgQIECBAgAABApmAAMmoDREgQIAAAQIECBAgIED8AAECBAgQIECAAAECmYAAyagNESBAgAABAgQIECAgQPwAAQIECBAgQIAAAQKZgADJqA0RIECAAAECBAgQICBA/AABAgQIECBAgAABApmAAMmoDREgQIAAAQIECBAgIED8AAECBAgQIECAAAECmYAAyagNESBAgAABAgQIECAgQPwAAQIECBAgQIAAAQKZgADJqA0RIECAAAECBAgQICBA/AABAgQIECBAgAABApmAAMmoDREgQIAAAQIECBAgIED8AAECBAgQIECAAAECmYAAyagNESBAgAABAgQIECAgQPwAAQIECBAgQIAAAQKZgADJqA0RIECAAAECBAgQICBA/AABAgQIECBAgAABApmAAMmoDREgQIAAAQIECBAgIED8AAECBAgQIECAAAECmYAAyagNESBAgAABAgQIECAgQPwAAQIECBAgQIAAAQKZgADJqA0RIECAAAECBAgQICBA/AABAgQIECBAgAABApmAAMmoDREgQIAAAQIECBAgIED8AAECBAgQIECAAAECmYAAyagNESBAgAABAgQIECAgQPwAAQIECBAgQIAAAQKZgADJqA0RIECAAAECBAgQICBA/AABAgQIECBAgAABApmAAMmoDREgQIAAAQIECBAgIED8AAECBAgQIECAAAECmYAAyagNESBAgAABAgQIECAgQPwAAQIECBAgQIAAAQKZgADJqA0RIECAAAECBAgQICBA/AABAgQIECBAgAABApmAAMmoDREgQIAAAQIECBAgIED8AAECBAgQIECAAAECmYAAyagNESBAgAABAgQIECAgQPwAAQIECBAgQIAAAQKZgADJqA0RIECAAAECBAgQICBA/AABAgQIECBAgAABApmAAMmoDREgQIAAAQIECBAgIED8AAECBAgQIECAAAECmYAAyagNESBAgAABAgQIECAgQPwAAQIECBAgQIAAAQKZgADJqA0RIECAAAECBAgQICBA/AABAgQIECBAgAABApmAAMmoDREgQIAAAQIECBAgIED8AAECBAgQIECAAAECmYAAyagNESBAgAABAgQIECAgQPwAAQIECBAgQIAAAQKZgADJqA0RIECAAAECBAgQICBA/AABAgQIECBAgAABApmAAMmoDREgQIAAAQIECBAgIED8AAECBAgQIECAAAECmYAAyagNESBAgAABAgQIECAgQPwAAQIECBAgQIAAAQKZgADJqA0RIECAAAECBAgQICBA/AABAgQIECBAgAABApmAAMmoDREgQIAAAQIECBAgIED8AAECBAgQIECAAAECmYAAyagNESBAgAABAgQIECAgQPwAAQIECBAgQIAAAQKZgADJqA0RIECAAAECBAgQICBA/AABAgQIECBAgAABApmAAMmoDREgQIAAAQIECBAgIED8AAECBAgQIECAAAECmYAAyagNESBAgAABAgQIECAgQPwAAQIECBAgQIAAAQKZgADJqA0RIECAAAECBAgQICBA/AABAgQIECBAgAABApmAAMmoDREgQIAAAQIECBAgIED8AAECBAgQIECAAAECmYAAyagNESBAgAABAgQIECAgQPwAAQIECBAgQIAAAQKZgADJqA0RIECAAAECBAgQICBA/AABAgQIECBAgAABApmAAMmoDREgQIAAAQIECBAgIED8AAECBAgQIECAAAECmYAAyagNESBAgAABAgQIECAgQPwAAQIECBAgQIAAAQKZgADJqA0RIECAAAECBAgQICBA/AABAgQIECBAgAABApmAAMmoDREgQIAAAQIECBAgIED8AAECBAgQIECAAAECmYAAyagNESBAgAABAgQIECAgQPwAAQIECBAgQIAAAQKZgADJqA0RIECAAAECBAgQICBA/AABAgQIECBAgAABApmAAMmoDREgQIAAAQIECBAgIED8AAECBAgQIECAAAECmYAAyagNESBAgAABAgQIECAgQPwAAQIECBAgQIAAAQKZgADJqA0RIECAAAECBAgQICBA/AABAgQIECBAgAABApmAAMmoDREgQIAAAQIECBAgIED8AAECBAgQIECAAAECmYAAyagNESBAgAABAgQIECAgQPwAAQIECBAgQIAAAQKZgADJqA0RIECAAAECBAgQICBA/AABAgQIECBAgAABApmAAMmoDREgQIAAAQIECBAgIED8AAECBAgQIECAAAECmYAAyagNESBAgAABAgQIECAgQPwAAQIECBAgQIAAAQKZgADJqA0RIECAAAECBAgQICBA/AABAgQIECBAgAABApmAAMmoDREgQIAAAQIECBAgIED8AAECBAgQIECAAAECmYAAyagNESBAgAABAgQIECAgQPwAAQIECBAgQIAAAQKZgADJqA0RIECAAAECBAgQICBA/AABAgQIECBAgAABApmAAMmoDREgQIAAAQIECBAgIED8AAECBAgQIECAAAECmYAAyagNESBAgAABAgQIECAgQPwAAQIECBAgQIAAAQKZgADJqA0RIECAAAECBAgQICBA/AABAgQIECBAgAABApmAAMmoDREgQIAAAQIECBAgIED8AAECBAgQIECAAAECmYAAyagNESBAgAABAgQIECAgQPwAAQIECBAgQIAAAQKZgADJqA0RIECAAAECBAgQICBA/AABAgQIECBAgAABApmAAMmoDREgQIAAAQIECBAgIED8AAECBAgQIECAAAECmYAAyagNESBAgAABAgQIECAgQPwAAQIECBAgQIAAAQKZgADJqA0RIECAAAECBAgQICBA/AABAgQIECBAgAABApmAAMmoDREgQIAAAQIECBAg8JsjAJdg2LaeAAAAAElFTkSuQmCC"
    ) {
      showAlert();
      setcheckPath("/pensionDetails");
    } else {
      setSig(sigData);
      userSig();
      setcheckPath("/confirmPage");
    }
  };

   //Login status
   const [loginStatus, setLoginStatus] = useState("false");

   const checkLogin= () => {
     Axios.post("http://localhost:5000/auth", {
       
     }).then((response) => {
         if(response.data.message == 'Not authenticated'){
          window.history.go(-1);
         }
         else{
           setLoginStatus("true")
         }
   
     });
   };

   //Variables sent to the backend
   const companyName = inputValue;
   const companyEmail = inputValue2;
   const provider = value;
   const isFundedByEmployer = employerfundstatus;
   const additionalInfo =inputValue3;
   const transferStatus = 0;
 


   //Sending user pension details to the backend
   const pensionDetails = () => {

    Axios.post("http://localhost:5000/pensionDetails", {
      companyName: companyName,
      companyEmail: companyEmail,
      provider: provider,
      isFundedByEmployer: isFundedByEmployer,
      additionalInfo: additionalInfo,
      transferStatus: transferStatus,
      
    }).then((response) => {
      console.log(response.data.message);
    });
  };

  //Send user signature to backend
  const userSig = () => {

    Axios.post("http://localhost:5000/userSignature", {
      userSignature: sigData,
      
    }).then((response) => {
      console.log(response.data.message);
      
    });
  };

  var nextBtn;
  if (inputValue == null) {
    nextBtn = (
      <button onClick={checkAlerts} className="createACC-btn">
        Next
      </button>
    );
  } else {
    nextBtn = (
      <button onClick={handleModal} onMouseDown={pensionDetails} className="createACC-btn">
        Next
      </button>
    );
  }


  return (
    <div onLoad={checkLogin} className="container-fluid account-section">
      <div class="container">
        <>
          <Router>
            <Switch>
              <Route exact path="/PensionDetails">
                <NavbarSignedIn />
              </Route>
            </Switch>
          </Router>
        </>
        <Link to="/userDashboard">
          <span>
            <Icon className="back-arrow" name="arrow left" />
            Back
          </span>
        </Link>
      </div>
      <div class="row">
        <div class="col-lg-4">
          <div class="blueDiv fadeInLeft">
            <h1>Almost there!</h1>
          </div>
        </div>
        <div class="col-lg-4 fadeInUp">
          <div className="account-Form">
            <h3>Pension Details</h3>
            <form
              action="handler.php"
              className="create-account-form"
              name="companyForm"
              method="POST"
            >
              <label for="Employer">
                <span>Employer/Company name</span>
                <br />
                <br />
                <input
                  type="text"
                  name="companyName"
                  onChange={onChange}
                  className="inputbox"
                  id="Employer"
                  placeholder="Employer/ Company name"
                  required
                />
              </label>
              <label for="OrganisationEmail">
                <span>
                  HR/Organisation Email{" "}
                  <span className="optional-field-text">(Optional)</span>
                </span>
                <br />
                <br />
                <input
                onChange={onChange2}
                  type="email"
                  name="companyEmail"
                  className="inputbox"
                  id="OrganisationEmail"
                  placeholder="HR/Organisation Email"
                />
              </label>
              <label for="Employment-status">
                <span>Pension Provider</span>
                <br />
                <br />
                <select
                  class="save-dropdown inputbox"
                  value={value}
                  id="Employment-status"
                  onChange={handleSelect}
                >
                  document.write("e");
                  <option id="question" value="Britam">
                    Britam
                  </option>
                  <option value="Prudential Life">Prudential Life</option>
                  <option value="GA Life">GA Life</option>
                  <option value="Kenindia">Kenindia</option>
                  <option value="Pioneer">Pioneer</option>
                  <option value="Jubilee">Jubilee</option>
                  <option value="Kenya Orient">Kenya Orient</option>
                  <option value="APA">APA</option>
                  <option value="Kenya Alliance">Kenya Alliance</option>
                  <option value="Old Mutual">Old Mutual</option>
                  <option value="ICEA ">ICEA </option>
                  <option value="The Monarch ">The Monarch </option>
                  <option value="CIC Life">CIC Life</option>
                  <option value="Corporate Insurance">Corporate Insurance</option>
                  <option value="Madison">Madison</option>
                  <option value="Saham">Saham</option>
                  <option value="Liberty Life">Liberty Life</option>
                  <option value="Capex Life Insurance">Capex Life Insurance</option>
                </select>
              </label>
              <label for="AdditionalInformation">
                <span>
                  Additional Information{" "}
                  <span oncChange={onChange3} className="optional-field-text">(Optional)</span>
                </span>
                <br />
                <br />
                <input
                  type="text"
                  name="AdditionalInfo"
                  className="inputbox"
                  id="AdditionalInformation"
                  placeholder="eg. tax Details"
                />
              </label>

              <div className="d-flex">
                <div className="check-box">
                  <input className="checkBox" onClick={fundStatus} type="checkbox" id="employerfundstatus"/>
                </div>
                <p>This pension is currently being funded by my employer.</p>
              </div>
            </form>
            {nextBtn}

            <br />
            <span>
              <b>Note:</b> The more details you provide, the faster we can
              transfer your funds.
            </span>
          </div>
        </div>
        <div className="col-lg-4 fadeInRight">
          <img
            className="PensionDetails-vector"
            src={img1}
            alt="PensionDetails vector"
          />
        </div>
      </div>

      <div className="modal container-fluid" onClick={handleModal2} id="s-card">
        <div className="card success-card fadeInUp" id="card">
          <div>
            <img className="img-fluid successTick" src={img2} alt="tick-img" />
          </div>
          <div>
            <p className="text-center" id="s-p1">
              Pension transfer queued successfully
            </p>
            <p className="text-center" id="s-p2">
              Would you like to add another pension provider?
            </p>
            <div className="s-btns">
              <Link
                onClick={handleModal2}
                className="btn btn-outline-secondary"
                id="s-btn1"
              >
                YES
              </Link>
              <Link
                className="btn btn-primary"
                id="s-btn2"
                onClick={handleSigModal}
              >
                NO
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="modal container-fluid" id="sig-card">
        <div className="card signature-card fadeInUp" id="card">
          <div>
            <img
              className="img-fluid successTick"
              src={img3}
              alt="signature img"
            />
          </div>
          <div>
            <p className="text-center" id="s-p3">
              Your signature
            </p>
            <p className="text-center" id="s-p2">
              To share pension information, majority of the providers need a
              letter of authorization and a signature. By signing below, you
              grant Pensionplus permission to utilize your physical or
              electronic signature as part of the fund acquisition process.
            </p>

            <form action="" method="POST" className="signatureForm">
              <label for="signature">
                <b>Sign here</b>{" "}
                <Icon class="downPointer" name="hand point down"></Icon>
              </label>
              <br />
              <div class="row">
                <div class="col-md-12">
                  {signature}
                  <input type="hidden" name="signature" id="signature" />
                </div>
              </div>
            </form>
            <div class="row">
              <div class="col-md-12">
                <Link to={checkPath} onMouseUp={handlePath}>
                  <button class="btn btn-primary" id="sig-submitBtn">
                    Submit Signature
                  </button>
                </Link>
                <button
                  class="btn btn-default"
                  id="sig-clearBtn"
                  onClick={clear}
                >
                  Clear Signature
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PensionDetails;
