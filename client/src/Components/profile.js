import { HashRouter as Router, Route, Switch, Link } from "react-router-dom";
import NavbarSignedIn from "./Navbar-SignedIn";
import React from "react";
import "semantic-ui-css/semantic.min.css";
import { Icon } from "semantic-ui-react";
import { useState, useEffect } from "react";
import Axios from "axios";


const Profile = () => { 

   //List Update
   const [beneficiary, setBeneficiary] = useState([]);

   //Get pending pension transfers
   const beneficiaries= () => {

       Axios.post("http://localhost:5000/beneficiaries", {      
       }).then((response) => {
           console.log(response);
       if(response.data == "No beneficiaries"){
           console.log(response);
   
           setBeneficiary(
               [
                   {
                     firstname: "No beneficiary", 
                     lastname: "",
                     benefit: 0,
                   }
               ]
           );
       }
       else{
           console.log(response);
           setBeneficiary(response.data);
          
       }
       
       
       });
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



var backArrow;

  backArrow = (
    <Link to="/userDashboard">
    <span>
      <Icon className="back-arrow" name="arrow left" />
      Back
    </span>
  </Link>
  )


  //User Profile data

  const [userName, setUserName] = useState();

  let onChange = (event) => {
    const newValue = event.target.value;
    setUserName(newValue);
  };

  //Update username on the backend
  const updateUserName = () => {
    Axios.post("http://localhost:5000/updateUserName", {
      userName: userName,
    }).then((response) => {
      
    });
  };

  const [userEmail, setUserEmail] = useState();

  let onChange1 = (event) => {
    const newValue = event.target.value;
    setUserEmail(newValue);
  };

  //Update userEmail on the backend
  const updateUserEmail = () => {
    Axios.post("http://localhost:5000/updateUserEmail", {
      userEmail: userEmail,
    }).then((response) => {
      
    });
  };

  const [userPhone, setUserPhone] = useState();

  let onChange2 = (event) => {
    const newValue = event.target.value;
    setUserPhone(newValue);
  };

  //Update userPhone on the backend
  const updateUserPhone = () => {
    Axios.post("http://localhost:5000/updateUserPhone", {
      userPhone: userPhone,
    }).then((response) => {
     
    });
  };

  const [userID, setUserId] = useState();

  let onChange3 = (event) => {
    const newValue = event.target.value;
    setUserId(newValue);
  };

  //Update userId on the backend
  const updateUserId = () => {
    Axios.post("http://localhost:5000/updateUserId", {
      userID: userID,
    }).then((response) => {
      
    });
  };

  const [dob, setDob] = useState();

  //DOB Validation

  let onChange4 = (event) => {
    const newValue = event.target.value;
    setDob(newValue);

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
      setDob(newValue);
      return false;
    } else {
      console.log("Age is: ", age);
    }
  };

  //Update dob on the backend
  const updateDOB = () => {
    Axios.post("http://localhost:5000/updateDOB", {
      dob: dob,
    }).then((response) => {
      
    });
  };

  const [employmentStatus, setEmploymentStatus] = useState("Employed");

  const handleSelect = (event) => {
    setEmploymentStatus(event.target.value);
  };

  //Update employmentStatus on the backend
  const updateEmploymentStatus = () => {
    Axios.post("http://localhost:5000/updateEmploymentStatus", {
      employmentStatus: employmentStatus,
    }).then((response) => {
      
    });
  };

  //Get profile details from backend

    const getProfile= () => {
      beneficiaries();
      Axios.post("http://localhost:5000/getProfile", {
        
      }).then((response) => {
        setUserName(response.data[0].name);
        setUserEmail(response.data[0].email);
        setUserPhone(response.data[0].phone);
        setEmploymentStatus(response.data[0].employment_status);
        setUserId(response.data[0].id_no); 
        
        var strPos = response.data[0].dob.slice(0, 10);
        setDob(strPos);
      });
    };

    //------------Beneficiary details----------
    const [beneficiaryFirstName, setbeneficiaryFirstName] = useState();

    let onChange5 = (event) => {
      const newValue = event.target.value;
      setbeneficiaryFirstName(newValue);
    };
  

    const [beneficiaryLastName, setbeneficiaryLastName] = useState();

    let onChange6 = (event) => {
      const newValue = event.target.value;
      setbeneficiaryLastName(newValue);
    };
  

    const [beneficiarydob, setbeneficiarydob] = useState();

    let onChange7 = (event) => {
      const newValue = event.target.value;
      setbeneficiarydob(newValue);
    };

      //Benefit limit
   const [benefit, setBenefit] = useState(50);

   let checkBenefit = (event) =>{
       const newValue = event.target.value;
       setBenefit(newValue);
     }
  
  //Send beneficiary details to the backend
  const insertBenefeciary = () => {
    Axios.post("http://localhost:5000/beneficiaryDetails", {
      beneficiaryFirstName: beneficiaryFirstName,
      beneficiaryLastName: beneficiaryLastName,
      beneficiarydob: beneficiarydob,
      benefit: benefit,
    }).then((response) => {
      
    });
  };

  return (
    <div onLoadCapture={checkLogin} onLoad={getProfile} className="container-fluid account-section">
      <div class="container">
        <>
          <Router>
            <Switch>
              <Route exact path="/profile">
                <NavbarSignedIn />
              </Route>
            </Switch>
          </Router>
        </>
        {backArrow}
      </div>
      <div className="row">
        <div className="col-lg-4">
          <div className="dashboardBlueDiv fadeInLeft">
              <h1>Profile</h1>
          </div>
        </div>
        <div className="col-lg-4 updateProfile fadeInUp">
        <hr className="separator" />
          <b>Name:</b> {userName}
          <br/>
          <br/>
          <a
              data-bs-toggle="collapse"
              href="#collapseExample1"
              data-bs-target="#collapseExample1"
              role="button"
              aria-expanded="false"
              aria-bs-controls="collapseExample1"
            >
            Update
          </a>
          <div class="collapse" id="collapseExample1">
            <div class="updateCard">
                  <input
                    onChange={onChange}
                    type="text"
                    className="inputbox"
                    id="name"
                    placeholder="Enter full name"
                    required
                  />
                  <button onClick={updateUserName} className="createACC-btn">Submit</button>
            </div>
          </div>
          
          <br/>
          <br/>
          <br/>
          <hr className="separator" />
          <b>Email:</b> {userEmail}
          <br/>
          <br/>
          <a
              data-bs-toggle="collapse"
              href="#collapseExample2"
              data-bs-target="#collapseExample2"
              role="button"
              aria-expanded="false"
              aria-bs-controls="collapseExample2"
            >
            Update
          </a>
          <div class="collapse" id="collapseExample2">
            <div class="updateCard">
                  <input
                    onChange={onChange1}
                    type="email"
                    name="email"
                    className="inputbox"
                    id="email"
                    placeholder="Email address"
                    required
                  />
                  <button onClick={updateUserEmail} className="createACC-btn">Submit</button>
                  <br/>
                  <b>Note:</b><span>Kindly note that after changing your email you'll be required to use it to login.</span>
            </div>
          </div>
          <br/>
          <br/>
          <br/>
          <hr className="separator" />
          <b>Phone:</b> {userPhone}
          <br/>
          <br/>
          <a
              data-bs-toggle="collapse"
              href="#collapseExample3"
              data-bs-target="#collapseExample3"
              role="button"
              aria-expanded="false"
              aria-bs-controls="collapseExample3"
            >
            Update
          </a>
          <div class="collapse" id="collapseExample3">
            <div class="updateCard">
                  <input
                    type="number"
                    onChange={onChange2}
                    name="phoneNumber"
                    className="inputbox"
                    id="name"
                    placeholder="Enter your phone number"
                    required
                  />
                  <button onClick={updateUserPhone} className="createACC-btn">Submit</button>
            </div>
          </div>
          <br/>
          <br/>
          <br/>
          <hr className="separator" />
          <b>ID number:</b> {userID}
          <br/>
          <br/>
          <a
              data-bs-toggle="collapse"
              href="#collapseExample4"
              data-bs-target="#collapseExample4"
              role="button"
              aria-expanded="false"
              aria-bs-controls="collapseExample4"
            >
            Update
          </a>
          <div class="collapse" id="collapseExample4">
            <div class="updateCard">
                  <input
                    type="number"
                    onChange={onChange3}
                    name="ID"
                    className="inputbox"
                    id="email"
                    placeholder="Enter ID number"
                    required
                  />
                  <button onClick={updateUserId} className="createACC-btn">Submit</button>
            </div>
          </div>
          <br/>
          <br/>
          <br/>
          <hr className="separator" />
          <b>DOB:</b> {dob}
          <br/>
          <br/>
          <a
              data-bs-toggle="collapse"
              href="#collapseExample5"
              data-bs-target="#collapseExample5"
              role="button"
              aria-expanded="false"
              aria-bs-controls="collapseExample5"
            >
            Update
          </a>
          <div class="collapse" id="collapseExample5">
            <div class="updateCard">
                  <input
                    type="date"
                    onChange={onChange4}
                    className="inputbox"
                    id="dob"
                    placeholder="Enter Date of birth"
                    required
                  />
                  <button onClick={updateDOB} className="createACC-btn">Submit</button>
            </div>
          </div>
          <br/>
          <br/>
          <br/>
          <hr className="separator" />
          <b>Employment Status:</b> {employmentStatus}
          <br/>
          <br/>
          <a
              data-bs-toggle="collapse"
              href="#collapseExample6"
              data-bs-target="#collapseExample6"
              role="button"
              aria-expanded="false"
              aria-bs-controls="collapseExample6"
            >
            Update
          </a>
          <div class="collapse" id="collapseExample6">
            <div class="updateCard">
                  <select
                    class="save-dropdown inputbox"
                    value={employmentStatus}
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
                  <button onClick={updateEmploymentStatus} className="createACC-btn">Submit</button>
            </div>
          </div>
          <br/>
          <br/>
          <br/>
          <hr className="separator" />
        </div>
        <div className="col-lg-4 beneficiariesUpdate fadeInRight">
          <h2>Beneficiaries</h2>
          <div className="listUpdateContainer">
              {
                  beneficiary.map(benefitiary => 
                      <li class="pendingTransfer">
                      <span className="pendingTransferProviderName">{benefitiary.firstname} &nbsp; {benefitiary.lastname} &nbsp; &nbsp; (Benefit: {benefitiary.benefit}%)</span>
                      <span className="d-flex justify-content-end">
                          <span className="progressStatus">
                            
                          </span>
                      </span>
                  </li>    
                      )
              }
           </div>
          <a
              data-bs-toggle="collapse"
              href="#collapseExample7"
              data-bs-target="#collapseExample7"
              role="button"
              aria-expanded="false"
              aria-bs-controls="collapseExample7"
            >
            Add Beneficiary
          </a>
          <div class="collapse" id="collapseExample7">
            <div class="updateCard">
                  <b>Firstname</b><br/><br/>
                  <input
                    onChange={onChange5}
                    type="text"
                    className="inputbox"
                    id="firstname"
                    placeholder="Enter first name"
                    required
                  />
                  <br/><br/>
                  <b>Lastname</b><br/><br/>
                  <input
                    onChange={onChange6}
                    type="text"
                    className="inputbox"
                    id="lastname"
                    placeholder="Enter Last name"
                    required
                  />
                  <br/><br/>
                  <b>DOB</b><br/><br/>
                  <input
                    type="date"
                    onChange={onChange7}
                    className="inputbox"
                    id="beneficiarydob"
                    placeholder="Enter Date of birth"
                    required
                  />
                  <br/><br/>
                  <label for="status" className="statusLabel">
                    <span><b>Benefit Limit</b><span className="optional-field-text">(1% - 100%)</span></span>
                    <br />
                    <br />
                    <div className="statusBubble d-flex justify-content-center">
                        <div className="bubble">
                            {benefit}%
                        </div>
                    </div>
                    <input
                    type="range"
                    min={"1"}
                    max={"100"}
                    className="inputbox"
                    id="status"
                    list='tickmarks'
                    onChange={checkBenefit}
                    />
                    <datalist id="tickmarks">
                        <option value="0" label="0%"></option>
                        <option value="25" label="25%"></option>
                        <option value="50" label="50%"></option>
                        <option value="75" label="75%"></option>
                        <option value="100" label="100%"></option>
                    </datalist>   
                </label>
                  <button onClick={insertBenefeciary} className="createACC-btn">Submit</button>
            </div>
          </div>
        </div>
      </div>      
    </div>
  );
};

export default Profile;