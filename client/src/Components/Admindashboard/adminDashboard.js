import React, { useState, useRef } from "react";
import AdminDashboardNavBar from "./AdminDashboardnavbar";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
  PieChart,
  Pie,
  LabelList,
  Label,
} from "recharts";
import TableComponent from "./tableComponent";
import DashboardBtns from "./dashboardBtns";
import Axios from "axios";
import { HashRouter as Router, Route, Switch, Link } from "react-router-dom";

//Images
import img1 from "../../Assets/totalIcon.png";
import img2 from "../../Assets/whiteAddIcon.png";
import img3 from "../../Assets/whiteContributionIcon.png";
import img4 from "../../Assets/whiteWithdrawIcon.png";

function AdminDashboard() {
  //Queued transfers data
  const [queuedDataHeader, setQueuedDataHeaders] = useState([
    "Client Name",
    "Client Email",
    "Phone Number",
    "Client ID",
    "Employment status",
    "Employer name",
    "Organization email",
    "Pension Provider",
    "Current Employer",
    "Transfer Status",
    "Signature",
  ]);

  const [queuedData, setQueuedData] = useState([]);

  //Getting queued transfers
  const queuedTransfers = () => {
    Axios.post("http://localhost:5000/queuedTransfers", {}).then((response) => {
      if (response.data.message == "No pension transfers") {
      } else {
        setQueuedData(response.data);
      }
    });
  };

  //Login status
  const [loginStatus, setLoginStatus] = useState("false");

  const checkLogin = () => {
    Axios.post("http://localhost:5000/adminAuth", {}).then((response) => {
      if (response.data.message == "Not authenticated") {
        window.location.href = "/#/admin-login";
      } else {
        setLoginStatus("true");
      }
    });
  };

  //Fetching total cases(accounts) from backend(User account table)
  const [totalCases, setTotalCases] = useState(0);

  const tCases = () => {
    checkLogin();
    totalContributions();
    pendingTransfers();
    casePerformance();
    adName();
    queuedTransfers();
    contributionsTable();
    withdrawTable();
    fetchSuggestions();

    Axios.post("http://localhost:5000/totalCases", {}).then((response) => {
      let totalAccounts;

      for (var i = 0; i < response.data.length; i++) {
        totalAccounts = response.data[response.data.length - 1];
      }

      setTotalCases(totalAccounts.cases);
    });
  };

  //Get total pending pension transfers
  const [pendingPensions, setPendingTransfer] = useState(0);

  const pendingTransfers = () => {
    Axios.post("http://localhost:5000/totalPendingTransfers", {}).then(
      (response) => {
        if (response.data.message != "No Pending transfers") {
          setPendingTransfer(response.data[0].totalPendingTransfers);
        } else {
        }
      }
    );
  };

  //Get hour
  var date = new Date();
  var hour = date.getHours();
  var greetings;
  var dayWish;
  const [adminName, setAdminName] = useState();

  if (hour > 0 && hour < 12) {
    greetings = "Good morning";
    dayWish = "Have a great day";
  } else if (hour > 12 && hour < 4) {
    greetings = "Good afternoon";
    dayWish = "Have a great afternoon";
  } else {
    greetings = "Good evening";
    dayWish = "Have a wonderful evening ";
  }

  // Total cash in the company wallet
  const [totalCashAmount, setTotalCashAmount] = useState(0);

  //Get admin name from backend
  const adName = () => {
    Axios.post("http://localhost:5000/adminName", {}).then((response) => {
      if (response) {
        setAdminName(response.data);
      } else {
      }
    });
  };

const [data, setData] = useState([]);
const [Month, setMonth] = useState([]);

const getCases = () => {
    Axios.post("http://localhost:5000/getCases", {}).then(
      (response) => {
       
            var JanuaryCases = 0;
            var FebruaryCases = 0;
            var MarchCases = 0;
            var AprilCases = 0;
            var MayCases = 0;
            var JuneCases = 0;
            var JulyCases = 0;
            var AugustCases = 0;
            var SeptemberCases = 0;
            var OctoberCases = 0;
            var NovemberCases = 0;
            var DecemberCases = 0;
            let i;
            var year = [];
            var yearSort = [];


            console.log(response.data);
            setMonth(response.data);
           
            for(i = 0; i<response.data.length; i++){
                yearSort[i] = response.data[i].monthAndYear;
            }

            for(i = 0; i<response.data.length; i++){
                year[i] = response.data[i].monthAndYear;
            }

            console.log(year);

            let uniqueYears = yearSort.filter((element, index) => {
                return yearSort.indexOf(element) === index;
            });
            
            console.log(uniqueYears);

            //A for loop to Find total cases for each month
            for(i = 0; i < response.data.length; i++){

                if(response.data[i].month == "January"){
                    JanuaryCases = JanuaryCases +1;
                }
                else if(response.data[i].month == "February"){
                    FebruaryCases = FebruaryCases +1;
                }
                else if(response.data[i].month == "March"){
                    MarchCases = MarchCases + 1;
                }
                else if(response.data[i].month == "April"){
                    AprilCases = AprilCases + 1;
                }
                else if(response.data[i].month == "May"){
                    MayCases = MayCases + 1;
                }
                else if(response.data[i].month == "June"){
                    JuneCases = JuneCases + 1;
                }
                else if(response.data[i].month == "July"){
                    JulyCases = JulyCases + 1;
                }
                else if(response.data[i].month == "August"){
                    AugustCases = AugustCases + 1;
                }
                else if(response.data[i].month == "September"){
                    SeptemberCases = SeptemberCases + 1;
                }
                else if(response.data[i].month == "October"){
                    OctoberCases =OctoberCases + 1;
                }
                else if(response.data[i].month == "November"){
                    NovemberCases = NovemberCases + 1;
                }
                else if(response.data[i].month == "December"){
                    DecemberCases = DecemberCases + 1;
                }
            }

            var casesArray = [];//An array that store the a Month with its total cases.
            var totalMonthlyCases = [];//An array that stores the monthly totals

            

            //A for loop to match Month to a corresponding index and also populate the totalMonthlyCases array with monthly totals
            for(i = 0; i<12; i++){

                year= response.data[i].monthAndYear.slice(5, response.data[i].monthAndYear.length);
                var yearSort1 = yearSort[i].slice(5, response.data[i].monthAndYear.length);
                
                if(i == 0){
                    if(yearSort1 == "January"){
                        Month[i] = yearSort[i];
                    }
                    else{
                        Month[i] = "January";
                    }
                    totalMonthlyCases[i] = JanuaryCases;
                }
                else if(i == 1){
                    if(yearSort1 == "February"){
                        Month[i] = yearSort[i];
                    }
                    else{
                        Month[i] = "February";
                    }
                    totalMonthlyCases[i] = FebruaryCases;
                }
                else if(i == 2){
                    if(yearSort1 == "March"){
                        Month[i] = yearSort[i];
                    }
                    else{
                        Month[i] = "March";
                    }
                    totalMonthlyCases[i] = MarchCases;
                }
                else if(i == 3){
                    if(yearSort1 == "April"){
                        Month[i] = yearSort[i];
                    }
                    else{
                        Month[i] = "April";
                    }
                    totalMonthlyCases[i] = AprilCases;
                }
                else if(i == 4){
                    if(yearSort1 == "May"){
                        Month[i] = yearSort[i];
                    }
                    else{
                        Month[i] = "May";
                    }
                    totalMonthlyCases[i] = MayCases;
                }
                else if(i == 5){
                    if(yearSort1 == "June"){
                        Month[i] = yearSort[i];
                    }
                    else{
                        Month[i] = "June";
                    }
                    totalMonthlyCases[i] = JuneCases;
                }
                else if(i == 6){
                    if(yearSort1 == "July"){
                        Month[i] = yearSort[i];
                    }
                    else{
                        Month[i] = "July";
                    }
                    totalMonthlyCases[i] = JulyCases;
                }
                else if(i == 7){
                    if(yearSort1 == "August"){
                        Month[i] = yearSort[i];
                    }
                    else{
                        Month[i] = "August";
                    }
                    totalMonthlyCases[i] = AugustCases;
                }
                else if(i == 8){
                    if(yearSort1 == "September"){
                        Month[i] = yearSort[i];
                    }
                    else{
                        Month[i] = "September";
                    }
                    totalMonthlyCases[i] = SeptemberCases;
                }
                else if(i == 9){
                    if(yearSort1 == "October"){
                        Month[i] = yearSort[i];
                    }
                    else{
                        Month[i] = "October";
                    }
                    totalMonthlyCases[i] = OctoberCases;
                }
                else if(i == 10){
                    if(yearSort1 == "November"){
                        Month[i] = yearSort[i];
                    }
                    else{
                        Month[i] = "November";
                    }
                    totalMonthlyCases[i] = NovemberCases;
                }
                else if(i == 11){
                    if(yearSort1 == "December"){
                        Month[i] = yearSort[i];
                    }
                    else{
                        Month[i] = "December";
                    }
                    totalMonthlyCases[i] = DecemberCases;
                }  
            
            }

            let dateMonth = new Date();
            let currentMonth = dateMonth.getMonth();

            if(currentMonth == 0){
                casesArray = [            
                    {
                        month: Month[1],
                        "Cases": totalMonthlyCases[1]
                    },
                    {
                        month: Month[2],
                        "Cases": totalMonthlyCases[2]
                    },
                    {
                        month: Month[3],
                        "Cases": totalMonthlyCases[3]
                    },
                    {
                        month: Month[4],
                        "Cases": totalMonthlyCases[4]
                    },
                    {
                        month: Month[5],
                        "Cases": totalMonthlyCases[5]
                    },
                    {
                        month: Month[6],
                        "Cases": totalMonthlyCases[6]
                    },
                    {
                        month: Month[7],
                        "Cases": totalMonthlyCases[7]
                    },
                    {
                        month: Month[8],
                        "Cases": totalMonthlyCases[8]
                    },
                    {
                        month: Month[9],
                        "Cases": totalMonthlyCases[9]
                    },
                    {
                        month: Month[10],
                        "Cases": totalMonthlyCases[10]
                    },
                    {
                        month: Month[11],
                        "Cases": totalMonthlyCases[11]
                    },
                    {
                        month: Month[0],
                        "Cases": totalMonthlyCases[0]
                    }, 
                                   
                ]
            }
            else if(currentMonth == 1){
                casesArray = [  
                    
                    {
                        month: Month[2],
                        "Cases": totalMonthlyCases[2]
                    },
                    {
                        month: Month[3],
                        "Cases": totalMonthlyCases[3]
                    },
                    {
                        month: Month[4],
                        "Cases": totalMonthlyCases[4]
                    },
                    {
                        month: Month[5],
                        "Cases": totalMonthlyCases[5]
                    },
                    {
                        month: Month[6],
                        "Cases": totalMonthlyCases[6]
                    },
                    {
                        month: Month[7],
                        "Cases": totalMonthlyCases[7]
                    },
                    {
                        month: Month[8],
                        "Cases": totalMonthlyCases[8]
                    },
                    {
                        month: Month[9],
                        "Cases": totalMonthlyCases[9]
                    },
                    {
                        month: Month[10],
                        "Cases": totalMonthlyCases[10]
                    },
                    {
                        month: Month[11],
                        "Cases": totalMonthlyCases[11]
                    },
                    {
                        month: Month[0],
                        "Cases": totalMonthlyCases[0]
                    },            
                    {
                        month: Month[1],
                        "Cases": totalMonthlyCases[1]
                    },
                                   
                ]
            }
            else if(currentMonth == 2){
                casesArray = [  
                   
                    {
                        month: Month[3],
                        "Cases": totalMonthlyCases[3]
                    },
                    {
                        month: Month[4],
                        "Cases": totalMonthlyCases[4]
                    },
                    {
                        month: Month[5],
                        "Cases": totalMonthlyCases[5]
                    },
                    {
                        month: Month[6],
                        "Cases": totalMonthlyCases[6]
                    },
                    {
                        month: Month[7],
                        "Cases": totalMonthlyCases[7]
                    },
                    {
                        month: Month[8],
                        "Cases": totalMonthlyCases[8]
                    },
                    {
                        month: Month[9],
                        "Cases": totalMonthlyCases[9]
                    },
                    {
                        month: Month[10],
                        "Cases": totalMonthlyCases[10]
                    },
                    {
                        month: Month[11],
                        "Cases": totalMonthlyCases[11]
                    },
                    {
                        month: Month[0],
                        "Cases": totalMonthlyCases[0]
                    },            
                    {
                        month: Month[1],
                        "Cases": totalMonthlyCases[1]
                    },
                    {
                        month: Month[2],
                        "Cases": totalMonthlyCases[2]
                    },
                                   
                ]
            }
            else if(currentMonth == 3){
                casesArray = [  
                    
                    {
                        month: Month[4],
                        "Cases": totalMonthlyCases[4]
                    },
                    {
                        month: Month[5],
                        "Cases": totalMonthlyCases[5]
                    },
                    {
                        month: Month[6],
                        "Cases": totalMonthlyCases[6]
                    },
                    {
                        month: Month[7],
                        "Cases": totalMonthlyCases[7]
                    },
                    {
                        month: Month[8],
                        "Cases": totalMonthlyCases[8]
                    },
                    {
                        month: Month[9],
                        "Cases": totalMonthlyCases[9]
                    },
                    {
                        month: Month[10],
                        "Cases": totalMonthlyCases[10]
                    },
                    {
                        month: Month[11],
                        "Cases": totalMonthlyCases[11]
                    },
                    {
                        month: Month[0],
                        "Cases": totalMonthlyCases[0]
                    },            
                    {
                        month: Month[1],
                        "Cases": totalMonthlyCases[1]
                    },
                    {
                        month: Month[2],
                        "Cases": totalMonthlyCases[2]
                    },
                    {
                        month: Month[3],
                        "Cases": totalMonthlyCases[3]
                    },
                                   
                ]
            }
            else if(currentMonth == 4){
                casesArray = [  
                   
                    {
                        month: Month[5],
                        "Cases": totalMonthlyCases[5]
                    },
                    {
                        month: Month[6],
                        "Cases": totalMonthlyCases[6]
                    },
                    {
                        month: Month[7],
                        "Cases": totalMonthlyCases[7]
                    },
                    {
                        month: Month[8],
                        "Cases": totalMonthlyCases[8]
                    },
                    {
                        month: Month[9],
                        "Cases": totalMonthlyCases[9]
                    },
                    {
                        month: Month[10],
                        "Cases": totalMonthlyCases[10]
                    },
                    {
                        month: Month[11],
                        "Cases": totalMonthlyCases[11]
                    },
                    {
                        month: Month[0],
                        "Cases": totalMonthlyCases[0]
                    },            
                    {
                        month: Month[1],
                        "Cases": totalMonthlyCases[1]
                    },
                    {
                        month: Month[2],
                        "Cases": totalMonthlyCases[2]
                    },
                    {
                        month: Month[3],
                        "Cases": totalMonthlyCases[3]
                    },
                    {
                        month: Month[4],
                        "Cases": totalMonthlyCases[4]
                    },
                                   
                ]
            }
            else if(currentMonth == 5){
                casesArray = [  
                   
                    {
                        month: Month[6],
                        "Cases": totalMonthlyCases[6]
                    },
                    {
                        month: Month[7],
                        "Cases": totalMonthlyCases[7]
                    },
                    {
                        month: Month[8],
                        "Cases": totalMonthlyCases[8]
                    },
                    {
                        month: Month[9],
                        "Cases": totalMonthlyCases[9]
                    },
                    {
                        month: Month[10],
                        "Cases": totalMonthlyCases[10]
                    },
                    {
                        month: Month[11],
                        "Cases": totalMonthlyCases[11]
                    },
                    {
                        month: Month[0],
                        "Cases": totalMonthlyCases[0]
                    },            
                    {
                        month: Month[1],
                        "Cases": totalMonthlyCases[1]
                    },
                    {
                        month: Month[2],
                        "Cases": totalMonthlyCases[2]
                    },
                    {
                        month: Month[3],
                        "Cases": totalMonthlyCases[3]
                    },
                    {
                        month: Month[4],
                        "Cases": totalMonthlyCases[4]
                    },
                    {
                        month: Month[5],
                        "Cases": totalMonthlyCases[5]
                    },
                                   
                ]
            }
            else if(currentMonth == 6){
                casesArray = [  
                   
                    {
                        month: Month[7],
                        "Cases": totalMonthlyCases[7]
                    },
                    {
                        month: Month[8],
                        "Cases": totalMonthlyCases[8]
                    },
                    {
                        month: Month[9],
                        "Cases": totalMonthlyCases[9]
                    },
                    {
                        month: Month[10],
                        "Cases": totalMonthlyCases[10]
                    },
                    {
                        month: Month[11],
                        "Cases": totalMonthlyCases[11]
                    },
                    {
                        month: Month[0],
                        "Cases": totalMonthlyCases[0]
                    },            
                    {
                        month: Month[1],
                        "Cases": totalMonthlyCases[1]
                    },
                    {
                        month: Month[2],
                        "Cases": totalMonthlyCases[2]
                    },
                    {
                        month: Month[3],
                        "Cases": totalMonthlyCases[3]
                    },
                    {
                        month: Month[4],
                        "Cases": totalMonthlyCases[4]
                    },
                    {
                        month: Month[5],
                        "Cases": totalMonthlyCases[5]
                    },
                    {
                        month: Month[6],
                        "Cases": totalMonthlyCases[6]
                    },
                                   
                ]
            }
            else if(currentMonth == 7){
                casesArray = [ 
                    {
                        month: Month[8],
                        "Cases": totalMonthlyCases[8]
                    },
                    {
                        month: Month[9],
                        "Cases": totalMonthlyCases[9]
                    },
                    {
                        month: Month[10],
                        "Cases": totalMonthlyCases[10]
                    },
                    {
                        month: Month[11],
                        "Cases": totalMonthlyCases[11]
                    }, 
                    {
                        month: Month[0],
                        "Cases": totalMonthlyCases[0]
                    },            
                    {
                        month: Month[1],
                        "Cases": totalMonthlyCases[1]
                    },
                    {
                        month: Month[2],
                        "Cases": totalMonthlyCases[2]
                    },
                    {
                        month: Month[3],
                        "Cases": totalMonthlyCases[3]
                    },
                    {
                        month: Month[4],
                        "Cases": totalMonthlyCases[4]
                    },
                    {
                        month: Month[5],
                        "Cases": totalMonthlyCases[5]
                    },
                    {
                        month: Month[6],
                        "Cases": totalMonthlyCases[6]
                    },
                    {
                        month: Month[7],
                        "Cases": totalMonthlyCases[7]
                    },
                   
                                   
                ]
            }
            else if(currentMonth == 8){
                casesArray = [  
                    
                    {
                        month: Month[9],
                        "Cases": totalMonthlyCases[9]
                    },
                    {
                        month: Month[10],
                        "Cases": totalMonthlyCases[10]
                    },
                    {
                        month: Month[11],
                        "Cases": totalMonthlyCases[11]
                    },
                    {
                        month: Month[0],
                        "Cases": totalMonthlyCases[0]
                    },            
                    {
                        month: Month[1],
                        "Cases": totalMonthlyCases[1]
                    },
                    {
                        month: Month[2],
                        "Cases": totalMonthlyCases[2]
                    },
                    {
                        month: Month[3],
                        "Cases": totalMonthlyCases[3]
                    },
                    {
                        month: Month[4],
                        "Cases": totalMonthlyCases[4]
                    },
                    {
                        month: Month[5],
                        "Cases": totalMonthlyCases[5]
                    },
                    {
                        month: Month[6],
                        "Cases": totalMonthlyCases[6]
                    },
                    {
                        month: Month[7],
                        "Cases": totalMonthlyCases[7]
                    },
                    {
                        month: Month[8],
                        "Cases": totalMonthlyCases[8]
                    },
                                                     
                ]
            }
            else if(currentMonth == 9){
                casesArray = [ 
                    
                    {
                        month: Month[10],
                        "Cases": totalMonthlyCases[10]
                    },
                    {
                        month: Month[11],
                        "Cases": totalMonthlyCases[11]
                    }, 
                    {
                        month: Month[0],
                        "Cases": totalMonthlyCases[0]
                    },            
                    {
                        month: Month[1],
                        "Cases": totalMonthlyCases[1]
                    },
                    {
                        month: Month[2],
                        "Cases": totalMonthlyCases[2]
                    },
                    {
                        month: Month[3],
                        "Cases": totalMonthlyCases[3]
                    },
                    {
                        month: Month[4],
                        "Cases": totalMonthlyCases[4]
                    },
                    {
                        month: Month[5],
                        "Cases": totalMonthlyCases[5]
                    },
                    {
                        month: Month[6],
                        "Cases": totalMonthlyCases[6]
                    },
                    {
                        month: Month[7],
                        "Cases": totalMonthlyCases[7]
                    },
                    {
                        month: Month[8],
                        "Cases": totalMonthlyCases[8]
                    },
                    {
                        month: Month[9],
                        "Cases": totalMonthlyCases[9]
                    },
                    
                                                      
                ]
            }
            else if(currentMonth == 10){
                casesArray = [
                    
                    {
                        month: Month[11],
                        "Cases": totalMonthlyCases[11]
                    },  
                    {
                        month: Month[0],
                        "Cases": totalMonthlyCases[0]
                    },            
                    {
                        month: Month[1],
                        "Cases": totalMonthlyCases[1]
                    },
                    {
                        month: Month[2],
                        "Cases": totalMonthlyCases[2]
                    },
                    {
                        month: Month[3],
                        "Cases": totalMonthlyCases[3]
                    },
                    {
                        month: Month[4],
                        "Cases": totalMonthlyCases[4]
                    },
                    {
                        month: Month[5],
                        "Cases": totalMonthlyCases[5]
                    },
                    {
                        month: Month[6],
                        "Cases": totalMonthlyCases[6]
                    },
                    {
                        month: Month[7],
                        "Cases": totalMonthlyCases[7]
                    },
                    {
                        month: Month[8],
                        "Cases": totalMonthlyCases[8]
                    },
                    {
                        month: Month[9],
                        "Cases": totalMonthlyCases[9]
                    },
                    {
                        month: Month[10],
                        "Cases": totalMonthlyCases[10]
                    },
                                                      
                ]
            }
            else{
                casesArray = [ 
                   
                    {
                        month: Month[0],
                        "Cases": totalMonthlyCases[0]
                    },            
                    {
                        month: Month[1],
                        "Cases": totalMonthlyCases[1]
                    },
                    {
                        month: Month[2],
                        "Cases": totalMonthlyCases[2]
                    },
                    {
                        month: Month[3],
                        "Cases": totalMonthlyCases[3]
                    },
                    {
                        month: Month[4],
                        "Cases": totalMonthlyCases[4]
                    },
                    {
                        month: Month[5],
                        "Cases": totalMonthlyCases[5]
                    },
                    {
                        month: Month[6],
                        "Cases": totalMonthlyCases[6]
                    },
                    {
                        month: Month[7],
                        "Cases": totalMonthlyCases[7]
                    },
                    {
                        month: Month[8],
                        "Cases": totalMonthlyCases[8]
                    },
                    {
                        month: Month[9],
                        "Cases": totalMonthlyCases[9]
                    },
                    {
                        month: Month[10],
                        "Cases": totalMonthlyCases[10]
                    },
                    {
                        month: Month[11],
                        "Cases": totalMonthlyCases[11]
                    }, 
                                                       
                ]
            }



           
           
             
            console.log(casesArray);   

            setData(casesArray);
        }
             
    );
  };

  setInterval(getCases(), 3000);

  //Total cases calculate by finding the aggregate of total monthly cases

  const casePerformance = () => {
    Axios.post("http://localhost:5000/casePerformance", {}).then((response) => {

      if (response) {
      } else {
        console.log("No amount combined or contributed!");
      }
    });
  };

  var screenWidth = window.screen.width;
  var casegraphWidth;
  var casegraphHeight;

  casegraphWidth = 550;

  if (screenWidth < 540 && screenWidth > 343) {
    casegraphWidth = 400;
    casegraphHeight = 350;
  } else if (screenWidth < 342) {
    casegraphWidth = 300;
    casegraphHeight = 250;
  } else {
    casegraphWidth = 550;
    casegraphHeight = 450;
  }

  const [portfolioData, setportfolioData] = useState([
    {
      name: "Feb",
      value: 50,
      fill: "#db4e7b",
    },
    {
      name: "Jan",
      value: 20,
      fill: "#c51ff2",
    },
    {
      name: "Dec",
      value: 4,
      fill: "#c3d874",
    },
    {
      name: "Nov",
      value: 40,
      fill: "#0075C9",
    },
    {
      name: "Oct",
      value: 28,
      fill: "#00C975",
    },
    {
      name: "Sep",
      value: 55,
      fill: "#8884d8",
    },
    {
      name: "Aug",
      value: 34,
      fill: "#7c6104",
    },
    {
      name: "Jul",
      value: 45,
      fill: "#518f9e",
    },
    {
      name: "Jun",
      value: 50,
      fill: "#ac9bfd",
    },
    {
      name: "May",
      value: 67,
      fill: "#7e7f93",
    },
    {
      name: "Apr",
      value: 20,
      fill: "#93018a",
    },
    {
      name: "Mar",
      value: 12,
      fill: "#5459a4",
    },
  ]);

  const [recentContribDataHeader, setRecentContribDataHeader] = useState([
    "Client Name",
    "Client ID",
    "Amount",
    "Phone Number",
  ]);

  const [recentContibutions, setrecentContibutions] = useState([]);

  //Getting queued transfers
  const contributionsTable = () => {
    Axios.post("http://localhost:5000/contributionsTable", {}).then(
      (response) => {
        if (response.data.message == "No contributions") {
        } else {
          setrecentContibutions(response.data);
        }
      }
    );
  };

  const [recentWithdrawalsDataHeader, setRecentWithdrawalsDataHeader] =
    useState([
      "Client Name",
      "Client ID",
      "Amount",
      "Phone Number",
      "Contibutions balance",
    ]);

  const [contribBalance, setContribBalance] = useState([
    {
      client_name: "",
      client_id: "",
      amount: "",
      phone_no: "",
      no_of_contrib: "",
    },
  ]);

  //Getting recent withdrawals

  const withdrawTable = () => {
    Axios.post("http://localhost:5000/withdrawTable", {}).then((response) => {
      if (response.data.message == "No withdrawals") {
        setContribBalance(response.data);
      } else {
      }
    });
  };

  //Status Slider
  const [status, setStatus] = useState(50);

  let checkStatus = (event) => {
    const newValue = event.target.value;
    setStatus(newValue);
  };

  //Pension amount
  const [pensionAmount, setPensionAmount] = useState(0);

  const checkAmount = (event) => {
    const newValue = event.target.value;
    setPensionAmount(newValue);
  };

  //Client Id
  const [clientId, setClientId] = useState(0);

  const checkId = (event) => {
    const newValue = event.target.value;
    setClientId(newValue);
  };

  //Pension Provider
  const [pensionProvider, setPensionProvider] = useState("");

  const checkProvider = (event) => {
    const newValue = event.target.value;
    setPensionProvider(newValue);
  };

  //Send Transfer update status to backend

  const statusUpdate = () => {
    Axios.post("http://localhost:5000/statusUpdate", {
      clientId: clientId,
      pensionAmount: pensionAmount,
      status: status,
      pensionProvider: pensionProvider,
    }).then((response) => {
      console.log(response.data);
    });
  };

  const checkData = () => {
    if (
      (clientId == "" || clientId == null) &&
      (pensionProvider == "" || pensionProvider == null)
    ) {
      alert("Please input Client Id and the pension provider to update!");
    } else if (clientId == "" || clientId == null) {
      alert("Please input Client Id!");
    } else if (pensionProvider == "" || pensionProvider == null) {
      alert("Please input the Pension provider!");
    } else {
      statusUpdate();
    }
  };

  //Searchbar

  // value of the search input field and a list of suggestions.
  const [searchValue, setSearchValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  //a function to handle the change event of the search input field and update the search value in the state.
  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
    setShow(true);
  };

  //Getting the id number from the selected string

  var strPos = searchValue.search(/Number/i);

  var idStart = strPos + 8;

  var idEnd = searchValue.length - 1;

  var cId = searchValue.slice(idStart, idEnd);

  var idNumber = parseInt(cId);

  //User profile details
  const [clientName, setClientName] = useState("");

  const [clientEmail, setClientEmail] = useState("");

  const [clientCreate, setClientCreate] = useState("");

  //Date formating
  const [clientDOB, setClientDOB] = useState("DOB");

  const [clientDob, setClientDob] = useState("");

  const [clientEmploymentStatus, setClientEmploymentStatus] = useState("");

  const [clientIdNumber, setClientIdNumber] = useState("");

  const [clientPhone, setClientPhone] = useState("");

  //Get total combined amount from backend

  const [totalCombinedAmount, setTotalCombinedAmount] = useState(0);

  const totalCombined = () => {
    totalContributions();
    Axios.post("http://localhost:5000/clientProfileTotalCombined", {
      idNumber: idNumber,
    }).then((response) => {
      if (response) {
        setTotalCombinedAmount(response.data[0].totalCombined);
      } else {
        setTotalCombinedAmount(response.data[0].totalCombined);
      }
    });
  };

  //Get total contributed amount from backend
  const [contributedAmount, setContributedAmount] = useState(0);

  const totalContributions = () => {
    Axios.post("http://localhost:5000/clientProfileTotalContributions", {
      idNumber: idNumber,
    }).then((response) => {
      if (response) {
        setContributedAmount(response.data[0].totalContributed);
      } else {
        setContributedAmount(response.data[0].totalContributed);
      }
    });
  };

  //Total Pot amount
  const totalPotAmount = contributedAmount + totalCombinedAmount;

  //Combined and Contributions percentages

  let combinedPercentage = (totalCombinedAmount * 100) / totalPotAmount;
  let contributionPercentage = (contributedAmount * 100) / totalPotAmount;

  //Sending user pension details to the backend
  const search = () => {
    totalCombined();

    Axios.post("http://localhost:5000/searchDetails", {
      idNumber: idNumber,
    }).then((response) => {
      setClientName(response.data[0].name);
      setClientEmail(response.data[0].email);
      setClientPhone(response.data[0].phone);
      setClientIdNumber(response.data[0].id_no);
      setClientDOB(response.data[0].dob);
      setClientCreate(response.data[0].create_time);
      setClientEmploymentStatus(response.data[0].employment_status);

      var strPos2 = clientDOB.slice(0, 10);
      setClientDob(strPos2);

      var strPos3 = clientCreate.slice(0, 10);
      setClientCreate(strPos3);
    });
  };

  // Make the HTTP request to fetch the suggestions
  // Update the suggestions in the state

  const fetchSuggestions = () => {
    Axios.post("http://localhost:5000/getClient", {}).then((response) => {
      if (response.data.message == "No client") {
      } else {
        let searchName = [];
        let searchId = [];

        for (var i = 0; i < response.data.length; i++) {
          searchName[i] = response.data[i].name;
          if (response.data[i].id_no == null) {
            response.data[i].id_no = 0;
          }

          searchId[i] = response.data[i].id_no;
        }

        var stringId = [];

        for (var i = 0; i < response.data.length; i++) {
          stringId[i] = response.data[i].id_no.toString();
        }

        let userCredentials = [];

        for (var i = 0; i < response.data.length; i++) {
          userCredentials[i] =
            searchName[i] + " " + "(" + "ID Number: " + stringId[i] + ")";
        }

        setSuggestions(userCredentials);
      }
    });
  };

  const [show, setShow] = React.useState(false);

  const ItemList = (() => {
    if (!show) return [];
    return suggestions
      .filter((v) => v.toLowerCase().includes(searchValue.toLowerCase()))
      .map((v) => (
        <button
          onClick={() => {
            setSearchValue(() => v);
            setShow(false);
          }}
          key={v}
        >
          {v}
        </button>
      ));
  })();

  //Hide hideSearchList function
  const hideSearchList = () => {
    setShow(false);
  };

  return (
    <>
      <div onLoad={tCases} className="container-fluid Dashboard">
        <div className="container">
          <AdminDashboardNavBar />
        </div>
        <div className="row" onLoad={getCases}>
          <div className="col-lg-4">
            <div className="dashboardBlueDiv fadeInLeft">
              <h1>Dashboard</h1>
            </div>
          </div>
          <div class="col-lg-2">
            <div className="dWrapper">
              <div className="dashboardCard fadeInUp">
                <div className="totalPot d-flex">
                  <span className="d-flex gap-3">
                    <div className="totalIcon">
                      <img src={img1} alt="total Icon" />
                    </div>
                    <div className="align-middle">
                      <p className="">
                        Total Cases:
                        <br />
                        <br />{" "}
                        <p className="totalPotAmount">
                          <b>{totalCases}</b>
                        </p>
                      </p>
                    </div>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="dWrapper">
              <div className="dashboardCard fadeInUp">
                <div className="totalPot d-flex">
                  <span className="d-flex gap-3">
                    <div className="totalIcon"></div>
                    <div className="align-middle">
                      <p className="">
                        Pending pensions:
                        <br />
                        <br />{" "}
                        <p className="totalPotAmount">
                          <b>{pendingPensions}</b>
                        </p>
                      </p>
                    </div>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="d-flex justify-content-center">
              <div className="applausCard fadeInRight">
                <h4>
                  {greetings},<br />
                  <span className="adminName">{adminName}</span>
                </h4>
                <p>{dayWish}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="container dashboardButtonContainer fadeInUp">
          <div className="row" onClick={hideSearchList}>
            <div className="col-lg-4">
              <Link>
                <div className="d-flex justify-content-center">
                  <button className="dashboardButton ">
                    <div className="buttonIcon">
                      <img
                        className="img-fluid bIcon"
                        src={img2}
                        alt="total Icon"
                      />
                    </div>
                    <br />
                    <span className="btnText">Pending Transfers</span>
                  </button>
                </div>
              </Link>
            </div>
            <div className="col-lg-4">
              <Link>
                <div className="d-flex justify-content-center">
                  <button className="dashboardButton ">
                    <div className="buttonIcon">
                      <img
                        className="img-fluid bIcon"
                        src={img3}
                        alt="total Icon"
                      />
                    </div>
                    <br />
                    <span className="btnText">Recent Contributions</span>
                  </button>
                </div>
              </Link>
            </div>
            <div className="col-lg-4">
              <Link>
                <div className="d-flex justify-content-center">
                  <button className="dashboardButton ">
                    <div className="buttonIcon">
                      <img
                        className="img-fluid bIcon"
                        src={img4}
                        alt="total Icon"
                      />
                    </div>
                    <br />
                    <span className="btnText">Recent Withdrawals</span>
                  </button>
                </div>
              </Link>
            </div>
          </div>
          <div className="row searchBarSection" onClick={hideSearchList}>
            <h3 className="text-center">Search for Client</h3>
            <div className="col-lg-3"></div>
            <div className="col-lg-6 d-flex justify-content-center">
              <div className="input-group mt-5 ">
                <input
                  type="search"
                  value={searchValue}
                  onChange={handleSearchChange}
                  className="form-control rounded"
                  id="searchForm"
                  placeholder="Search"
                  aria-label="Search"
                  aria-describedby="search-addon"
                />
                <div className="list">{ItemList}</div>
              </div>
              <button
                data-bs-toggle="collapse"
                href="#profile"
                data-bs-target="#profile"
                role="button"
                aria-expanded="false"
                aria-bs-controls="profile"
                className="call-to-action-admin"
                onMouseDown={search()}
              >
                View Profile
              </button>
            </div>
            <div className="col-lg-3"></div>
          </div>
          <div className="row">
            <div className="col-lg-2"></div>

            <div className="col-lg-8">
              <div className="card clientProfileCard collapse" id="profile">
                <h3 className="text-center">Client Profile</h3>
                <hr className="pensionTransferDivider" />
                <div className="row">
                  <div className="col-lg-6">
                    <span>
                      <b>Name: &nbsp;</b>
                      {clientName}
                    </span>
                  </div>
                  <div className="col-lg-6">
                    <span>
                      <b>Email: &nbsp;</b>
                      {clientEmail}
                    </span>
                  </div>
                </div>
                <br />
                <div className="row">
                  <div className="col-lg-6">
                    <span>
                      <b>Phone: &nbsp;</b>
                      {clientPhone}
                    </span>
                  </div>
                  <div className="col-lg-6">
                    <span>
                      <b>Id number: &nbsp;</b>
                      {clientIdNumber}
                    </span>
                  </div>
                </div>
                <br />
                <div className="row">
                  <div className="col-lg-6">
                    <span>
                      <b>DOB: &nbsp;</b>
                      {clientDob}
                    </span>
                  </div>
                  <div className="col-lg-6">
                    <span>
                      <b>Employment status: &nbsp;</b>
                      {clientEmploymentStatus}
                    </span>
                  </div>
                </div>
                <br />
                <div className="row">
                  <div className="col-lg-6">
                    <span>
                      <b>Onboarding Date: &nbsp;</b>
                      {clientCreate}
                    </span>
                  </div>
                  <div className="col-lg-6">
                    <span>
                      <b>Total Pot amount: &nbsp;</b>Ksh{totalPotAmount}
                    </span>
                  </div>
                </div>
                <br />
                <div className="row">
                  <div className="col-lg-6">
                    <span>
                      <b>Total Combined amount: &nbsp;</b>Ksh
                      {totalCombinedAmount}&nbsp;({combinedPercentage}%)
                    </span>
                  </div>
                  <div className="col-lg-6">
                    <span>
                      <b>Total contributed amount: &nbsp;</b>Ksh
                      {contributedAmount}&nbsp;({contributionPercentage}%)
                    </span>
                  </div>
                </div>
                <button className="call-to-action-deleteBTN">
                  Delete client Profile
                </button>
              </div>
            </div>

            <div className="col-lg-2"></div>
          </div>
        </div>
      </div>
      {/* graph part */}
      <div className="container-fluid adminGraph" onClick={hideSearchList}>
        <div className="container">
          <div className="row my-auto">
            <div className="col-lg-7 my-auto">
              <div className="dashboardCard" id="caseChart">
                <span className="tableHeading">Case Count</span>

                <LineChart
                  className="casegraph"
                  width={casegraphWidth}
                  height={casegraphHeight}
                  data={data}
                  margin={{
                    top: 10,
                    right: 60,
                    left: 40,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="Cases"
                    stroke="#FFC928"
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </div>
            </div>

            <div className="col-lg-5">
              <div className="col-12">
                <div className="dashboardCard text-sm" id="portfolioChart">
                  <PieChart className="mx-auto" width={400} height={220}>
                    <Pie
                      data={portfolioData}
                      cx={175}
                      cy={100}
                      innerRadius={30}
                      outerRadius={80}
                      dataKey="value"
                      nameKey="name"
                      isAnimationActive={true}
                    >
                      <LabelList
                        dataKey="name"
                        position="outside"
                        fill="#000"
                        stroke="#000"
                        style={{
                          "font-size": "small",
                          "font-weight": "lighter",
                        }}
                      />
                    </Pie>
                  </PieChart>
                  <br />
                  <p className="text-center">
                    Total Contributed Amount: &nbsp;<b> Ksh{totalPotAmount}</b>
                  </p>
                  <PieChart className="mx-auto" width={400} height={220}>
                    <Pie
                      data={portfolioData}
                      cx={175}
                      cy={100}
                      innerRadius={30}
                      outerRadius={80}
                      dataKey="value"
                      nameKey="name"
                      isAnimationActive={true}
                    >
                      <LabelList
                        dataKey="name"
                        position="outside"
                        fill="#000"
                        stroke="#000"
                        style={{
                          "font-size": "small",
                          "font-weight": "lighter",
                        }}
                      />
                    </Pie>
                  </PieChart>
                  <p className="text-center">
                    Total Combined Amount: &nbsp;<b> Ksh{totalCashAmount}</b>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <TableComponent
              id="pendingTransfersTable"
              name="Pending Pension Transfers"
              tableHeaders={queuedDataHeader}
              data={queuedData}
            />
            <button
              data-bs-toggle="collapse"
              href="#collapseExample"
              data-bs-target="#collapseExample"
              role="button"
              aria-expanded="false"
              aria-bs-controls="collapseExample"
              className="call-to-action-admin"
            >
              {" "}
              Update status
            </button>
            <div className="updateContainer row  collapse" id="collapseExample">
              <div className="col-lg-3"></div>
              <div className="col-lg-6">
                <h3 className="text-center">
                  Update the transfer status and amount to be transferred for a
                  particular client.
                </h3>
                <div className="account-Form d-flex justify-content-center">
                  <div className="updateForm">
                    <label for="idNo">
                      <span className="requiredField">*</span>
                      <span>Client ID number</span>
                      <br />
                      <br />
                      <input
                        type="number"
                        onChange={checkId}
                        onPaste={checkId}
                        name="ID"
                        className="inputbox"
                        id="id_No"
                        placeholder="ID number"
                        required
                      />
                    </label>
                    <label for="provider">
                      <span className="requiredField">*</span>
                      <span>Pension Provider</span>
                      <br />
                      <br />
                      <input
                        type="text"
                        onChange={checkProvider}
                        onPaste={checkProvider}
                        className="inputbox"
                        id="provider"
                        placeholder="Pension provider name"
                        required
                      />
                    </label>
                    <label for="status" className="statusLabel">
                      <span>
                        Transfer Status
                        <span className="optional-field-text">(1% - 100%)</span>
                      </span>
                      <br />
                      <br />
                      <div className="statusBubble d-flex justify-content-center">
                        <div className="bubble">{status}%</div>
                      </div>
                      <input
                        type="range"
                        min={"1"}
                        max={"100"}
                        className="inputbox"
                        id="status"
                        list="tickmarks"
                        onChange={checkStatus}
                      />
                      <datalist id="tickmarks">
                        <option value="0" label="0%"></option>
                        <option value="25" label="25%"></option>
                        <option value="50" label="50%"></option>
                        <option value="75" label="75%"></option>
                        <option value="100" label="100%"></option>
                      </datalist>
                    </label>
                    <label for="amount">
                      <span>
                        Amount to be transferred
                        <span className="optional-field-text">
                          (Optional until status is updated to 100%)
                        </span>
                      </span>
                      <br />
                      <br />
                      <input
                        type="number"
                        onChange={checkAmount}
                        className="inputbox"
                        id="amount"
                        onPaste={checkAmount}
                        placeholder="Amount to be transferred"
                      />
                    </label>
                    <button
                      onClick={checkData}
                      data-bs-toggle="collapse"
                      href="#collapseExample"
                      data-bs-target="#collapseExample"
                      role="button"
                      aria-expanded="false"
                      aria-bs-controls="collapseExample"
                      className="createACC-btn"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-lg-3"></div>
            </div>
          </div>

          <div>
            <TableComponent
              id="recentContributionsTable"
              name="Recent Contributions"
              tableHeaders={recentContribDataHeader}
              data={recentContibutions}
            />
          </div>
          <div>
            <TableComponent
              id="RecentWithdrawalsTable"
              name="Recent Withdrawals"
              tableHeaders={recentWithdrawalsDataHeader}
              data={contribBalance}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;
