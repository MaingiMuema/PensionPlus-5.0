import { Link } from "react-router-dom";

import Logo from "../Assets/Logo.png";
import Axios from "axios";

const DashboardNavBar = () => {
  const logout = () => {
    Axios.get("http://localhost:5000/logout", {}).then((response) => {
      if (response.data) {
        window.location.href = "/";
        console.log(response);
      }
    });
  };

  const checkDetails = () => {
    Axios.post("http://localhost:5000/checkUserDetails", {}).then(
      (response) => {
        if (response.data.message == "Client details present") {
          window.location.href = "/#/pensionDetails";
        } else {
          window.location.href = "/#/clientDetails";
        }
      }
    );
  };

  return (
    <nav className="navbar navbar-expand-xl dashboardNavbar ">
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
            <Link className="nav-link">About</Link>
          </li>

          <li className="nav-item dropdown">
            <a>
              <Link className="nav-link dropdown-toggle">Services</Link>
            </a>
            <div className="navLinkDropdown dropdown-content">
               <a href="#">
                  <Link onClick={checkDetails}>Combine</Link>
                </a>
                <a href="#">
                  <Link to="/contributionPage">Contribute</Link>
                </a>
                <a href="#">
                  <Link to="/consultancy">Consultancy</Link>
                </a>
            </div>
          </li>
         
          <li className="nav-item dropdown">
            <a>
              <Link className="nav-link dropdown-toggle">Resources</Link>
            </a>
            <div className="navLinkDropdown dropdown-content">
               <a href="#">
                  <Link to="/pensionCalculator">Pension Calculator</Link>
                </a>
                <a href="#">
                  <Link to="/pensionsExplained">Pensions Explained</Link>
                </a>
                <a href="#">
                  <Link to="/combineProcess">WorkPlace Pension</Link>
                </a>
                <a href="#">
                  <Link to="/contributeProcess">Self-employed Saver</Link>
                </a>
                <a href="#">
                  <Link to="/FAQs">FAQs</Link>
                </a>
                <a href="#">
                  <Link to="/terms">Terms & Conditions</Link>
                </a>
                <a href="#">
                  <Link to="/">Contact Us</Link>
                </a>
            </div>
          </li>

          <li className="nav-item dropdown">
            <a>
              <Link className="nav-link dropdown-toggle">Our Pension</Link>
            </a>
            <div className="navLinkDropdown dropdown-content">
               <a href="#">
                  <Link to="/ourPension">Our Pension</Link>
                </a>
                <a href="#">
                  <Link to="/howItWorks">How it works</Link>
                </a>
                <a href="#">
                  <Link to="/userDashboard">Transfers</Link>
                </a>
                <a href="#">
                  <Link to="/userDashboard">Contributions</Link>
                </a>
                <a href="#">
                  <Link to="/userDashboard">Withdraw</Link>
                </a>
            </div>
          </li>
        </ul>

        <div className="acc-btns">
          <Link onClick={logout} className="logIn-btn" to="/">
            LOG OUT
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default DashboardNavBar;
