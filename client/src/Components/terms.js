import { HashRouter as Router, Route, Switch, Link } from "react-router-dom";
import NavbarSignedIn from "./Navbar-SignedIn";
import Navbar from "./NavBar";
import React from "react";
import "semantic-ui-css/semantic.min.css";
import { Icon } from "semantic-ui-react";
import { useState, useEffect } from "react";
import Axios from "axios";

const Terms = () => {
  //Login status
  const [loginStatus, setLoginStatus] = useState("false");

  const checkLogin = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    Axios.post("http://localhost:5000/auth", {}).then((response) => {
      if (response.data.message == "Not authenticated") {
        
      } else {
        setLoginStatus("true");
      }
    });
  };

  var NavBar;

  if (loginStatus == "true") {
    NavBar = (
      <>
        <Router>
          <Switch>
            <Route exact path="/Terms">
              <NavbarSignedIn />
            </Route>
          </Switch>
        </Router>
      </>
    );
  } else {
    NavBar = (
      <>
        <Router>
          <Switch>
            <Route exact path="/Terms">
              <Navbar />
            </Route>
          </Switch>
        </Router>
      </>
    );
  }


  return (
    <div onLoadCapture={checkLogin} className="container-fluid account-section">
        <div className="container">{NavBar}</div>
        <div className="row">
            <div className="term-heading">
                <h1 className="text-center">Terms And Condition</h1>
            </div>
            <div className="terms-text termsParagraphText">
                <h5 className="termsSalutation"> <i>Dear Madam/Sir,</i></h5>
                <h4 className="blueTermsHeading">SANLAM LIFE PERSONAL PENSION PLAN</h4>
                <p className="">


                    We refer to the above captioned subject and are pleased to enclose the Deed of Adherence for your safe custody.

                    Please peruse the document noting the terms and conditions of the contract and do not hesitate to get in touch with us for any further clarification should the need arise.

                    We wish to take this opportunity to sincerely thank you for entrusting us with your savings for your retirement. We want to assure you of our high standards of service and above average returns on investments within the industry.

                </p>
                <p><i>Yours faithfully</i></p>
                <p><b>Sanlam Pension</b></p>

                <h3 className="text-center h3TermsHeading">SANLAM PERSONAL PENSION PLAN (<i>Flexi Pension</i>)</h3>
                <h5 className="termsSalutation">DEED OF ADHERENCE</h5>
                <div>
                    <div className="deedTable">
                        <hr/>
                        <span><b>Member/Policy Number:</b></span>
                        <hr/>
                        <span><b>Address of contributor:</b></span>
                        <hr/>
                        <div className="table-responsive">
                            <table>
                                <tr>
                                    <td>Date Commencement</td>
                                    <td>Total Lump Sum Amount Received with Application:</td>
                                    <td>Proposed Contributions</td>
                                </tr>
                            </table>
                        </div>
                        <hr/>
                        <span><b>Mode of Payment: </b>EFT</span>
                        <hr/>
                        <span><b>How Payable (Select as appropriate): </b>N/A</span>
                        <hr/>
                        <div className="table-responsive">
                            <table>
                                <tr>
                                    <td>Date of Birth: </td>
                                    <td>Age Next Birthday:</td>
                                    <td>Retirement Age: </td>
                                    <td>ID/Passport</td>
                                </tr>
                            </table>
                        </div>
                        <hr/>
                    </div>
                </div>
                <p>
                In the event of my death before retirement, I declare and nominate the person(s)
                 hereunder as my beneficiary (ies) and should any of the said person(s) predecease me, 
                 then any of the surviving beneficiary (ies) shall be entitled to the proceeds immediately
                  upon my demise without probate: -
                </p>
                <div className="table-responsive">
                    <table>
                        <tr>
                            <td><b>Name</b></td>
                            <td><b>Relationships</b></td>
                            <td><b>Percentage - 100%</b></td>
                        </tr>
                    </table>
                </div>
                <h5 className="termsSalutation">SPECIAL CONDITIONS AND PROVISIONS</h5>
                <p>
                    I.	This Deed is supplemental to a Trust Deed (herein after referred to as “the Trust Deed” 
                        dated the 9th Day of July 2007 and made between the Sponsor and the Trustees establishing 
                        Sanlam Individual Pension Plan (herein after referred to as the “the Fund”) for providing 
                        benefits for individuals in accordance with the rules of the Fund
                </p>
                <p>
                II.	The Individual and the Trustee hereby covenant with each other to perform and  observe the 
                agreements and stipulations contained in the Trust Deed and Rules so far as the same are or ought 
                to be performed and observed by them respectively, so that no personal liability shall be attached
                 to any of them, except in respect to their individual acts, neglects or defaults in relation to
                  the trusteeship
                </p>
                <p>
                III.	This Deed of Adherence shall be terminated once the individual ceases to participate in the
                 Fund as provided in the Trust Deed and Rules 
                </p>
                <p>
                IV.	The scheme shall pay all reasonable and necessary charges and expenses incurred by the Trustee in connection with the administration of the Fund 
                </p>
                <p><b>Definitions</b></p>
                <p>In this agreement, the following expressions shall, unless the context otherwise requires, have the following meaning:</p>
                <p><b>“Insurance Company” </b>shall mean Sanlam Life Insurance Ltd whose principal office in Kenya is situated at Sanlam Tower, Waiyaki Way, Nairobi</p>
                <p><b>“Income Tax Act”  </b>This IPP shall be governed by the provisions of the Income Tax Act (Chapter 470 of the laws of Kenya) and any statutory modification or re-enactment thereof and any rules made from time to time thereafter </p>
                <h6 className="termsSalutation">“Fund” shall mean: -</h6>
            </div>
        </div>
    </div>
  );
};

export default Terms;
