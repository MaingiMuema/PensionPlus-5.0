import { BrowserRouter as Link } from "react-router-dom";
import Logo from "../Assets/Logo.png";
import navLinkArrow from "../Assets/navlink-arrow.png";
import { Axios } from "axios";
import { useState } from "react";

//hooks
import { useLoginStatus } from "../Hooks/useLoginStatus";

//Localhost url for the server
const domain = "http://localhost:5000";

const Navbar = () => {
  //Login status
  const [loginStatus, checkLogin] = useLoginStatus(domain);

  let combineLink;
  let contributeLink;
  let transfersLink;

  if (loginStatus === "true") {
    combineLink = (
      <Link
        onClick={function move() {
          window.location.href = "/userDashboard";
        }}
      >
        Combine
      </Link>
    );

    contributeLink = (
      <Link
        onClick={function move() {
          window.location.href = "/userDashboard";
        }}
      >
        Contribute
      </Link>
    );
  } else {
    combineLink = (
      <Link
        onClick={function move() {
          window.location.href = "/login";
        }}
      >
        Combine
      </Link>
    );

    contributeLink = (
      <Link
        onClick={function move() {
          window.location.href = "/login";
        }}
      >
        Contribute
      </Link>
    );
  }

  return (
    <nav className="navbar navbar-expand-xl navbar-light fadeInUp">
      <Link
        className="navbar-brand"
        onClick={function move() {
          window.location.href = "/";
        }}
      >
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
            <Link
              className="nav-link"
              onClick={function move() {
                window.location.href = "/about";
              }}
            >
              About
            </Link>
          </li>

          <li className="nav-item dropdown">
            <Link className="nav-link dropdown-toggle">Services</Link>
            <div className="navLinkDropdown dropdown-content">
              {combineLink}
              {contributeLink}
              <Link
                onClick={function move() {
                  window.location.href = "/consultancy";
                }}
              >
                Consultancy
              </Link>
            </div>
          </li>

          <li className="nav-item dropdown">
            <Link className="nav-link dropdown-toggle">Resources</Link>
            <div className="navLinkDropdown dropdown-content">
              <Link
                onClick={function move() {
                  window.location.href = "/pensionCalculator";
                }}
              >
                Pension Calculator
              </Link>
              <Link
                onClick={function move() {
                  window.location.href = "/pensionsExplained";
                }}
              >
                Pensions Explained
              </Link>
              <Link
                onClick={function move() {
                  window.location.href = "/combineProcess";
                }}
              >
                WorkPlace Pension
              </Link>
              <Link
                onClick={function move() {
                  window.location.href = "/contributeProcess";
                }}
              >
                Self-employed Saver
              </Link>
              <Link
                onClick={function move() {
                  window.location.href = "/FAQs";
                }}
              >
                FAQs
              </Link>
              <Link
                onClick={function move() {
                  window.location.href = "/terms";
                }}
              >
                Terms & Conditions
              </Link>
              <Link
                onClick={function move() {
                  window.location.href = "/";
                }}
              >
                Contact Us
              </Link>
            </div>
          </li>

          <li className="nav-item dropdown">
            <Link className="nav-link dropdown-toggle">Our Pension</Link>
            <div className="navLinkDropdown dropdown-content">
              <Link
                onClick={function move() {
                  window.location.href = "/ourPension";
                }}
              >
                Our Pension
              </Link>
              <Link
                onClick={function move() {
                  window.location.href = "/howItWorks";
                }}
              >
                How it works
              </Link>
              <Link
                onClick={function move() {
                  window.location.href = "/comingSoon";
                }}
              >
                Plans
              </Link>
            </div>
          </li>
        </ul>

        <div className="acc-btns">
          <Link
            className="logIn-btn"
            onClick={function move() {
              window.location.href = "/login";
            }}
          >
            LOG IN
          </Link>
          <Link
            onClick={function move() {
              window.location.href = "/create-account";
            }}
          >
            <button className="signUp-btn">SIGN UP</button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
