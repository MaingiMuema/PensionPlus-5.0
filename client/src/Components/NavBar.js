import { Link } from "react-router-dom";
import Logo from "../Assets/Logo.png";

const Navbar = () => {
  
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
          <a data-bs-toggle="collapse" href="#ourPensionDropdown" data-bs-target="#ourPensionDropdown" role="button" aria-expanded="false" aria-bs-controls="ourPensionDropdown">
              <Link className="nav-link">
                Our Pension
              </Link>
            </a>
            <div className="collapse navLinkDropdown" id="ourPensionDropdown">
              <div className="dropdownLinkContainer"><Link className="dropdownLink" href="#">Our Pension</Link></div>
              <div className="dropdownLinkContainer"><Link className="dropdownLink" href="#">How it works</Link></div>
              <div className="dropdownLinkContainer"><Link className="dropdownLink" href="#">Transfers</Link></div>
              <div className="dropdownLinkContainer"><Link className="dropdownLink" href="#">Contributions</Link></div>
              <div className="dropdownLinkContainer"><Link className="dropdownLink" href="#">Withdraw</Link></div>
            </div>
          </li>
        </ul>

        <div className="acc-btns">
          <Link className="logIn-btn" to="/login">LOG IN</Link>
          <Link to="/create-account">
            <button className="signUp-btn">SIGN UP</button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
