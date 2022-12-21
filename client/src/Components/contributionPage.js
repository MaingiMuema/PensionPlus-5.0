import { HashRouter as Router, Route, Switch, Link } from "react-router-dom";
import Navbar from "./NavBar";
import { useState, useEffect } from "react";
import Axios from "axios";
import NavbarSignedIn from "./Navbar-SignedIn";
import Payment from "./Payment";

//Images
import img1 from "../Assets/totalIcon.png";
import img2 from "../Assets/masterCard-removebg-preview.png";
import img3 from "../Assets/mpesa-removebg-preview.png";
import img4 from "../Assets/visa-removebg-preview.png";
import img5 from "../Assets/create-acc-vector.png";

const ContributionPage = () => {

  const [inputValue, setInputValue] = useState();

  let onChange = (event) => {
    const newValue = event.target.value;
    setInputValue(newValue);
  };

const checkAlert = () =>{
  alert("Please input amount");
}

  var nextBtn;

  if(inputValue == "" || inputValue == null){
    nextBtn = (
        <Link to="/contributionPage">
          <button className="createACC-btn" onClick={checkAlert}>Next</button>
        </Link>
    );
  }
  else{
    nextBtn = (
        <Link to="/checkOutPage">
          <button className="createACC-btn">Next</button>
        </Link>
    )
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

//Check user session


  return (
    <div onLoad={checkLogin} className="container-fluid account-section">
      <div class="container">
        <>
          <Router>
            <Switch>
              <Route exact path="/contributionPage">
                <NavbarSignedIn />
              </Route>
            </Switch>
          </Router>
        </>
      </div>
      <div class="row">
        <div class="col-lg-4">
          <div class="blueDiv fadeInLeft">
            <h1>Contribute with ease</h1>
          </div>
        </div>
        <div class="col-lg-4 fadeInUp">
          <div className="account-Form">
            <h3>How much would you like to contribute?</h3>
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
            <br />
          </div>
        </div>
        <div className="col-lg-4">
        </div>
        <form id="paymentMethod">
         
                <div className="row">    
                        <div className="col-lg-4">
                       
                        </div>                   
                        <div className="col-lg-4 fadeInRight">
                        <h3 className="text-center" >Payment method</h3>
                        <label for="visa" className="d-flex justify-content-center">
                            <div >
                              <Link>
                                <button className="paymentMethod  ">
                                    <div className="buttonIcon">
                                        <img className="img-fluid bIcon" src={img3} alt="total Icon" />
                                    </div>
                                    <br/>
                                </button>
                              </Link>
                            </div>
                        </label>
                        </div>
                        <div className="col-lg-4">
                       
                        </div>
                    </div>     
            </form> 
      </div>
     
    </div>
   
  );
};

export default ContributionPage;