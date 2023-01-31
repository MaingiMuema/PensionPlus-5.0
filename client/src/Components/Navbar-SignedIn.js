import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Axios from "axios";

import Logo from "../Assets/Logo.png";

//Localhost url for the server
const domain = "http://localhost:5000"; 

const NavbarSignedIn = () => {
  //Checkpath
  const [checkPath, setCheckPath] = useState("/Landing_page");

  //Login status
  const [loginStatus, setLoginStatus] = useState();

  const logout = () => {
    Axios.get(domain + "/logout", {}).then((response) => {
      if (response.data) {
        window.location.href = "/";
        console.log(response);
      }
    });
  };
  
    //Check if user details exist on the database
    const checkDetails = () => {
      Axios.post(domain + "/checkUserDetails", {}).then(
        (response) => {
          if (response.data.message == "Client details present") {
            window.location.href = "/pensionDetails";
            
          } else {
            window.location.href = "/clientDetails";
          }
        }
      );
    };

    const checkDetails2 = () => {
      Axios.post(domain + "/checkUserDetails", {}).then(
        (response) => {
          if (response.data.message == "Client details present") {
            window.location.href = "/contributionPage";
          } else {
            window.location.href = "/clientDetails";
          }
        }
      );
    };

  return (
    <nav className="navbar navbar-expand-xl navbar-light fadeInUp">
      <Link className="navbar-brand" to="/" >
        <img src={Logo} alt="Logo" onClick={ function move(){window.location.href = "/"}}/>
      </Link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-bs-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div className="navbar-collapse collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <Link className="nav-link" onClick={ function move(){window.location.href = "/"}}>About</Link>
          </li>

          <li className="nav-item dropdown">
              <Link className="nav-link dropdown-toggle" >Services</Link>

            <div className="navLinkDropdown dropdown-content">

                  <Link onClick={checkDetails}>Combine</Link>
    
 
                  <Link onClick={checkDetails2}>Contribute</Link>
    
 
                  <Link onClick={ function move(){window.location.href = "/consultancy"}}>Consultancy</Link>
    
            </div>
          </li>
         
          <li className="nav-item dropdown">
              <Link className="nav-link dropdown-toggle">Resources</Link>

            <div className="navLinkDropdown dropdown-content">

                  <Link onClick={ function move(){window.location.href = "/pensionCalculator"}}>Pension Calculator</Link>
    
 
                  <Link onClick={ function move(){window.location.href = "/pensionsExplained"}}>Pensions Explained</Link>
    
 
                  <Link onClick={ function move(){window.location.href = "/combineProcess"}}>WorkPlace Pension</Link>
    
 
                  <Link onClick={ function move(){window.location.href = "/contributeProcess"}}>Self-employed Saver</Link>
    
 
                  <Link onClick={ function move(){window.location.href = "/FAQs"}}>FAQs</Link>
    
 
                  <Link onClick={ function move(){window.location.href = "/terms"}}>Terms & Conditions</Link>
    
 
                  <Link onClick={ function move(){window.location.href = "/"}}>Contact Us</Link>
    
            </div>
          </li>

          <li className="nav-item dropdown">
              <Link className="nav-link dropdown-toggle">Our Pension</Link>

            <div className="navLinkDropdown dropdown-content">

                  <Link onClick={ function move(){window.location.href = "/ourPension"}}>Our Pension</Link>
    
 
                  <Link onClick={ function move(){window.location.href = "/howItWorks"}}>How it works</Link>
    
 
                  <Link onClick={ function move(){window.location.href = "/userDashboard"}}>Transfers</Link>
    
 
                  <Link onClick={ function move(){window.location.href = "/userDashboard"}}>Contributions</Link>
    
 
                  <Link onClick={ function move(){window.location.href = "/userDashboard"}}>Withdraw</Link>
    
            </div>
          </li>

          <li className="nav-item">
            <Link className="nav-link"  onClick={ function move(){window.location.href = "/userDashboard"}}>
              <b>Dashboard</b>
            </Link>
          </li>
        </ul>

        <div className="acc-btns">
          <Link onClick={logout} className="logIn-btn">
            LOG OUT
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavbarSignedIn;
