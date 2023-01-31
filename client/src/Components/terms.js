import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import NavbarSignedIn from "./Navbar-SignedIn";
import Navbar from "./NavBar";
import React from "react";
import "semantic-ui-css/semantic.min.css";
import { Icon } from "semantic-ui-react";
import { useState, useEffect } from "react";
import Axios from "axios";

//Localhost url for the server
const domain = "http://localhost:5000"; 


const Terms = () => {
  //Login status
  const [loginStatus, setLoginStatus] = useState("false");

  const checkLogin = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    Axios.post(domain + "/auth", {}).then((response) => {
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
                <h4><b>1. Definitions</b></h4>
                <p>In this agreement, the following expressions shall, unless the context otherwise requires, have the following meaning:</p>
                <p><b>“Insurance Company” </b>shall mean Sanlam Life Insurance Ltd whose principal office in Kenya is situated at Sanlam Tower, Waiyaki Way, Nairobi</p>
                <p><b>“Income Tax Act”  </b>This IPP shall be governed by the provisions of the Income Tax Act (Chapter 470 of the laws of Kenya) and any statutory modification or re-enactment thereof and any rules made from time to time thereafter </p>
                <h6 className="termsSalutation">“Fund” shall mean: -</h6>
                <ol type="a">
                  <li>An employer allocation account to records the contributions made by the employer on behalf of the employee</li>
                  <li>An employee allocation account to record the contributions made by the employee </li>
                  <li>Interest from investments less</li>
                  <li>Withdrawals made in pursuant to item 3 of this policy, less</li>
                  <li>Scheme expenses </li>
                </ol>

                <h4><b>2.	Investment responsibility </b></h4>
                <p>The insurance company is responsible for investment of the “Fund” as defined above</p>

                <h4><b>3.	Vesting period</b></h4>
                <p>There is a vesting period that commences from the date of receipt of the fund, and it applies to transfers into a member’s contract from another administrator or member contributions as indicated as clause 10</p>

                <h4><b>4.	Payment out of the Fund </b></h4>
                <p>Partial withdrawal for contributing members is allowed up to a maximum of 30% of the fund in any given year. Provided that should the withdrawal amount exceed 30% of the fund at any time, such a withdrawal shall be
                   treated as a surrender and will be subjected to a surrender charge as stipulated under item 10 of this contract </p>
                <p>Payment out of the fund is only applicable if the fund is legally payable, if the fund is a deferred fund, therefore locked until early retirement age, then the fund is not payable until such a time or an event occurs
                   that RBA Act, the Regulations, the scheme Trust Deed & Rules and any other relevant Regulation allows</p>

                <h4><b>5.	Powers and Responsibilities of the Investment Manager</b></h4>
                <p>Subject to the limitations on investment placed by rule 5 of the above Trust Deed and the rest of this agreement, which may be modified from time to time, investments of the funds shall be made by the Insurance Company
                   in their absolute discretion. Provided that the investments are made in qualifying assets </p>
                <p>The Insurance Company shall at inception of this contract and at the end of the year, advise the client in writing of the interest credited to the IPP contract during the expiring year </p>

                <h4><b>6.	 Dealing and other Procedures </b></h4>
                <ol type="a">
                  <li>The Insurance Company shall ensure that all investments in the fund are made in accordance with the law</li>
                  <li>The Insurance Company shall be responsible for the safe custody of the investments and all articles and documents held in their connection </li>
                  <li>The Insurance Company shall be responsible for claiming all interest on the investments of the fund </li>
                </ol>

                <h4><b>7.	Warranty and Undertaking </b></h4>
                <p>The member undertakes that he/she shall not, during the continuance of this agreement create any encumbrance over the IPP and / or the Fund or any part of it or modification of such trusts without giving the Insurance
                   Company prior written notice </p>
                
                <h4><b>8.	Notice </b></h4>
                <p>All notices or other communication required or permitted to be given hereunder shall be in writing and shall be delivered or sent to the address given </p>

                <h4><b>9.	Termination Notice  </b></h4>
                <p>This agreement may be terminated by either party in writing to that effect to the other party</p>
                
                <h4><b>10.	Surrender Charge </b></h4>
                <p>The surrender charge, is a charge on an Individual pension contract because of immediate withdrawal after funds have been transferred to Sanlam Life or if the withdrawal is over 30% of the gross members fund in a given year from a contributory member

                The Surrender charge shall be a percentage of the accumulated fund value as per the following table:
                </p>

                <div className="table-responsive">
                    <table>
                        <tr>
                            <th><b>No of Years the contract has been in force</b></th>
                            <th><b>Surrender charge as a percentage of the accumulated fund</b></th>
                        </tr>
                        <tr>
                            <td>1 - 12 Months</td>
                            <td>2%</td>
                        </tr>
                        <tr>
                            <td>1 - 2 Years</td>
                            <td>1%</td>
                        </tr>
                        <tr>
                            <td>Over 2 Years</td>
                            <td>0%</td>
                        </tr>
                    </table>
                </div>

                <h4><b>11.	Contract  </b></h4>
                <p>The whole contracts include this agreement, and the application. A copy of the application is 
                  attached this agreement and made part of it. All modifications to this agreement shall be in writing
                   and signed by Sanlam Life Insurance Co Ltd or their authorized representative and policy holder </p>

                <h3>IN WITNESS WHEREOF this Deed has been signed by: -	</h3>
                <p>Signed and delivered: </p>
                <p>ACCEPTED FOR Sanlam Life Insurance Ltd</p>
                <p><b>And on Behalf of the Corporate Trustees</b></p>

                <p>Name: Sanlam Pension</p>
                <p>Signed: __________ </p>
                <p>Date: __________</p>
            </div>
        </div>
    </div>
  );
};

export default Terms;
