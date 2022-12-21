import { HashRouter as Router, Route, Switch, Link } from "react-router-dom";
import Navbar from "./NavBar";
import NavbarSignedIn from "./Navbar-SignedIn";
import "semantic-ui-css/semantic.min.css";
import { Icon } from "semantic-ui-react";
import Axios from "axios";
import { useEffect, useState } from "react";

//Images

import img1 from "../Assets/Hero-Section Phone (1).png";
import img2 from "../Assets/Bonus badge.png";
import img3 from "../Assets/Personal pension.png";
import img4 from "../Assets/Workplace pension.png";
import img5 from "../Assets/Contibution.png";
import img6 from "../Assets/Phone-app-screenshot.png";
import img7 from "../Assets/Pension Plan phones.png";
import img8 from "../Assets/Understand pension mobile screens.png";
import img9 from "../Assets/reviwer1.png";
import img10 from "../Assets/reviwer2.png";
import img11 from "../Assets/reviwer3.png";
import img12 from "../Assets/sanalm 1.png";

var screenWidth = window.screen.width;

var planSection;

if (screenWidth <= 900) {
  planSection = (
    <div className="row">
      <div className="col-lg-6">
        <img
          className="img-fluid img7"
          src={img7}
          alt="transfer-process-screenshot"
        />
      </div>
      <div className="col-lg-6">
        <h1 className="Explanation-heading">
          Choose from a variety of specialized pension plans.
        </h1>
        <p className="Explanation-p">
          From our selection of diversified funds, choose the investing strategy
          that's right for you, and then see your money grow in real time.
          <br />
          <br />
          To get the most out of your pension, set your savings objectives,
          change your strategies, and obtain automated tax relief. From
          climate-conscious investments to pension plans designed to safeguard
          your retirement income, we have it all.
          <br />
          <br />
          When you merge pensions with us, you can choose a plan or we'll invest
          your funds in a Tailored option which automatically shifts your money
          into safer investments as you age.
        </p>
        <button class="call-to-action">Explore our plans</button>
      </div>
    </div>
  );
} else {
  planSection = (
    <div className="row">
      <div className="col-lg-6">
        <h1 className="Explanation-heading">
          Choose from a variety of specialized pension plans.
        </h1>
        <p className="Explanation-p">
          From our selection of diversified funds, choose the investing strategy
          that's right for you, and then see your money grow in real time.
          <br />
          <br />
          To get the most out of your pension, set your savings objectives,
          change your strategies, and obtain automated tax relief. From
          climate-conscious investments to pension plans designed to safeguard
          your retirement income, we have it all.
          <br />
          <br />
          When you merge pensions with us, you can choose a plan or we'll invest
          your funds in a Tailored option which automatically shifts your money
          into safer investments as you age.
        </p>
        <button class="call-to-action">Explore our plans</button>
      </div>
      <div className="col-lg-6">
        <img
          className="img-fluid img7"
          src={img7}
          alt="transfer-process-screenshot"
        />
      </div>
    </div>
  );
}

function Landingpage() {
    //Login status
const [loginStatus, setLoginStatus] = useState("false");

const checkLogin= () => {
  Axios.post("http://localhost:5000/auth", {
    
  }).then((response) => {
    
      if(response.data.message == 'Not authenticated'){
        
      }
      else{
        setLoginStatus("true");
      }

  });
};

console.log(loginStatus);

//Check Login status
var NavBar;

var getStartedBtn;

var combineBtnLandingPage;

var combineLink;
var contributeLink;
var calculatorLink;
var personalPensionLink;
var contributionLink;

if(loginStatus == "true"){
  NavBar = (
    <>
    <Router>
      <Switch>
        <Route exact path="/">
          <NavbarSignedIn />
        </Route>
      </Switch>
    </Router>
  </>
  )
  getStartedBtn = (
  <Link to="/pensionDetails">
    <button>Get started</button>
  </Link>
  )

  combineBtnLandingPage = (<Link to="/pensionDetails">
  <button class="call-to-action">Combine with PensionPlus</button>
</Link>)

combineLink =<Link to="/userDashboard">Combine</Link>;
contributeLink =<Link to="/userDashboard">contribute</Link>;
calculatorLink =<Link to="/userDashboard">Pension Calcuator</Link>;
personalPensionLink =  (
  <Link class="arrow-button" to="/userDashboard">
  Personal saver<span class="arrow"></span>
  </Link>
);

contributionLink =  (
  <Link class="arrow-button" to="/userDashboard">
  Employer<span class="arrow"></span>
  </Link>
);

}
else{
  NavBar = (
    <>
      <Router>
        <Switch>
          <Route exact path="/">
            <Navbar />
          </Route>
        </Switch>
      </Router>
    </>
  )

  getStartedBtn = (
  <Link to="create-account">
  <button>Get started</button>
</Link>
)

combineBtnLandingPage = (<Link to="/create-account">
  <button class="call-to-action">Combine with PensionPlus</button>
</Link>);
combineLink =<Link to="/login">Combine</Link>;
contributeLink =<Link to="/login">contribute</Link>;
calculatorLink =<Link to="/login">Pension Calcuator</Link>;

personalPensionLink =  (
  <Link class="arrow-button" to="/login">
  Personal saver<span class="arrow"></span>
  </Link>
);

contributionLink =  (
  <Link class="arrow-button" to="/login">
  Employer<span class="arrow"></span>
  </Link>
);
}



  return (
    <div onLoad={checkLogin} class="container-fluid">
      <div className="container">
        {NavBar}
        <div className="container">
          <div className="row">
            <div className="col-lg-6 hero-section-wording">
              <h1 className="fadeInBottom">Enjoy your financial prospects</h1>
              <p className="fadeInLeft">
                Take charge of your retirement now with our award-winning
                pension. You can combine your pensions, increase your pool, and
                get ready to enjoy retirement. Combine, Contribute and withdraw
                online.
              </p>
              {getStartedBtn}
              <img className="bonusimg" src={img2} alt="offer image" />
            </div>
            <div className="col-lg-6 fadeInUp">
              <img
                className="img-fluid Hero-section-img1"
                src={img1}
                alt="Hero-section-img1"
              />
            </div>
          </div>
        </div>
        <div className="container pension-offerings">
          <div className="row">
            <div className="col-lg-4 fadeInUp">
              <div className="section2-icons">
                <img
                  className="image-fluid"
                  src={img3}
                  alt="Personalpension icon"
                />
              </div>
              <h3>Personal pension</h3>
              <p>
                With a few easy steps, you can combine previous pensions or
                begin saving on our online platform.
              </p>
              {personalPensionLink}
            </div>
            <div className="col-lg-4 fadeInUp">
              <div className="section2-icons">
                <img
                  className="image-fluid"
                  src={img5}
                  alt="Personalpension icon"
                />
              </div>
              <h3>Contribution at a click</h3>
              <p>
                Set up Direct debits or bank transfers in just a few taps, and
                use our retirement planner to keep your savings on track.
              </p>
              {contributionLink}
            </div>
            <div className="col-lg-4 fadeInUp">
              <div className="section2-icons">
                <img
                  className="image-fluid"
                  src={img4}
                  alt="Personalpension icon"
                />
              </div>
              <h3>Workplace pension</h3>
              <p>
                Our auto-enrolment pension will save you money and motivate your
                workforce. Try it now.
              </p>
              <Link class="arrow-button">
                Employer<span class="arrow"></span>
              </Link>
            </div>
          </div>
        </div>
        <hr className="separator" />
        <div className="container combine-section">
          <div className="row">
            <div className="col-lg-6">
              <img
                className="img-fluid img6"
                src={img6}
                alt="transfer-process-screenshot"
              />
            </div>
            <div className="col-lg-6 combine-section-2ndcol">
              <h1 className="Explanation-heading">Combine your pensions</h1>
              <p className="Explanation-p">
                With Pensionplus, you can easily combine your pensions.
                <br />
                <br /> All of your pensions will be combined by our amiable team
                of pension transfer specialists, giving you complete access to
                your money even if you are unaware of every aspect.
                <br />
                <br />
                Additionally, by combining all of your pensions, you may set
                objectives, change how you contribute, and finally get your
                finances back on track.
              </p>
             {combineBtnLandingPage}
            </div>
          </div>
        </div>
        <div className="container plan-section">{planSection}</div>
        <div className="container Learn-more-section">
          <div className="row">
            <div className="col-lg-6">
              <img
                className="img-fluid img7"
                src={img8}
                alt="transfer-process-screenshot"
              />
            </div>
            <div className="col-lg-6">
              <h1 className="Explanation-heading">Understand your pension</h1>
              <p className="Explanation-p">
                Understand how your pension works, keep up with it at all times,
                and manage everything with ease on our website.
                <br />
                <br />
                Find out exactly which firms you are invested in by exploring
                your fund. Then you can hold them accountable by casting your
                phone's vote during board meetings to decide on policies.
              </p>
              <button class="call-to-action">Learn more about pensions</button>
            </div>
          </div>
        </div>
        <hr className="separator" />
        <div className="container review-section">
          <h1 className="text-center">Reviews</h1>
          <div className="row">
            <div className="col-lg-4">
              <div className="review-card">
                <img
                  className="img-fluid reviewer"
                  src={img9}
                  alt="reviewer-1"
                />
                <p className="testimonial">
                  I came across Pensionplus online and was immediately impressed
                  by how it gives you flexibility. You possess a level of
                  consciousness and awareness that none of my previous pensions
                  has.
                </p>
                <p className="reviewer-title">
                  Monica Aysher, Real-Estate Manager
                </p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="review-card">
                <img
                  className="img-fluid reviewer"
                  src={img10}
                  alt="reviewer-2"
                />
                <p className="testimonial">
                  It's easy to believe that pensions don't matter while you're
                  young. However, the earlier you start, the simpler it is later
                  on because of compound interest.
                </p>
                <p className="reviewer-title">
                  Sam Bank-Ford, Blockchain analyst
                </p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="review-card">
                <img
                  className="img-fluid reviewer reviewer3"
                  src={img11}
                  alt="reviewer-3"
                />
                <p className="testimonial">
                  I am self-employed, Pensionplus makes it simple for me to save
                  for my retirement.
                </p>
                <p className="reviewer-title">
                  Eunice Helker, Digital sales consultant
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="FAQs-section">
          <h1 className="text-center">FAQs</h1>
          <a
            data-bs-toggle="collapse"
            href="#collapseExample"
            data-bs-target="#collapseExample"
            role="button"
            aria-expanded="false"
            aria-bs-controls="collapseExample"
          >
            <div className="question row d-flex">
              <div className="col">
                <p>Do I have to combine all my pension plans in Pensionplus?</p>
              </div>
              <div className="col d-flex justify-content-end">
                <Icon className="FAQ-arrow" name="chevron down" />
              </div>
            </div>
          </a>
          <div className="collapse" id="collapseExample">
            <p class="FAQs-p">
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum."
            </p>
          </div>
          <a
            data-bs-toggle="collapse"
            href="#collapseExample2"
            data-bs-target="#collapseExample2"
            role="button"
            aria-expanded="false"
            aria-bs-controls="collapseExample"
          >
            <div className="question row d-flex">
              <div className="col">
                <p>Who is eligible to be a Pensionplus customer?</p>
              </div>
              <div className="col d-flex justify-content-end">
                <Icon className="FAQ-arrow" name="chevron down" />
              </div>
            </div>
          </a>
          <div className="collapse" id="collapseExample2">
            <p class="FAQs-p">
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum."
            </p>
          </div>
          <a
            data-bs-toggle="collapse"
            href="#collapseExample3"
            data-bs-target="#collapseExample3"
            role="button"
            aria-expanded="false"
            aria-bs-controls="collapseExample"
          >
            <div className="question row d-flex">
              <div className="col">
                <p>Can my employer pay into my pension?</p>
              </div>
              <div className="col d-flex justify-content-end">
                <Icon className="FAQ-arrow" name="chevron down" />
              </div>
            </div>
          </a>
          <div className="collapse" id="collapseExample3">
            <p class="FAQs-p">
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum."
            </p>
          </div>
          <a
            data-bs-toggle="collapse"
            href="#collapseExample4"
            data-bs-target="#collapseExample4"
            role="button"
            aria-expanded="false"
            aria-bs-controls="collapseExample"
          >
            <div className="question row d-flex">
              <div className="col">
                <p>How much does it cost to use Pensionplus?</p>
              </div>
              <div className="col d-flex justify-content-end">
                <Icon className="FAQ-arrow" name="chevron down" />
              </div>
            </div>
          </a>
          <div className="collapse" id="collapseExample4">
            <p class="FAQs-p">
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum."
            </p>
          </div>
          <a
            data-bs-toggle="collapse"
            href="#collapseExample5"
            data-bs-target="#collapseExample5"
            role="button"
            aria-expanded="false"
            aria-bs-controls="collapseExample"
          >
            <div className="question row d-flex">
              <div className="col">
                <p>Why should I consolidate my pensions with Pensionplus?</p>
              </div>
              <div className="col d-flex justify-content-end">
                <Icon className="FAQ-arrow" name="chevron down" />
              </div>
            </div>
          </a>
          <div className="collapse" id="collapseExample5">
            <p class="FAQs-p">
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum."
            </p>
          </div>
          <a
            data-bs-toggle="collapse"
            href="#collapseExample6"
            data-bs-target="#collapseExample6"
            role="button"
            aria-expanded="false"
            aria-bs-controls="collapseExample"
          >
            <div className="question row d-flex">
              <div className="col">
                <p>What exactly does Pensionplus do?</p>
              </div>
              <div className="col d-flex justify-content-end">
                <Icon className="FAQ-arrow" name="chevron down" />
              </div>
            </div>
          </a>
          <div className="collapse" id="collapseExample6">
            <p class="FAQs-p">
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum."
            </p>
          </div>
          <a
            data-bs-toggle="collapse"
            href="#collapseExample7"
            data-bs-target="#collapseExample7"
            role="button"
            aria-expanded="false"
            aria-bs-controls="collapseExample"
          >
            <div className="question row d-flex">
              <div className="col">
                <p>Is there a minimum monthly contribution?</p>
              </div>
              <div className="col d-flex justify-content-end">
                <Icon className="FAQ-arrow" name="chevron down" />
              </div>
            </div>
          </a>
          <div className="collapse" id="collapseExample7">
            <p class="FAQs-p">
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum."
            </p>
          </div>
          <a
            data-bs-toggle="collapse"
            href="#collapseExample8"
            data-bs-target="#collapseExample8"
            role="button"
            aria-expanded="false"
            aria-bs-controls="collapseExample"
          >
            <div className="question row d-flex">
              <div className="col">
                <p>Can I transfer public service pension?</p>
              </div>
              <div className="col d-flex justify-content-end">
                <Icon className="FAQ-arrow" name="chevron down" />
              </div>
            </div>
          </a>
          <div className="collapse" id="collapseExample8">
            <p class="FAQs-p">
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum."
            </p>
          </div>
        </div>

        <div className="container contact-section">
          <h1 class="Contact-section-h1 text-center">
            <span>Get in touch</span>
          </h1>
          <div class="wrapper">
            <div class="company-info">
              <h2>Friendly and expert customer service</h2>
              <p>
                Pensions can be confusing. Our friendly team of experts will
                answer any question you have, and we promise no jargon.
                <br />
                <br />
                No waiting lines, no call centers. Just drop us a message, email
                us or give us a call any time.
              </p>

              <span className="contact-info">
                <Icon className="contact-icon" name="phone" />
                &nbsp; +254 (0)722 206 900
              </span>
              <br />
              <br />
              <a href="mailto:customerservice@sanlam.co.ke">
                <span className="contact-info">
                  <Icon className="contact-icon" name="mail" />
                  &nbsp;customerservice@sanlam.co.ke
                </span>
              </a>
              <br />
              <br />
              <a href="#">
                <span className="contact-info">
                  <Icon
                    className="contact-icon"
                    name="comment alternate outline"
                  />
                  &nbsp;Chat
                </span>
              </a>
              <br />
            </div>
            <div class="contact">
              <h3>Talk to us</h3>

              <form id="contact-form">
                <label>Name</label>
                <input type="text" name="name" id="name" required />

                <label>E-mail Address</label>
                <input type="email" name="email" id="email" required />

                <label>Message</label>
                <textarea name="message" rows="5" id="message"></textarea>

                <label></label>
                <button type="submit">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <footer class="footer-section">
        <div class="container">
          <div class="footer-cta pt-5 pb-5">
            <div class="row">
              <div class="col-xl-4 col-md-4 mb-30">
                <div class="single-cta">
                  <i class="fas fa-map-marker-alt"></i>
                  <div class="cta-text">
                    <h4>Find us</h4>
                    <br />
                    <span>
                      Sanlam Tower
                      <br /> off Waiyaki Way, Westlands
                    </span>
                  </div>
                </div>
              </div>
              <div class="col-xl-4 col-md-4 mb-30">
                <div class="single-cta">
                  <i class="fas fa-phone"></i>
                  <div class="cta-text">
                    <h4>Call us</h4>
                    <br />
                    <span>+254 (0)20278100</span>
                  </div>
                </div>
              </div>
              <div class="col-xl-4 col-md-4 mb-30">
                <div class="single-cta">
                  <i class="far fa-envelope-open"></i>
                  <div class="cta-text">
                    <h4>Mail us</h4>
                    <br />
                    <span>info@sanlam.co.ke</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="footer-content pt-5 pb-5">
            <div class="row">
              <div class="col-xl-6 col-lg-6 mb-50">
                <div class="footer-widget">
                  <div class="footer-logo">
                    <a href="index.html">
                      <img src={img12} class="img-fluid" alt="logo" />
                    </a>
                  </div>
                  <div class="footer-text">
                    <p>
                      {" "}
                      Sanlam Limited is the licensed controlling company of the
                      Sanlam Limited Insurance Group. Sanlam Life Insurance
                      Limited is an insurer licensed to conduct life insurance
                      business and is a licensed financial services provider and
                      a registered credit provider.
                    </p>
                  </div>
                  <div class="footer-social-icon">
                    <span>Follow us</span>
                    <a href="#">
                      <Icon className="media-icon" name="linkedin" />
                    </a>
                    <a href="#">
                      <Icon className="media-icon" name="facebook" />
                    </a>
                    <a href="#">
                      <Icon className="media-icon" name="twitter" />
                    </a>
                  </div>
                </div>
              </div>
              <div class="col-xl-6 col-lg-6 col-md-6 mb-30">
                <div class="footer-widget">
                  <div class="footer-widget-heading">
                    <h3>Useful Links</h3>
                  </div>
                  <ul>
                    <li>
                      <a href="#">Our pension</a>
                    </li>
                    <li>
                      {combineLink}
                    </li>
                    <li>
                      {contributeLink}
                    </li>
                    <li>
                      <a href="#" aria-disabled>Plans</a>
                    </li>
                    <li>
                      {calculatorLink}
                    </li>
                    <li>
                      <a href="#">Self-employed Saver</a>
                    </li>
                    <li>
                      <a href="#">Workplace Pension</a>
                    </li>
                    <li>
                      <a href="#">Terms and conditions</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="copyright-area">
          <div class="container">
            <div class="row">
              <div class="col-xl-6 col-lg-6 text-center text-lg-left">
                <div class="copyright-text">
                  <p>
                    Copyright &copy; 2018, All Right Reserved |{" "}
                    <a href="https://codepen.io/anupkumar92/">Sanlam Limited</a>
                  </p>
                </div>
              </div>
              <div class="col-xl-6 col-lg-6 d-none d-lg-block text-right">
                
              </div>
            </div>
          </div>
        </div>
      </footer>


    </div>
  );
};

export default Landingpage;
