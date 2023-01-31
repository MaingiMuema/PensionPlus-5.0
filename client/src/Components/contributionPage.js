import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
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


//Localhost url for the server
const domain = "http://localhost:5000"; 

const ContributionPage = () => {
  const [inputValue, setInputValue] = useState();

  let onChange = (event) => {
    const newValue = event.target.value;
    setInputValue(newValue);
  };

  const checkAlert = () => {
    alert("Please input amount");
  };
 

   //Get total contributed amount from backend
   const [contributedAmount, setContributedAmount] = useState(0);

   const totalContributions = () => {
    Axios.post(domain + "/totalContributions", {}).then(
      (response) => {
        if (response) {
          setContributedAmount(response.data[0].totalContributed);
          if (
            response.data[0].totalContributed == "" ||
            response.data[0].totalContributed == null
          ) {
            setContributedAmount(0);
          }
        } else {
        }
      }
    );
  };

  //Integrating the Mpesa API

  //Sending contribution amount to the backend
  
    const contributeAmount = inputValue;

    const contributionAmount = () => {

      //Mpesa Logic to go here.

      //After money is deposited successfully, run the axios function below to store added amount to database

      Axios.post(domain + "/contributionAmount", {
        contributeAmount: contributeAmount,
      }).then(
      (response) => {
       console.log(response);
      }
    );
  };

      //Get total withdrawn amount from backend
      const [withdrawAmnt, setWithdrawAmnt] = useState(0);

      const withdrawals = () => {
        Axios.post(domain + "/withdrawals", {}).then(
          (response) => {
            if (response) {
              setWithdrawAmnt(response.data[0].withdrawAmount);
            } else {
              setWithdrawAmnt(response.data[0].withdrawAmount);
            }
          }
        );
      };

       //Deducting withdrawals from contributions
  const finalContributedAmount = contributedAmount + withdrawAmnt;

  //Login status
  const [loginStatus, setLoginStatus] = useState("false");

  const checkLogin = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    Axios.post(domain + "/auth", {}).then((response) => {
      console.log(response.status);
      if (response.data.message == "Not authenticated") {
        window.history.go(-1);
      } else {
        setLoginStatus("true");
        totalContributions();
        withdrawals();
      }
    });
  };

  const handleClickac = () => {
    if(contributeAmount == "" || contributeAmount == null){
        document.getElementById('cConfirm2').style.display='flex';
        document.getElementById('cConfirm2').style.zIndex='1'
    }
    else{
      document.getElementById('cConfirm').style.display='flex';
      document.getElementById('cConfirm').style.zIndex='1';
    }
};

const handleClick3 = () =>{
  document.getElementById('cConfirm').style.display='none';
  document.getElementById('cConfirm').style.zIndex='-1';
}

const successAlert = () =>{
  contributionAmount();
  alert("You have successfully deposited: Ksh" + contributeAmount);
}

  //Alert modal box

  const handleClick2 = () =>{
    document.getElementById('cConfirm2').style.display='none';
    document.getElementById('cConfirm2').style.zIndex='-1';
  };
  

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
        <div class="col-lg-4 fadeInBottom d-flex justify-content-center">
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
          <div className="d-flex justify-content-center">
            <div className="applausCard fadeInRight">
              <h4>Total contribution</h4>
              <h3>Ksh {finalContributedAmount}</h3>
            </div>
          </div>
        </div>
        <form id="paymentMethod">
          <div className="row">
            <div className="col-lg-4"></div>
            <div className="col-lg-4 fadeInUp">
              <h3 className="text-center pMethodTxt">Payment method</h3>
              <div className="d-flex justify-content-center">
                <label for="visa">
                  <div>
                    <Link onClick={handleClickac}>
                      <button className="paymentMethod  ">
                        <div className="buttonIcon">
                          <img
                            className="img-fluid bIcon"
                            src={img3}
                            alt="total Icon"
                          />
                        </div>
                        <br />
                      </button>
                    </Link>
                  </div>
                </label>
              </div>
            </div>
            <div className="col-lg-4"></div>
          </div>
        </form>
      </div>

      <div class="modal container-fluid " onClick={handleClick3} id="cConfirm">
        <div class="card contributeConfirm fadeInBottom" id="card">
            <div> 
                
            </div>
            <div>
              <div id="modal-card-content">
                <p class="text-center" id="s-heading"><b>Deposit Ksh{contributeAmount} to PensionPlus</b></p>
                <p class="text-center">An mpesa message prompt to complete the transaction</p>
                <p class="text-center"> and enter your pin  has been sent to your phone.</p>
              </div>
                <div class="d-flex justify-content-center">
                    <Link to="/userDashboard" onClick={successAlert} class="btn btn-outline-secondary" id="s-btn-C-page">Complete</Link>
                </div>
            </div>
        </div>
      </div>  

      <div class="modal container-fluid " onClick={handleClick2} id="cConfirm2">
        <div class="card contributeConfirm fadeInBottom" id="card">
            <div> 
                
            </div>
            <div>
              <div id="modal-card-content">
               <p><b>Please Input amount to deposit!</b></p>
              </div>
              <div class="d-flex justify-content-center">
                  <Link onClick={handleClick2} class="btn btn-outline-secondary" id="s-btn-C-page">Ok</Link>
              </div>
            </div>
        </div>
      </div>  
    </div>
  );
};

export default ContributionPage;
