import { Link } from "react-router-dom";

import Logo from "../Assets/Logo.png";
import Axios from "axios";

//Localhost url for the server
const domain = "http://localhost:5000"; 

const DashboardNavBar = () => {
  const logout = () => {
    Axios.get(domain + "/logout", {}).then((response) => {
      if (response.data) {
        window.location.href = "/";
        console.log(response);
      }
    });
  };

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

  return (
    <nav className="navbar navbar-expand-xl dashboardNavbar ">
      <Link className="navbar-brand" onClick={ function move(){window.location.href = "/"}}>
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
            <Link className="nav-link" onClick={ function move(){window.location.href = "/about"}}>About</Link>
          </li>

          <li className="nav-item dropdown">
            
              <Link className="nav-link dropdown-toggle">Services</Link>
            
            <div className="navLinkDropdown dropdown-content">
               
                  <Link onClick={checkDetails}>Combine</Link>
                
                
                  <Link onClick={ function move(){window.location.href = "/contributionPage"}}>Contribute</Link>
                
                
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

export default DashboardNavBar;
