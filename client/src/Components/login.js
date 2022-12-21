import { HashRouter as Router, Route, Switch, Link } from "react-router-dom";
import Navbar from "./NavBar";
import { useState, useEffect } from "react";
import Axios from "axios";


//Images
import img1 from "../Assets/create-acc-vector.png";

const LogIn = () => {

    //Checkpath
    const [checkPath, setCheckPath] = useState("/login");


     //Login status
  const [loginStatus, setLoginStatus] = useState("false");


  //Login user
  Axios.defaults.withCredentials = true;

  const login = () => {
    Axios.post("http://localhost:5000/login", {
      email: email,
      password: password,
    }).then((response) => {
      if(response.data.message=="Wrong email/Password combination!"){
        setCheckPath("/login");
        alert(response.data.message);
      }
      else if(response.data.message=="User does not exist!"){
        setCheckPath("/login");
        alert(response.data.message);
      }
      else{
        window.location.href="/#/userDashboard";
      }

    });
  };


  //Check input field
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

  //Input values

  const email = inputValue;
  const password = inputValue2;

  var logInBtn;

  const checkDetails = () =>{
    if(inputValue == null && inputValue2 == null){
        alert("Please input Email and password!");
    }
    else if(inputValue == null || inputValue2 == null){
        checkEmpty();
    }
  }

  const checkEmpty = () =>{
    if(inputValue == null || inputValue == ""){
        alert("Please input Email!");
    }
   if(inputValue2 == null || inputValue2 == ""){
        alert("Please input password!");
    }

  }

  if((inputValue == null || inputValue == "")|| (inputValue2 == null || inputValue2 == "")){
    logInBtn = (
        <button class="createACC-btn" onClick={checkDetails}>Login</button>
    )
   
  }
  else{
   
    logInBtn = (
      <Link onMouseDown={login} ><button class="createACC-btn" >Login</button></Link>
  )
   
  }
  

  return (
    <div  className="container-fluid account-section">
      <div class="container">
        <>
          <Router>
            <Switch>
              <Route exact path="/login">
                <Navbar />
              </Route>
            </Switch>
          </Router>
        </>
      </div>
      <div class="row">
        <div class="col-lg-6">
          <div class="blueDiv fadeInLeft">
            <h1>Combine, Contribute and withdraw</h1>
          </div>
          <img
            className="img-fluid create-acc-vector fadeInUp"
            src={img1}
            alt="Create-account-vector"
          />
        </div>
        <div class="col-lg-6 fadeInRight">
          <div className="account-Form">
            <h3>Log In</h3>
            <form
              action="handler.php"
              className="create-account-form"
              name="accountForm"
              method="POST"
            >
              <label for="name">
                <span>Email</span>
                <br />
                <br />
                <input
                  onChange={onChange}
                  type="email"
                  className="inputbox"
                  id="name"
                  placeholder="User email"
                  required
                />
              </label>
              <label for="password">
                <span>Password</span>
                <br />
                <br />
                <input
                  onChange={onChange2}
                  type="password"
                  className="inputbox"
                  name="Password"
                  id="password"
                  placeholder="Input password"
                  required
                />
              </label>
            </form>
            {logInBtn}
            <p>
            <span>Don't have an account?</span>&nbsp;&nbsp;&nbsp;<span><Link to="/create-account">Create account</Link></span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;