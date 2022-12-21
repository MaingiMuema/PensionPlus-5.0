import { Link } from "react-router-dom";

import Logo from "../../Assets/Logo.png";
import Axios from "axios";

const AdminDashboardNavBar = () => {

  const logout = () => {
    Axios.get("http://localhost:5000/logout", {

    }).then((response) => {
      if(response.data){
        window.location.href="/#/admin-login";
        console.log(response);
      }
    });
  };


  return (
    <nav className="navbar navbar-expand-xl dashboardNavbar fadeInUp">
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
        

        <div className="acc-btns d-flex justify-content-end" >
          <div>
              <Link onClick={logout} className="logIn-btn " to="/admin-login">LOG OUT</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AdminDashboardNavBar;
