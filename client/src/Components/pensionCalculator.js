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

/*

#Pension calculator variables

Months to retirement = MTR
Total contributions = TC
Personal monthly contributions = PMC
Total combined pensions = TCP
Desired annual retirement income = DARI
Total retirement pot =TRP
Total Years pension will Last = YTL
Retirement age = rAge
Current age = cAge
One-off contribution = OC
Employer Contribution = EC
Total Employer Contributions =TEC

*/


function PensionCalculator() {
//Total pot amount
const [totalPotAmount, setTotalPotAmount] = useState("20000000");

//Age input == inputValue

const [inputValue, setInputValue] = useState();

let onChange = (event) => {
  const newValue = event.target.value;
  setInputValue(newValue);
};

//Retirement age == inputValue2

const [inputValue2, setInputValue2] = useState();

let onChange2 = (event) => {
  const newValue = event.target.value;
  setInputValue2(newValue);
};

//Total combined pensions
const [inputValue3, setInputValue3] = useState(0);

let onChange3 = (event) => {
  const newValue = event.target.value;
  setInputValue3(newValue);
};


//Personal monthly contribution
const [inputValue4, setInputValue4] = useState(0);

let onChange4 = (event) => {
  const newValue = event.target.value;
  setInputValue4(newValue);
};


//Personal one-off contribution
const [inputValue5, setInputValue5] = useState(0);

let onChange5 = (event) => {
  const newValue = event.target.value;
  setInputValue5(newValue);
};

//Retirement annual income
const [inputValue6, setInputValue6] = useState();

let onChange6 = (event) => {
  const newValue = event.target.value;
  setInputValue6(newValue);
};

//Employer contributions
const [inputValue7, setInputValue7] = useState(0);

let onChange7 = (event) => {
  const newValue = event.target.value;
  setInputValue7(newValue);
};


/*

######## Pension calculation logic

---Variable accronyms used are described on top.

*/

var cAge = inputValue;
var rAge = inputValue2;
var TCP = inputValue3;
var PMC = inputValue4;
var OC = inputValue5;
var DARI = inputValue6;
var EC = inputValue7;

//Convert input variables to int
var cAgeConvert = cAge*1;
var rAgeConvert = rAge*1;
var TCPConvert = TCP*1;
var PMCConvert = PMC*1;
var OCConvert = OC*1;
var DARIConvert = DARI*1;
var ECConvert = EC*1;

//TRP = Total retirement pot
var TRP;

var potDepletion;

//Calculation of the remaining months to retirement
const MTR = (rAgeConvert - cAgeConvert) * 12;

//Total employer contributions as of the retirement age
const TEC = ECConvert * MTR;

//Calculation of the total contributed amount as of the retirement age
const TC = PMCConvert * MTR;

//Calculation of the total amount one will have on their retirement age
TRP = (TC) + (TCPConvert) + (OCConvert) + (TEC);

//Calculation of the Number of years the retirement pot amount will last based on persons annual withdrawal
const YTL = TRP/DARIConvert;

//Time of pot depletion
potDepletion = parseInt(rAgeConvert + YTL);

console.log()

const [hiddenValue, setHiddenValue] = useState("true");

//Calculation function onClick calculate button
 const performCalculation  = () => {

    if((inputValue == null || inputValue =="") && (inputValue2 == null || inputValue2 =="") && (inputValue6== null || inputValue6 =="")){
        alert("Please input required fields!");
    }
    else if ((inputValue == null || inputValue == "") && (inputValue2 == null || inputValue2 == "")) {
      alert("Please input age!");
    }
    else if(inputValue6 =="" || inputValue6 == null){
        alert("Please input desired annual retirement income!")
    }
    else if(inputValue<18){
        alert("You must be 18 years and above!");
    }
    else if(inputValue2<55){
        alert("The minimum recommended retirement age is 55 years!");
    }
    else if(inputValue<18 && inputValue2 < 55){
        alert("You must be currently above 18 years and retire at atleast 55 years of age!");
    }
    else{
      
    }
  };

  
  var result;//Dynamic Result span element

  //Check if Values are not numbers and set NaN values to 0
  if(isNaN(TRP)==true){
    TRP = 0;
  }
  if(isNaN(potDepletion)==true){
    potDepletion = 0;
  }
  if(DARI == "" || DARI == null){
    DARI = 0;
  }


  if(potDepletion>120){
   result = (
        <span>You'll be on track to have <b>Ksh{TRP}</b> upon retirement. Taking <b>Ksh{DARI}</b> per year, will last you past <b>120 years of age</b></span>
    )
  }
  if(potDepletion<10){
    result = (
        <span>You will only have <b>Ksh{TRP}</b> upon retirement. Taking <b>Ksh{DARI}</b> per year, will last you until age <b>{potDepletion}</b></span>
    )
  }
 if(potDepletion>=10 && potDepletion<=120){
    result = (
        <span>You'll be on track to have <b>Ksh{TRP}</b> upon retirement. Taking <b>Ksh{DARI}</b> per year, will last you until age <b>{potDepletion}</b></span>
    )
  }

  if(potDepletion<1){
    result = (
        <span>Try setting a goal by filling the fields!</span>
    )
  }
  




  //Calculate button
  var calculate;

    calculate = (
        <button className="calculatebtn" onClick={performCalculation }>Calculate</button>
    );




 //Login status
 const [loginStatus, setLoginStatus] = useState("false");

 const checkLogin= () => {
   Axios.post("http://localhost:5000/auth", {
     
   }).then((response) => {
       console.log(response.status);
       if(response.data.message == 'Not authenticated'){
           
       }
       else{
         setLoginStatus("true")
       }
 
   });
 };

var NavBar;

if(loginStatus == "true"){
  NavBar = (
    <>
    <Router>
      <Switch>
        <Route exact path="/pensionCalculator">
          <NavbarSignedIn />
        </Route>
      </Switch>
    </Router>
  </>
  )

}
else{
  NavBar = (
    <>
      <Router>
        <Switch>
          <Route exact path="/pensionCalculator">
            <Navbar />
          </Route>
        </Switch>
      </Router>
    </>
  )
}

  return (
    <div onLoadCapture={checkLogin} className="container-fluid" id="calculatorContainer">
        <div className="container">
            {NavBar}
        </div>

        <div className="container-fluid" id="pensionCalculatorHeader">
            <div className="row">
                <div className="col-lg-2">

                </div>
                <div className="col-lg-8 fadeInUp">
                    <h1 className="text-center">Pension Calculator</h1>
                    <p className="text-center pCalculatorParagraph">Use our pension calculator to determine how much to contribute to your pension for an awesome retirement experience. Find out the potential duration of
                        your pension and how contributions may affect your savings. </p>
                </div>
                <div className="col-lg-2">
                    
                </div>
            </div>
        </div>
      <div className="container">        
        <form method="POST" action="handler.js" name="calculator" className="pensionCalculatorForm fadeInUp">
            <div className="row">
                <div className="col-lg-4">
                    <label for="cAge" className="inputLable">
                        <span><b><span className="requiredField">*</span>Current Age:</b></span><br/>
                        <input type="number" onChange={onChange} name="currentAge" className="inputbox pCalc" id="cAge" placeholder="Enter your age..." required />
                    </label>
                    <label for="rAge" className="inputLable">
                        <span><b><span className="requiredField">*</span>Retirement Age:</b></span><br/>
                        <input type="number" onChange={onChange2} name="retirementAge" className="inputbox pCalc" id="rAge" placeholder="Anticipated retirement age..." required />
                    </label>
                </div>
                <div className="col-lg-4">            
                    <label for="combinedPension" className="inputLable">
                        <span><b>Total Combined pensions if any:</b></span><br/>
                        <input type="number" onChange={onChange3} name="combinedPension" className="inputbox pCalc" id="combinedPension" placeholder="Current total combined pension..."/>
                    </label>
                    <label for="monthlyContributions" className="inputLable">
                        <span><b>Personal monthly contribution: </b></span><br/>
                        <input type="number" onChange={onChange4} name="monthlyContributions" className="inputbox pCalc" id="monthlyContributions" placeholder="Anticipated monthly contributions..."/>
                    </label>  
                    <label for="retirementIncome" className="inputLable">
                        <span><b><span className="requiredField">*</span>Desired annual retirement income:</b></span><br/>
                        <input type="number" onChange={onChange6} name="retirementIncome" className="inputbox pCalc" id="retirementIncome" placeholder="Desired retirement income..."/>
                    </label>  
                </div>
                <div className="col-lg-4">
                    <label for="oneOffContribution" className="inputLable">
                        <span><b>Personal One time contribution:</b></span><br/>
                        <input type="number" onChange={onChange5} name="oneOffContribution" className="inputbox pCalc" id="oneOffContribution" placeholder="One-off contribution..."/>
                    </label>
                    <label for="employerContributions" className="inputLable">
                        <span><b>Monthly Employer contributions:</b></span><br/>
                        <input type="number" onChange={onChange7} name="employerContributions" className="inputbox pCalc" id="employerContributions" placeholder="Employer contributions..." required />
                    </label>
                </div>
            </div>
        </form>
        <div className="row">
            <div className="col-lg-4">

            </div>
            <div className="col-lg-4">
                {calculate}
            </div>
            <div className="col-lg-4">
                
            </div>
        </div>
        <div className="row">
            <div className="col-lg-3">

            </div>
            <div className="col-lg-6">
                <div className="calculationResults">
                   <h3>Result:</h3>
                    <p id="result">{result}</p>
                </div>
            </div>
            <div className="col-lg-3">
                
            </div>
        </div>
      </div>
    </div>
  );
};

export default PensionCalculator;
