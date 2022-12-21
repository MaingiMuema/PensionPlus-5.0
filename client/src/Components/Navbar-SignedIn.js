import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Axios from "axios";


import Logo from "../Assets/Logo.png";

const NavbarSignedIn = () => {

  //Checkpath
  const [checkPath, setCheckPath] = useState("/Landing_page");

  //Login status
const [loginStatus, setLoginStatus] = useState( );

   const logout = () => {
    Axios.get("http://localhost:5000/logout", {

    }).then((response) => {
      if(response.data){
        window.location.href="/";
        console.log(response);
      }
    });
  };





  return (
    <nav className="navbar navbar-expand-xl navbar-light fadeInUp">
      <Link className="navbar-brand" to="/">
        <img src={Logo} alt="Logo" />
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
            <Link className="nav-link">
              About Us
            </Link>
          </li>
          <li className="nav-item">
            <a data-bs-toggle="collapse" href="#serviceDropdown" data-bs-target="#serviceDropdown" role="button" aria-expanded="false" aria-bs-controls="serviceDropdown">
              <Link className="nav-link">
                Services
              </Link>
            </a>
            <div className="collapse navLinkDropdown" id="serviceDropdown">
              <div className="dropdownLinkContainer"><Link className="dropdownLink" href="#">Combine</Link></div>
              <div className="dropdownLinkContainer"><Link className="dropdownLink" href="#">Contribute</Link></div>
              <div className="dropdownLinkContainer"><Link className="dropdownLink" href="#">WorkPlace Pension</Link></div>
              <div className="dropdownLinkContainer"><Link className="dropdownLink" href="#">Self-employed Saver</Link></div>
              <div className="dropdownLinkContainer"><Link className="dropdownLink" href="#">Consultancy</Link></div>
            </div>
          </li>
          <li className="nav-item">
          <a data-bs-toggle="collapse" href="#resourceDropdown" data-bs-target="#resourceDropdown" role="button" aria-expanded="false" aria-bs-controls="resourceDropdown">
              <Link className="nav-link">
                Resources
              </Link>
            </a>
            <div className="collapse navLinkDropdown" id="resourceDropdown">
              <div className="dropdownLinkContainer"><Link className="dropdownLink" to="/pensionCalculator">Pension Calculator</Link></div>
              <div className="dropdownLinkContainer"><Link className="dropdownLink" href="#">Pensions Explained</Link></div>
              <div className="dropdownLinkContainer"><Link className="dropdownLink" href="#">FAQs</Link></div>
              <div className="dropdownLinkContainer"><Link className="dropdownLink" href="#">Terms & Conditions</Link></div>
              <div className="dropdownLinkContainer"><Link className="dropdownLink" href="#">Contact Us</Link></div>
            </div>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/userDashboard">
              <b>Dashboard</b>
            </Link>
          </li>
        </ul>

        <div className="acc-btns">
          <Link  to="/Landing_page" onClick={logout} className="logIn-btn" >LOG OUT</Link>
        </div>
      </div>
    </nav>
  );
};

export default NavbarSignedIn;
