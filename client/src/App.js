import "./App.css";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import React from "react";
import Landingpage from "./Components/Landing_page";
import CreateAccount from "./Components/create-account";
import ClientDetails from "./Components/clientDetails";
import PensionDetails from "./Components/pensionDetails";
import ConfirmPage from "./Components/confirmPage";
import UserDashboard from "./Components/userDashboard";
import DashboardNavBar from "./Components/dashboardNavbar";
import ContributionPage from "./Components/contributionPage";
import NavbarSignedIn from "./Components/Navbar-SignedIn";
import PensionDetailsLoggedIn from "./Components/pensionDetailsLoggedin";
import Withdraw from "./Components/withdraw";
import LogIn from "./Components/login";
import PensionCalculator from "./Components/pensionCalculator";
import Payment from "./Components/Payment";
import AdminDashboard from "./Components/Admindashboard/adminDashboard";
import AdminDashboardNavBar from "./Components/Admindashboard/AdminDashboardnavbar";
import CreateAdminAccount from "./Components/Admindashboard/admin-create-account";
import AdminLogIn from "./Components/Admindashboard/admin-login";
import Profile from "./Components/profile";
import Referral from "./Components/referral";


function App() {
 
  return (
    <>
      <Router >
        <Switch>
          <Route exact path="/">
            <Landingpage />
          </Route>
          <Route exact path="/create-account">
            <CreateAccount />
          </Route>
          <Route exact path="/clientDetails">
            <ClientDetails />
          </Route>
          <Route exact path="/pensionDetails">
            <PensionDetails />
          </Route>
          <Route exact path="/confirmPage">
            <ConfirmPage />
          </Route>
          <Route exact path="/userDashboard">
            <UserDashboard />
          </Route>
          <Route exact path="/dashboardNavbar">
            <DashboardNavBar />
          </Route>
          <Route exact path="/contributionPage">
            <ContributionPage />
          </Route>
          <Route exact path="/login">
            <LogIn />
          </Route>
          <Route exact path="/PensionDetailsLoggedin">
            <PensionDetailsLoggedIn />
          </Route>
          <Route exact path="/withdraw">
            <Withdraw/>
          </Route>
          <Route exact path="/pensionCalculator">
            <PensionCalculator/>
          </Route>
          <Route exact path="/Payment">
            <Payment />
          </Route>
          <Route exact path="/adminDashboard">
            <AdminDashboard />
          </Route>
         <Route exact path="/admin-create-account">
          <CreateAdminAccount />
         </Route>
         <Route exact path="/admin-login">
          <AdminLogIn />
         </Route>
         <Route exact path="/profile">
          <Profile />
         </Route>
         <Route exact path="/referral">
          <Referral />
         </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
