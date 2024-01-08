import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Navbar from "../NavBar";
import NavbarSignedIn from "../Navbar-SignedIn";
import "semantic-ui-css/semantic.min.css";
import $ from "jquery";
import Footer from "../footer/footer";
import GetInTouch from "../contact/GetInTouch";
import FAQs from "../Faqs/faqs";
import Hero from "./Hero";
import Reviews from "./Reviews";
import Info from "./info";


//hooks
import { useLoginStatus } from "../../Hooks/useLoginStatus";

//Localhost url for the server
const domain = "http://localhost:5000";

function Landingpage() {
  //Login status
  const [loginStatus, checkLogin] = useLoginStatus(domain);
  console.log(loginStatus);

  //Check Login status
  var NavBar;

  var getStartedBtn;

  var combineBtnLandingPage;

  var combineLink;
  var contributeLink;
  var calculatorLink;
  var personalPensionLink;
  var workPlaceLink;

  if (loginStatus === "true") {
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
    );
    getStartedBtn = (
      <Link to="/pensionDetails">
        <button>Get started</button>
      </Link>
    );

    combineBtnLandingPage = (
      <Link to="/pensionDetails">
        <button class="call-to-action">Combine with PensionPlus</button>
      </Link>
    );

    combineLink = <Link to="/userDashboard">Combine</Link>;
    contributeLink = <Link to="/userDashboard">contribute</Link>;
    calculatorLink = <Link to="/userDashboard">Pension Calcuator</Link>;
    personalPensionLink = (
      <Link class="arrow-button" to="/userDashboard">
        Personal saver<span class="arrow"></span>
      </Link>
    );

    workPlaceLink = (
      <Link class="arrow-button" to="/userDashboard">
        workplace<span class="arrow"></span>
      </Link>
    );
  } else {
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
    );
  }

  //Cookie usage alert

  return (
    <div onLoad={checkLogin} class="container-fluid">
      <div className="container">
        {NavBar}
        <Hero />
        <Info />
        <Reviews />
        <FAQs />
        <GetInTouch />
      </div>
      <Footer />
    </div>
  );
}

export default Landingpage;

//FadeInUp animation when section on sight
function checkElementLocation() {
  var $window = $(window);
  var bottom_of_window = $window.scrollTop() + $window.height();

  $(".contributionImg .img-fluid").each(function () {
    var $that = $(this);
    var bottom_of_object = $that.position().top + $that.outerHeight();

    //if element is in viewport, add the animate class
    if (bottom_of_window > bottom_of_object) {
      $(this).addClass("fadeInUp");
    }
  });
}
// if in viewport, show the animation
checkElementLocation();

$(window).on("scroll", function () {
  checkElementLocation();
});
