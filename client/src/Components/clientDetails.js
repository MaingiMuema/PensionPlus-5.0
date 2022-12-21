import { HashRouter as Router, Route, Switch, Link } from "react-router-dom";
import NavbarSignedIn from "./Navbar-SignedIn";
import React from "react";
import "semantic-ui-css/semantic.min.css";
import { Icon } from "semantic-ui-react";
import { useState, useEffect } from "react";
import Axios from "axios";

//Images
import img1 from "../Assets/Verification illustrations.png";

const ClientDetails = (props) => {

  var name = props.name;
  console.log(name);


  const addDetails = () => {
    Axios.post("http://localhost:5000/userDetails", {
      phone: phone,
      id_no: id_no,
      dob: dob,
      employment_status: employment_status,
    }).then((response) => {
      console.log(response.data.message);
    });
  };

  const [valueOption, setValue] = React.useState("Employed");

  const handleSelect = (event) => {
    setValue(event.target.value);
  };

  console.log(valueOption);

  const [inputValue, setInputValue] = useState();

  let onChange = (event) => {
    const newValue = event.target.value;
    setInputValue(newValue);
  };

  const [inputValue2, setInputValue2] = useState();

  let onChange2 = (event) => {
    const newValue = event.target.value;
    setInputValue2(newValue);
  };

  const [inputValue3, setInputValue3] = useState();

  //DOB Validation

  let onChange3 = (event) => {
    const newValue = event.target.value;
    setInputValue3(newValue);

    var dob = new Date(newValue);

    var age;

    if (newValue == "") {
    } else {
      //calculate month difference from current date in time
      var month_diff = Date.now() - dob.getTime();

      //convert the calculated difference in date format
      var age_dt = new Date(month_diff);

      //extract year from date
      var year = age_dt.getUTCFullYear();

      //now calculate the age of the user
      age = Math.abs(year - 1970);
      console.log(year + age_dt);
    }

    if (age < 18) {
      console.log("Age below 18 is: ", age);
      alert("You must to be 18 Years and Above");
      newValue = event.target.value = null;
      setInputValue2(newValue);
      return false;
    } else {
      console.log("Age is: ", age);
    }
  };

  //Phone number validation

  const phoneValidation = () => {
    var val = inputValue;

    if (/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/g.test(val)) {
      console.log("No. is ok.");
    } else {
      return false;
    }
  };

  //Alerts
  const checkAlerts = () => {
    if (inputValue == null || inputValue2 == null || inputValue3 == null) {
      alert("Please fill in the fields appropriately!");
    }

    if (inputValue != null && inputValue != "") {
      if (phoneValidation() == false) {
        alert("Please input correct phone number!");
      }
    }
  };

  //Create account button
  var nextBtn;
  if (inputValue == null || inputValue2 == null || inputValue3 == null) {
    nextBtn = (
      <button onClick={checkAlerts} className="createACC-btn">
        Next
      </button>
    );
  } else if (phoneValidation() == false) {
    nextBtn = (
      <button onClick={checkAlerts} className="createACC-btn">
        Next
      </button>
    );
  } else {
    nextBtn = (
      <Link to="/pensionDetails" onClick={addDetails}>
        <button className="createACC-btn">Next</button>
      </Link>
    );
  }

  //user details

  const phone = inputValue;
  const id_no = inputValue2;
  const dob = inputValue3;
  const employment_status = valueOption;

  console.log(dob);

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



var backArrow;

if(loginStatus == "false"){
  backArrow = (
    <Link to="/create-account">
    <span>
      <Icon className="back-arrow" name="arrow left" />
      Back
    </span>
  </Link>
  )
}
else{
  
}


  return (
    <div onLoadCapture={checkLogin} className="container-fluid account-section">
      <div class="container">
        <>
          <Router>
            <Switch>
              <Route exact path="/clientDetails">
                <NavbarSignedIn />
              </Route>
            </Switch>
          </Router>
        </>
        {backArrow}
      </div>
      <div class="row">
        <div class="col-lg-4">
          <div class="blueDiv fadeInLeft">
            <h1>Great progress</h1>
          </div>
        </div>
        <div class="col-lg-4 fadeInUp">
          <div className="account-Form">
            <h3>Help us understand you more</h3>
            <form
              action="handler.php"
              className="create-account-form"
              method="POST"
            >
              <label for="phone">
                <span>Phone</span>
                <br />
                <br />
                <input
                  type="number"
                  onChange={onChange}
                  name="phoneNumber"
                  className="inputbox"
                  id="name"
                  placeholder="Enter your phone number"
                  required
                />
              </label>
              <label for="email">
                <span>ID number</span>
                <br />
                <br />
                <input
                  type="number"
                  onChange={onChange2}
                  name="ID"
                  className="inputbox"
                  id="email"
                  placeholder="Enter ID number"
                  required
                />
              </label>
              <label for="password">
                <span>Date of Birth</span>
                <br />
                <br />
                <input
                  type="date"
                  onChange={onChange3}
                  className="inputbox"
                  id="password"
                  placeholder="Enter Date of birth"
                  required
                />
              </label>
              <label for="Employment-status">
                <span>Employment status</span>
                <br />
                <br />
                <select
                  class="save-dropdown inputbox"
                  value={valueOption}
                  id="Employment-status"
                  onChange={handleSelect}
                >
                  document.write("e");
                  <option id="question" value="Employed">
                    Employed
                  </option>
                  <option value="Self-employed">Self-Employed</option>
                  <option value="Unemployed">Unemployed</option>
                </select>
              </label>
            </form>
            {nextBtn}
          </div>
        </div>
        <div className="col-lg-4 fadeInRight">
          <img
            className="Verification-vector"
            src={img1}
            alt="Verification vector"
          />
        </div>
      </div>
    </div>
  );
};

export default ClientDetails;
