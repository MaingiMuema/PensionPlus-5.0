import React from "react";
import $ from 'jquery';
import { Icon } from 'semantic-ui-react'
import { HashRouter as Router, Route, Switch, Link } from "react-router-dom";
import NavbarSignedIn from "./Navbar-SignedIn";
import { useState, useEffect } from "react";
import Axios from "axios";
import ContributionPage from "./contributionPage";

//Images
import img1 from "../Assets/totalIcon.png";
import img2 from "../Assets/masterCard-removebg-preview.png";
import img3 from "../Assets/mpesa-removebg-preview.png";
import img4 from "../Assets/visa-removebg-preview.png";



const Payment = () => {

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

      //Contributions
      const contributionAmount = 7000000;

      const [inputValue, setInputValue] = useState();
  
      let onChange = (event) => {
        const newValue = event.target.value;
        setInputValue(newValue);
      };
  
      var nextBtn;
    
  
      //Total Pot amount
      const [totalPotAmount, setTotalPotAmount] = useState("20000000");


/*Check user session
useEffect(() =>{
  Axios.get("http://localhost:5000/login").then((response) => {
    if(response.data.loggedIn == true){
      setLoginStatus("LoggedIn");
    }
    
  })
}, [])*/
  

    return(
        <div onLoad={checkLogin} className="container-fluid Dashboard">
        <div className="container">
            <>
            <Router>
                <Switch>
                <Route exact path="/Payment">
                    <NavbarSignedIn />
                </Route>
                </Switch>
            </Router>
            </>
        </div>
        <div className="row">
            <div className="col-lg-4">
            <div className="dashboardBlueDiv ">
                <h1>Payment Method</h1>
            </div>
            </div>
            <div class="col-lg-4">
                <div className="dWrapper">
                    <div className="dashboardCard">
                        <div className="totalPot d-flex">
                        <span className="d-flex column1">
                            <div className="totalIcon">
                                <img className="img-fluid" src={img1} alt="total Icon" />
                            </div>
                            <div className="align-middle">
                            <p className="totalPotLabel">
                                Total Pot:
                                <br />
                                <br />{" "}
                                <p className="totalPotAmount">
                                <b>Ksh{totalPotAmount}</b>
                                </p>
                            </p>
                            </div>
                        </span>
                    
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-lg-4">
                    <div className="d-flex justify-content-center">
                        <div className="applausCard">
                            <h4>Total contributions</h4>
                            <h3>Ksh {contributionAmount}</h3>
                        </div>
                    </div>
                </div>
        </div>
        <div className="container dashboardButtonContainer">
            <div className="row">
                <div className="col-lg-4">
        
                </div>
                <div className="col-lg-4 ">
                            <div className="account-Form">
                            <h3>You have selected to contribute {}</h3>
                            <form
                            action="handler.php"
                            className="create-account-form"
                            name="companyForm"
                            method="POST"
                            >
                            <label for="Employer">
                                <span>Amount</span>
                                <br />
                                <br />
                                <input
                                type="number"
                                name="companyName"
                                onChange={onChange}
                                className="inputbox"
                                id="Employer"
                                placeholder="Enter amount"
                                required
                                />
                            </label>
                            </form>
                </div>
                <div className="col-lg-4">
                    
                </div>
            </div>
            <br />
          </div>
          <form id="paymentMethod">
          <h3 className="text-center" >Choose payment method</h3>
                <div className="row">
                        <div className="col-lg-4">
                            <label for="mpesa"  className="d-flex justify-content-center">
                                <div>
                                        <button className="paymentMethod  ">
                                            <div className="buttonIcon">
                                                <img className="img-fluid bIcon" src={img2} alt="total Icon" />
                                                <input type="radio" id="mpesa" name="paymentMethod" className="paymentCheckbox"/>
                                            </div>
                                            <br/>
                                        </button>
                                </div>
                            </label>
                        </div>
                        <div className="col-lg-4">
                        <label for="visa" className="d-flex justify-content-center">
                            <div >
                                    <button className="paymentMethod  ">
                                        <div className="buttonIcon">
                                            <img className="img-fluid bIcon" src={img3} alt="total Icon" />
                                            <input type="radio" id="visa" name="paymentMethod" className="paymentCheckbox"/>
                                        </div>
                                        <br/>
                                    </button>
                            </div>
                        </label>
                        </div>
                    <div className="col-lg-4">
                        <label for="mastercard" className="d-flex justify-content-center">
                            <div>
                                    <button className="paymentMethod ">
                                        <div className="buttonIcon">
                                            <img className="img-fluid bIcon" src={img4} alt="total Icon" />
                                            <input type="radio" id="mastercard" name="paymentMethod" className="paymentCheckbox"/>
                                        </div>
                                        <br/>
                                    </button>
                            </div>
                        </label>
                        </div>
                    </div>     
            </form>
                <div className="row">
                {nextBtn}
                </div>
              
        </div>
        </div>
    );
}

export default Payment;