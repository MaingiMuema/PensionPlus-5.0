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
import Axios from "axios";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

//Images
import img1 from "../../Assets/totalIcon.png";
import img2 from "../../Assets/whiteAddIcon.png";
import img3 from "../../Assets/whiteContributionIcon.png";
import img4 from "../../Assets/whiteWithdrawIcon.png";

//Localhost url for the server
const domain = "http://localhost:5000"; 

function AdminDashboard() {
  //Queued transfers data
  const [queuedDataHeader, setQueuedDataHeaders] = useState([
    "Client name",
    "Client Email",
    "Client ID",
    "Employer name",
    "Organization email",
    "Pension Provider",
    "Current Employer",
    "Transfer Status",
  ]);

  const [queuedData, setQueuedData] = useState([]);

  //Getting queued transfers
  const queuedTransfers = () => {
    Axios.post(domain + "/queuedTransfers", {}).then((response) => {
      if (response.data.message == "No pension transfers") {

      } else {
        setQueuedData(response.data);
      }
    });
  };

  //Login status
  const [loginStatus, setLoginStatus] = useState("false");

  const checkLogin = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    Axios.post(domain + "/adminAuth", {}).then((response) => {
      if (response.data.message == "Not authenticated") {
        window.location.href = "admin-login";
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
    adName();
    queuedTransfers();
    contributionsTable();
    withdrawTable();
    fetchSuggestions();

    Axios.post(domain + "/totalCases", {}).then((response) => {
      let totalAccounts;

      for (var i = 0; i < response.data.length; i++) {
        totalAccounts = response.data[response.data.length - 1];
      }

      setTotalCases(totalAccounts.cases);
    });
  };

  // Total Combine cash for the last year
  const [combinedAmount, setCombinedAmount] = useState(0);

  // Total contributed amount for the last year
  const [contributionAmount, setContributionAmount] = useState(0);

  const [combinedCashAmount, setCombinedCashAmount] = useState([]);

  const [portfolioData, setportfolioData] = useState(0);

  //Getting total combined to populate combine pie
  const pieData = () => {
    Axios.post(domain + "/getPieData", {}).then((response) => {
      if (response.data == "No combined pensions") {
        setCombinedAmount(0);
        
      } else {
        if (response.data.contributedCumulative[0].totalContributed == null) {
          setContributionAmount(0);
        } else {
          setContributionAmount(
            response.data.contributedCumulative[0].totalContributed
          );
        }

        setCombinedAmount(response.data.combinedCumulative[0].totalCombined);

        const tCombinedAmnt = response.data.combinedCumulative[0].totalCombined;
        const tContributedAmnt = response.data.contributedCumulative[0].totalContributed;

        var monthSort = []; //Array to store sorted months
        var monthSort2 = [];

        var i;

        //Initialize months
        var JanuaryAmount = 0;
        var FebruaryAmount = 0;
        var MarchAmount = 0;
        var AprilAmount = 0;
        var MayAmount = 0;
        var JuneAmount = 0;
        var JulyAmount = 0;
        var AugustAmount = 0;
        var SeptemberAmount = 0;
        var OctoberAmount = 0;
        var NovemberAmount = 0;
        var DecemberAmount = 0;

        //Initialize months
        var JanuaryAmount2 = 0;
        var FebruaryAmount2 = 0;
        var MarchAmount2 = 0;
        var AprilAmount2 = 0;
        var MayAmount2 = 0;
        var JuneAmount2 = 0;
        var JulyAmount2 = 0;
        var AugustAmount2 = 0;
        var SeptemberAmount2 = 0;
        var OctoberAmount2 = 0;
        var NovemberAmount2 = 0;
        var DecemberAmount2 = 0;

        var month;
        var month2;

        var amount = 0;
        var amount2 = 0;

        //For loop to add every month's combined pensions

        for (i = 0; i < response.data.combineMonthAndYear.length; i++) {
          month = response.data.combineMonthAndYear[i].monthAndYear.slice(
            5,
            response.data.combineMonthAndYear[i].monthAndYear.length
          ); //Get month from date string response
          
          //Get month from date string response
          amount = response.data.combineMonthAndYear[i].amount; //Get amount from from the JSON object

          if (month == "January") {
            JanuaryAmount = JanuaryAmount + amount;
          } else if (month == "February") {
            FebruaryAmount = FebruaryAmount + amount;
          } else if (month == "March") {
            MarchAmount = MarchAmount + amount;
          } else if (month == "April") {
            AprilAmount = AprilAmount + amount;
          } else if (month == "May") {
            MayAmount = MayAmount + amount;
          } else if (month == "June") {
            JuneAmount = JuneAmount + amount;
          } else if (month == "July") {
            JulyAmount = JulyAmount + amount;
          } else if (month == "August") {
            AugustAmount = AugustAmount + amount;
          } else if (month == "September") {
            SeptemberAmount = SeptemberAmount + amount;
          } else if (month == "October") {
            OctoberAmount = OctoberAmount + amount;
          } else if (month == "November") {
            NovemberAmount = NovemberAmount + amount;
          } else if (month == "December") {
            DecemberAmount = DecemberAmount + amount;
          } else {
          }

        }    

         //For loop to add every month's combined pensions

         for (i = 0; i < response.data.contributeMonthAndYear.length; i++) {
          month2 = response.data.contributeMonthAndYear[i].monthAndYear.slice(
            5,
            response.data.contributeMonthAndYear[i].monthAndYear.length
          );

          amount2 =  response.data.contributeMonthAndYear[i].amount;

         if (month2 == "January") {
            JanuaryAmount2 = JanuaryAmount2 + amount2;
          } else if (month2 == "February") {
            FebruaryAmount2 = FebruaryAmount2 + amount2;
          } else if (month2 == "March") {
            MarchAmount2 = MarchAmount2 + amount2;
          } else if (month2 == "April") {
            AprilAmount2 = AprilAmount2 + amount2;
          } else if (month2 == "May") {
            MayAmount2 = MayAmount2 + amount2;
          } else if (month2 == "June") {
            JuneAmount2 = JuneAmount2 + amount2;
          } else if (month2 == "July") {
            JulyAmount2 = JulyAmount2 + amount2;
          } else if (month2 == "August") {
            AugustAmount2 = AugustAmount2 + amount2;
          } else if (month2 == "September") {
            SeptemberAmount2 = SeptemberAmount2 + amount2;
          } else if (month2 == "October") {
            OctoberAmount2 = OctoberAmount2 + amount2;
          } else if (month2 == "November") {
            NovemberAmount2 = NovemberAmount2 + amount2;
          } else if (month2 == "December") {
            DecemberAmount2 = DecemberAmount2 + amount2;
          } else {
          }
        }    

        //Monthly shortform percentages
        const jp = ((JanuaryAmount*100)/tCombinedAmnt).toFixed(3);
        const fp = ((FebruaryAmount*100)/tCombinedAmnt).toFixed(3);
        const mp = ((MarchAmount*100)/tCombinedAmnt).toFixed(3);
        const ap = ((AprilAmount*100)/tCombinedAmnt).toFixed(3);
        const Map = ((MayAmount*100)/tCombinedAmnt).toFixed(3);
        const Jup = ((JuneAmount*100)/tCombinedAmnt).toFixed(3);
        const Julp = ((JulyAmount*100)/tCombinedAmnt).toFixed(3);
        const Aup = ((AugustAmount*100)/tCombinedAmnt).toFixed(3);
        const sp = ((SeptemberAmount*100)/tCombinedAmnt).toFixed(3);
        const op = ((OctoberAmount*100)/tCombinedAmnt).toFixed(3);
        const np = ((NovemberAmount*100)/tCombinedAmnt).toFixed(3);
        const dp = ((DecemberAmount*100)/tCombinedAmnt).toFixed(3);

        //Monthly shortform percentages
        const jp2 = ((JanuaryAmount2*100)/tContributedAmnt).toFixed(3);
        const fp2 = ((FebruaryAmount2*100)/tContributedAmnt).toFixed(3);
        const mp2 = ((MarchAmount2*100)/tContributedAmnt).toFixed(3);
        const ap2 = ((AprilAmount2*100)/tContributedAmnt).toFixed(3);
        const Map2 = ((MayAmount2*100)/tContributedAmnt).toFixed(3);
        const Jup2 = ((JuneAmount2*100)/tContributedAmnt).toFixed(3);
        const Julp2 = ((JulyAmount2*100)/tContributedAmnt).toFixed(3);
        const Aup2 = ((AugustAmount2*100)/tContributedAmnt).toFixed(3);
        const sp2 = ((SeptemberAmount2*100)/tContributedAmnt).toFixed(3);
        const op2 = ((OctoberAmount2*100)/tContributedAmnt).toFixed(3);
        const np2 = ((NovemberAmount2*100)/tContributedAmnt).toFixed(3);
        const dp2 = ((DecemberAmount2*100)/tContributedAmnt).toFixed(3);

        var totalMonthlyAmounts = []; //An array that stores the monthly totals

        var totalMonthlyAmounts2 = []; //An array that stores the monthly totals

        //A for loop to match Month to a corresponding index and also populate the totalMonthlyTotals array with monthly totals
        for (i = 0; i < 12; i++) {
          if (i == 0) {
            if (JanuaryAmount > 0) {
              monthSort[i] = "Jan" + " " + jp +"%";
              totalMonthlyAmounts[i] = JanuaryAmount;
            } else {
              monthSort[i] = "";
            }
          } else if (i == 1) {
            if (FebruaryAmount > 0) {
              monthSort[i] = "Feb" + " " + fp +"%";
              totalMonthlyAmounts[i] = FebruaryAmount;
            } else {
              monthSort[i] = "";
            }
          } else if (i == 2) {
            if (MarchAmount > 0) {
              monthSort[i] = "Mar" + " " + mp +"%";
              totalMonthlyAmounts[i] = MarchAmount;
            } else {
              monthSort[i] = "";
            }
          } else if (i == 3) {
            if (AprilAmount > 0) {
              monthSort[i] = "Apr" + " " + ap +"%";
              totalMonthlyAmounts[i] = AprilAmount;
            } else {
              monthSort[i] = "";
            }
          } else if (i == 4) {
            if (MayAmount > 0) {
              monthSort[i] = "May" + " " + Map +"%";
              totalMonthlyAmounts[i] = MayAmount;
            } else {
              monthSort[i] = "";
            }
          } else if (i == 5) {
            if (JuneAmount > 0) {
              monthSort[i] = "Jun" + " " + Jup +"%";
              totalMonthlyAmounts[i] = JuneAmount;
            } else {
              monthSort[i] = "";
            }
          } else if (i == 6) {
            if (JulyAmount > 0) {
              monthSort[i] = "Jul" + " " + Julp +"%";
              totalMonthlyAmounts[i] = JulyAmount;
            } else {
              monthSort[i] = "";
            }
          } else if (i == 7) {
            if (AugustAmount > 0) {
              monthSort[i] = "Aug" + " " + Aup +"%";
              totalMonthlyAmounts[i] = AugustAmount;
            } else {
              monthSort[i] = "";
            }
          } else if (i == 8) {
            if (SeptemberAmount > 0) {
              monthSort[i] = "Sep" + " " + sp +"%";
              totalMonthlyAmounts[i] = SeptemberAmount;
            } else {
              monthSort[i] = "";
            }
          } else if (i == 9) {
            if (OctoberAmount > 0) {
              monthSort[i] = "Oct" + " " + op +"%";
              totalMonthlyAmounts[i] = OctoberAmount;
            } else {
              monthSort[i] = "";
            }
          } else if (i == 10) {
            if (NovemberAmount > 0) {
              monthSort[i] = "Nov" + " " + np +"%";
              totalMonthlyAmounts[i] = NovemberAmount;
            } else {
              monthSort[i] = "";
            }
          } else if (i == 11) {
            if (DecemberAmount > 0) {
              monthSort[i] = "Dec" + " " + dp +"%";
              totalMonthlyAmounts[i] = DecemberAmount;
            } else {
              monthSort[i] = "";
            }
          } else {
          }
        }

        for (i = 0; i < 12; i++) {
          if (i == 0) {
            if (JanuaryAmount2 > 0) {
              monthSort2[i] = "Jan" + " " + jp2 +"%";
              totalMonthlyAmounts2[i] = JanuaryAmount2;
            } else {
              monthSort2[i] = "";
            }
          } else if (i == 1) {
            if (FebruaryAmount2 > 0) {
              monthSort2[i] = "Feb" + " " + fp2 +"%";
              totalMonthlyAmounts2[i] = FebruaryAmount2;
            } else {
              monthSort2[i] = "";
            }
          } else if (i == 2) {
            if (MarchAmount2 > 0) {
              monthSort2[i] = "Mar" + " " + mp2 +"%";
              totalMonthlyAmounts2[i] = MarchAmount2;
            } else {
              monthSort2[i] = "";
            }
          } else if (i == 3) {
            if (AprilAmount2 > 0) {
              monthSort2[i] = "Apr" + " " + ap2 +"%";
              totalMonthlyAmounts2[i] = AprilAmount2;
            } else {
              monthSort2[i] = "";
            }
          } else if (i == 4) {
            if (MayAmount2 > 0) {
              monthSort2[i] = "May" + " " + Map2 +"%";
              totalMonthlyAmounts2[i] = MayAmount2;
            } else {
              monthSort2[i] = "";
            }
          } else if (i == 5) {
            if (JuneAmount2 > 0) {
              monthSort2[i] = "Jun" + " " + Jup2 +"%";
              totalMonthlyAmounts2[i] = JuneAmount2;
            } else {
              monthSort2[i] = "";
            }
          } else if (i == 6) {
            if (JulyAmount2 > 0) {
              monthSort2[i] = "Jul" + " " + Julp2 +"%";
              totalMonthlyAmounts2[i] = JulyAmount2;
            } else {
              monthSort2[i] = "";
            }
          } else if (i == 7) {
            if (AugustAmount2 > 0) {
              monthSort2[i] = "Aug" + " " + Aup2 +"%";
              totalMonthlyAmounts2[i] = AugustAmount2;
            } else {
              monthSort2[i] = "";
            }
          } else if (i == 8) {
            if (SeptemberAmount2 > 0) {
              monthSort2[i] = "Sep" + " " + sp2 +"%";
              totalMonthlyAmounts2[i] = SeptemberAmount2;
            } else {
              monthSort2[i] = "";
            }
          } else if (i == 9) {
            if (OctoberAmount2 > 0) {
              monthSort2[i] = "Oct" + " " + op2 +"%";
              totalMonthlyAmounts2[i] = OctoberAmount2;
            } else {
              monthSort2[i] = "";
            }
          } else if (i == 10) {
            if (NovemberAmount2 > 0) {
              monthSort2[i] = "Nov" + " " + np2 +"%";
              totalMonthlyAmounts2[i] = NovemberAmount2;
            } else {
              monthSort2[i] = "";
            }
          } else if (i == 11) {
            if (DecemberAmount2 > 0) {
              monthSort2[i] = "Dec" + " " + dp2 +"%";
              totalMonthlyAmounts2[i] = DecemberAmount2;
            } else {
              monthSort2[i] = "";
            }
          } else {
          }
        }

        console.log(totalMonthlyAmounts2);

        var combinedAmount = [];
        var contributedAmount = [];

        combinedAmount = [
          {
            name: monthSort[0],
            value: totalMonthlyAmounts[0],
            fill: "#a978f1",
          },
          {
            name: monthSort[1],
            value: totalMonthlyAmounts[1],
            fill: "#d786e1",
          },
          {
            name: monthSort[2],
            value: totalMonthlyAmounts[2],
            fill: "#e294c8",
          },
          {
            name: monthSort[3],
            value: totalMonthlyAmounts[3],
            fill: "#ffbbd4",
          },
          {
            name: monthSort[4],
            value: totalMonthlyAmounts[4],
            fill: "#c995bd",
          },
          {
            name: monthSort[5],
            value: totalMonthlyAmounts[5],
            fill: "#816993",
          },
          {
            name: monthSort[6],
            value: totalMonthlyAmounts[6],
            fill: "#696b93",
          },
          {
            name: monthSort[7],
            value: totalMonthlyAmounts[7],
            fill: "#0f3960",
          },
          {
            name: monthSort[8],
            value: totalMonthlyAmounts[8],
            fill: "#696b93",
          },
          {
            name: monthSort[9],
            value: totalMonthlyAmounts[9],
            fill: "#8f74a3",
          },
          {
            name: monthSort[10],
            value: totalMonthlyAmounts[10],
            fill: "#ffbbd4",
          },
          {
            name: monthSort[11],
            value: totalMonthlyAmounts[11],
            fill: "#6072fd",
          },
        ];

        contributedAmount = [
          {
            name: monthSort2[0],
            value: totalMonthlyAmounts2[0],
            fill: "#a978f1",
          },
          {
            name: monthSort2[1],
            value: totalMonthlyAmounts2[1],
            fill: "#d786e1",
          },
          {
            name: monthSort2[2],
            value: totalMonthlyAmounts2[2],
            fill: "#e294c8",
          },
          {
            name: monthSort2[3],
            value: totalMonthlyAmounts2[3],
            fill: "#ffbbd4",
          },
          {
            name: monthSort2[4],
            value: totalMonthlyAmounts2[4],
            fill: "#c995bd",
          },
          {
            name: monthSort2[5],
            value: totalMonthlyAmounts2[5],
            fill: "#816993",
          },
          {
            name: monthSort2[6],
            value: totalMonthlyAmounts2[6],
            fill: "#696b93",
          },
          {
            name: monthSort2[7],
            value: totalMonthlyAmounts2[7],
            fill: "#0f3960",
          },
          {
            name: monthSort2[8],
            value: totalMonthlyAmounts2[8],
            fill: "#696b93",
          },
          {
            name: monthSort2[9],
            value: totalMonthlyAmounts2[9],
            fill: "#8f74a3",
          },
          {
            name: monthSort2[10],
            value: totalMonthlyAmounts2[10],
            fill: "#ffbbd4",
          },
          {
            name: monthSort2[11],
            value: totalMonthlyAmounts2[11],
            fill: "#6072fd",
          },
        ];

        setCombinedCashAmount(combinedAmount);
        setportfolioData(contributedAmount);
      }
    });
  };

  //Get total pending pension transfers
  const [pendingPensions, setPendingTransfer] = useState(0);

  const pendingTransfers = () => {
    pieData();
    Axios.post(domain + "/totalPendingTransfers", {}).then(
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

  //Get admin name from backend
  const adName = () => {
    Axios.post(domain + "/adminName", {}).then((response) => {
      if (response) {
        setAdminName(response.data);
      } else {
      }
    });
  };

  const [data, setData] = useState([]);
  const [Month, setMonth] = useState([]);

  const getCases = () => {
    Axios.post(domain + "/getCases", {}).then((response) => {
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
      var yearSort = [];

      setMonth(response.data);

      for (i = 0; i < response.data.length; i++) {
        yearSort[i] = response.data[i].monthAndYear;
      }

      //A for loop to Find total cases for each month
      for (i = 0; i < response.data.length; i++) {
        if (response.data[i].month == "January") {
          JanuaryCases = JanuaryCases + 1;
        } else if (response.data[i].month == "February") {
          FebruaryCases = FebruaryCases + 1;
        } else if (response.data[i].month == "March") {
          MarchCases = MarchCases + 1;
        } else if (response.data[i].month == "April") {
          AprilCases = AprilCases + 1;
        } else if (response.data[i].month == "May") {
          MayCases = MayCases + 1;
        } else if (response.data[i].month == "June") {
          JuneCases = JuneCases + 1;
        } else if (response.data[i].month == "July") {
          JulyCases = JulyCases + 1;
        } else if (response.data[i].month == "August") {
          AugustCases = AugustCases + 1;
        } else if (response.data[i].month == "September") {
          SeptemberCases = SeptemberCases + 1;
        } else if (response.data[i].month == "October") {
          OctoberCases = OctoberCases + 1;
        } else if (response.data[i].month == "November") {
          NovemberCases = NovemberCases + 1;
        } else if (response.data[i].month == "December") {
          DecemberCases = DecemberCases + 1;
        }
      }

      var casesArray = []; //An array that store the a Month with its total cases.
      var totalMonthlyCases = []; //An array that stores the monthly totals

      //A for loop to match Month to a corresponding index and also populate the totalMonthlyCases array with monthly totals
      for (i = 0; i < 12; i++) {
        var yearSort1 = yearSort[i].slice(5, yearSort[i].length);

        if (i == 0) {
          if (yearSort1 == "January") {
            Month[i] = yearSort[i];
          } else {
            Month[i] = "January";
          }
          totalMonthlyCases[i] = JanuaryCases;
        } else if (i == 1) {
          if (yearSort1 == "February") {
            Month[i] = yearSort[i];
          } else {
            Month[i] = "February";
          }
          totalMonthlyCases[i] = FebruaryCases;
        } else if (i == 2) {
          if (yearSort1 == "March") {
            Month[i] = yearSort[i];
          } else {
            Month[i] = "March";
          }
          totalMonthlyCases[i] = MarchCases;
        } else if (i == 3) {
          if (yearSort1 == "April") {
            Month[i] = yearSort[i];
          } else {
            Month[i] = "April";
          }
          totalMonthlyCases[i] = AprilCases;
        } else if (i == 4) {
          if (yearSort1 == "May") {
            Month[i] = yearSort[i];
          } else {
            Month[i] = "May";
          }
          totalMonthlyCases[i] = MayCases;
        } else if (i == 5) {
          if (yearSort1 == "June") {
            Month[i] = yearSort[i];
          } else {
            Month[i] = "June";
          }
          totalMonthlyCases[i] = JuneCases;
        } else if (i == 6) {
          if (yearSort1 == "July") {
            Month[i] = yearSort[i];
          } else {
            Month[i] = "July";
          }
          totalMonthlyCases[i] = JulyCases;
        } else if (i == 7) {
          if (yearSort1 == "August") {
            Month[i] = yearSort[i];
          } else {
            Month[i] = "August";
          }
          totalMonthlyCases[i] = AugustCases;
        } else if (i == 8) {
          if (yearSort1 == "September") {
            Month[i] = yearSort[i];
          } else {
            Month[i] = "September";
          }
          totalMonthlyCases[i] = SeptemberCases;
        } else if (i == 9) {
          if (yearSort1 == "October") {
            Month[i] = yearSort[i];
          } else {
            Month[i] = "October";
          }
          totalMonthlyCases[i] = OctoberCases;
        } else if (i == 10) {
          if (yearSort1 == "November") {
            Month[i] = yearSort[i];
          } else {
            Month[i] = "November";
          }
          totalMonthlyCases[i] = NovemberCases;
        } else if (i == 11) {
          if (yearSort1 == "December") {
            Month[i] = yearSort[i];
          } else {
            Month[i] = "December";
          }
          totalMonthlyCases[i] = DecemberCases;
        }
      }

      let dateMonth = new Date();
      let currentMonth = dateMonth.getMonth();

      if (currentMonth == 0) {
        casesArray = [
          {
            month: Month[1],
            Cases: totalMonthlyCases[1],
          },
          {
            month: Month[2],
            Cases: totalMonthlyCases[2],
          },
          {
            month: Month[3],
            Cases: totalMonthlyCases[3],
          },
          {
            month: Month[4],
            Cases: totalMonthlyCases[4],
          },
          {
            month: Month[5],
            Cases: totalMonthlyCases[5],
          },
          {
            month: Month[6],
            Cases: totalMonthlyCases[6],
          },
          {
            month: Month[7],
            Cases: totalMonthlyCases[7],
          },
          {
            month: Month[8],
            Cases: totalMonthlyCases[8],
          },
          {
            month: Month[9],
            Cases: totalMonthlyCases[9],
          },
          {
            month: Month[10],
            Cases: totalMonthlyCases[10],
          },
          {
            month: Month[11],
            Cases: totalMonthlyCases[11],
          },
          {
            month: Month[0],
            Cases: totalMonthlyCases[0],
          },
        ];
      } else if (currentMonth == 1) {
        casesArray = [
          {
            month: Month[2],
            Cases: totalMonthlyCases[2],
          },
          {
            month: Month[3],
            Cases: totalMonthlyCases[3],
          },
          {
            month: Month[4],
            Cases: totalMonthlyCases[4],
          },
          {
            month: Month[5],
            Cases: totalMonthlyCases[5],
          },
          {
            month: Month[6],
            Cases: totalMonthlyCases[6],
          },
          {
            month: Month[7],
            Cases: totalMonthlyCases[7],
          },
          {
            month: Month[8],
            Cases: totalMonthlyCases[8],
          },
          {
            month: Month[9],
            Cases: totalMonthlyCases[9],
          },
          {
            month: Month[10],
            Cases: totalMonthlyCases[10],
          },
          {
            month: Month[11],
            Cases: totalMonthlyCases[11],
          },
          {
            month: Month[0],
            Cases: totalMonthlyCases[0],
          },
          {
            month: Month[1],
            Cases: totalMonthlyCases[1],
          },
        ];
      } else if (currentMonth == 2) {
        casesArray = [
          {
            month: Month[3],
            Cases: totalMonthlyCases[3],
          },
          {
            month: Month[4],
            Cases: totalMonthlyCases[4],
          },
          {
            month: Month[5],
            Cases: totalMonthlyCases[5],
          },
          {
            month: Month[6],
            Cases: totalMonthlyCases[6],
          },
          {
            month: Month[7],
            Cases: totalMonthlyCases[7],
          },
          {
            month: Month[8],
            Cases: totalMonthlyCases[8],
          },
          {
            month: Month[9],
            Cases: totalMonthlyCases[9],
          },
          {
            month: Month[10],
            Cases: totalMonthlyCases[10],
          },
          {
            month: Month[11],
            Cases: totalMonthlyCases[11],
          },
          {
            month: Month[0],
            Cases: totalMonthlyCases[0],
          },
          {
            month: Month[1],
            Cases: totalMonthlyCases[1],
          },
          {
            month: Month[2],
            Cases: totalMonthlyCases[2],
          },
        ];
      } else if (currentMonth == 3) {
        casesArray = [
          {
            month: Month[4],
            Cases: totalMonthlyCases[4],
          },
          {
            month: Month[5],
            Cases: totalMonthlyCases[5],
          },
          {
            month: Month[6],
            Cases: totalMonthlyCases[6],
          },
          {
            month: Month[7],
            Cases: totalMonthlyCases[7],
          },
          {
            month: Month[8],
            Cases: totalMonthlyCases[8],
          },
          {
            month: Month[9],
            Cases: totalMonthlyCases[9],
          },
          {
            month: Month[10],
            Cases: totalMonthlyCases[10],
          },
          {
            month: Month[11],
            Cases: totalMonthlyCases[11],
          },
          {
            month: Month[0],
            Cases: totalMonthlyCases[0],
          },
          {
            month: Month[1],
            Cases: totalMonthlyCases[1],
          },
          {
            month: Month[2],
            Cases: totalMonthlyCases[2],
          },
          {
            month: Month[3],
            Cases: totalMonthlyCases[3],
          },
        ];
      } else if (currentMonth == 4) {
        casesArray = [
          {
            month: Month[5],
            Cases: totalMonthlyCases[5],
          },
          {
            month: Month[6],
            Cases: totalMonthlyCases[6],
          },
          {
            month: Month[7],
            Cases: totalMonthlyCases[7],
          },
          {
            month: Month[8],
            Cases: totalMonthlyCases[8],
          },
          {
            month: Month[9],
            Cases: totalMonthlyCases[9],
          },
          {
            month: Month[10],
            Cases: totalMonthlyCases[10],
          },
          {
            month: Month[11],
            Cases: totalMonthlyCases[11],
          },
          {
            month: Month[0],
            Cases: totalMonthlyCases[0],
          },
          {
            month: Month[1],
            Cases: totalMonthlyCases[1],
          },
          {
            month: Month[2],
            Cases: totalMonthlyCases[2],
          },
          {
            month: Month[3],
            Cases: totalMonthlyCases[3],
          },
          {
            month: Month[4],
            Cases: totalMonthlyCases[4],
          },
        ];
      } else if (currentMonth == 5) {
        casesArray = [
          {
            month: Month[6],
            Cases: totalMonthlyCases[6],
          },
          {
            month: Month[7],
            Cases: totalMonthlyCases[7],
          },
          {
            month: Month[8],
            Cases: totalMonthlyCases[8],
          },
          {
            month: Month[9],
            Cases: totalMonthlyCases[9],
          },
          {
            month: Month[10],
            Cases: totalMonthlyCases[10],
          },
          {
            month: Month[11],
            Cases: totalMonthlyCases[11],
          },
          {
            month: Month[0],
            Cases: totalMonthlyCases[0],
          },
          {
            month: Month[1],
            Cases: totalMonthlyCases[1],
          },
          {
            month: Month[2],
            Cases: totalMonthlyCases[2],
          },
          {
            month: Month[3],
            Cases: totalMonthlyCases[3],
          },
          {
            month: Month[4],
            Cases: totalMonthlyCases[4],
          },
          {
            month: Month[5],
            Cases: totalMonthlyCases[5],
          },
        ];
      } else if (currentMonth == 6) {
        casesArray = [
          {
            month: Month[7],
            Cases: totalMonthlyCases[7],
          },
          {
            month: Month[8],
            Cases: totalMonthlyCases[8],
          },
          {
            month: Month[9],
            Cases: totalMonthlyCases[9],
          },
          {
            month: Month[10],
            Cases: totalMonthlyCases[10],
          },
          {
            month: Month[11],
            Cases: totalMonthlyCases[11],
          },
          {
            month: Month[0],
            Cases: totalMonthlyCases[0],
          },
          {
            month: Month[1],
            Cases: totalMonthlyCases[1],
          },
          {
            month: Month[2],
            Cases: totalMonthlyCases[2],
          },
          {
            month: Month[3],
            Cases: totalMonthlyCases[3],
          },
          {
            month: Month[4],
            Cases: totalMonthlyCases[4],
          },
          {
            month: Month[5],
            Cases: totalMonthlyCases[5],
          },
          {
            month: Month[6],
            Cases: totalMonthlyCases[6],
          },
        ];
      } else if (currentMonth == 7) {
        casesArray = [
          {
            month: Month[8],
            Cases: totalMonthlyCases[8],
          },
          {
            month: Month[9],
            Cases: totalMonthlyCases[9],
          },
          {
            month: Month[10],
            Cases: totalMonthlyCases[10],
          },
          {
            month: Month[11],
            Cases: totalMonthlyCases[11],
          },
          {
            month: Month[0],
            Cases: totalMonthlyCases[0],
          },
          {
            month: Month[1],
            Cases: totalMonthlyCases[1],
          },
          {
            month: Month[2],
            Cases: totalMonthlyCases[2],
          },
          {
            month: Month[3],
            Cases: totalMonthlyCases[3],
          },
          {
            month: Month[4],
            Cases: totalMonthlyCases[4],
          },
          {
            month: Month[5],
            Cases: totalMonthlyCases[5],
          },
          {
            month: Month[6],
            Cases: totalMonthlyCases[6],
          },
          {
            month: Month[7],
            Cases: totalMonthlyCases[7],
          },
        ];
      } else if (currentMonth == 8) {
        casesArray = [
          {
            month: Month[9],
            Cases: totalMonthlyCases[9],
          },
          {
            month: Month[10],
            Cases: totalMonthlyCases[10],
          },
          {
            month: Month[11],
            Cases: totalMonthlyCases[11],
          },
          {
            month: Month[0],
            Cases: totalMonthlyCases[0],
          },
          {
            month: Month[1],
            Cases: totalMonthlyCases[1],
          },
          {
            month: Month[2],
            Cases: totalMonthlyCases[2],
          },
          {
            month: Month[3],
            Cases: totalMonthlyCases[3],
          },
          {
            month: Month[4],
            Cases: totalMonthlyCases[4],
          },
          {
            month: Month[5],
            Cases: totalMonthlyCases[5],
          },
          {
            month: Month[6],
            Cases: totalMonthlyCases[6],
          },
          {
            month: Month[7],
            Cases: totalMonthlyCases[7],
          },
          {
            month: Month[8],
            Cases: totalMonthlyCases[8],
          },
        ];
      } else if (currentMonth == 9) {
        casesArray = [
          {
            month: Month[10],
            Cases: totalMonthlyCases[10],
          },
          {
            month: Month[11],
            Cases: totalMonthlyCases[11],
          },
          {
            month: Month[0],
            Cases: totalMonthlyCases[0],
          },
          {
            month: Month[1],
            Cases: totalMonthlyCases[1],
          },
          {
            month: Month[2],
            Cases: totalMonthlyCases[2],
          },
          {
            month: Month[3],
            Cases: totalMonthlyCases[3],
          },
          {
            month: Month[4],
            Cases: totalMonthlyCases[4],
          },
          {
            month: Month[5],
            Cases: totalMonthlyCases[5],
          },
          {
            month: Month[6],
            Cases: totalMonthlyCases[6],
          },
          {
            month: Month[7],
            Cases: totalMonthlyCases[7],
          },
          {
            month: Month[8],
            Cases: totalMonthlyCases[8],
          },
          {
            month: Month[9],
            Cases: totalMonthlyCases[9],
          },
        ];
      } else if (currentMonth == 10) {
        casesArray = [
          {
            month: Month[11],
            Cases: totalMonthlyCases[11],
          },
          {
            month: Month[0],
            Cases: totalMonthlyCases[0],
          },
          {
            month: Month[1],
            Cases: totalMonthlyCases[1],
          },
          {
            month: Month[2],
            Cases: totalMonthlyCases[2],
          },
          {
            month: Month[3],
            Cases: totalMonthlyCases[3],
          },
          {
            month: Month[4],
            Cases: totalMonthlyCases[4],
          },
          {
            month: Month[5],
            Cases: totalMonthlyCases[5],
          },
          {
            month: Month[6],
            Cases: totalMonthlyCases[6],
          },
          {
            month: Month[7],
            Cases: totalMonthlyCases[7],
          },
          {
            month: Month[8],
            Cases: totalMonthlyCases[8],
          },
          {
            month: Month[9],
            Cases: totalMonthlyCases[9],
          },
          {
            month: Month[10],
            Cases: totalMonthlyCases[10],
          },
        ];
      } else {
        casesArray = [
          {
            month: Month[0],
            Cases: totalMonthlyCases[0],
          },
          {
            month: Month[1],
            Cases: totalMonthlyCases[1],
          },
          {
            month: Month[2],
            Cases: totalMonthlyCases[2],
          },
          {
            month: Month[3],
            Cases: totalMonthlyCases[3],
          },
          {
            month: Month[4],
            Cases: totalMonthlyCases[4],
          },
          {
            month: Month[5],
            Cases: totalMonthlyCases[5],
          },
          {
            month: Month[6],
            Cases: totalMonthlyCases[6],
          },
          {
            month: Month[7],
            Cases: totalMonthlyCases[7],
          },
          {
            month: Month[8],
            Cases: totalMonthlyCases[8],
          },
          {
            month: Month[9],
            Cases: totalMonthlyCases[9],
          },
          {
            month: Month[10],
            Cases: totalMonthlyCases[10],
          },
          {
            month: Month[11],
            Cases: totalMonthlyCases[11],
          },
        ];
      }

      setData(casesArray);
    });
  };

  //setInterval(getCases(), 2000);

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

  const [recentContribDataHeader, setRecentContribDataHeader] = useState([
    "Client name",
    "Client ID",
    "Phone Number",
    "Amount"
    ,
  ]);

  //Getting total number of people that have contributed for the past one month
  const [contributionCases, setContributionCases] = useState(0);

  const [recentContibutions, setrecentContibutions] = useState([]);

  //Getting queued transfers
  const contributionsTable = () => {
    Axios.post(domain + "/contributionsTable", {}).then(
      (response) => {
        if (response.data.message == "No contributions") {
        } else {
          setContributionCases(response.data.length);
          setrecentContibutions(response.data);
        }
      }
    );
  };

  const [recentWithdrawalsDataHeader, setRecentWithdrawalsDataHeader] =
    useState([
      "Client name",
      "Client ID",
      "Phone Number",
      "Amount"
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

  //Getting total number of people that have withdrawn for the past 1 month
  const [withdrawCases, setWithdrawCases] = useState(0);

  //Getting recent withdrawals

  const withdrawTable = () => {
    Axios.post(domain + "/withdrawTable", {}).then((response) => {
      if (response.data.message == "No withdrawals") {
        setContribBalance(response.data);
      } else {
        let arr = [];

        for(var i=0; i<response.data.length; i++){
          if(response.data[i].withdrawAmount < 0){
            response.data[i].withdrawAmount= response.data[i].withdrawAmount * -1;
          }

          arr[i] = response.data[i];
        }
        setWithdrawCases(arr.length);
        setContribBalance(arr);
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
    const newValue1 = newValue.trim();
    const newValue2 = (newValue1);
    setClientId(newValue2);
  };

  //Pension Provider
  const [pensionProvider, setPensionProvider] = useState("");

  const checkProvider = (event) => {
    const newValue = event.target.value;
    const newValue1 = newValue.trim();
    setPensionProvider(newValue1);
  };

  //Employer
  const [clientEmployer, setClientEmployer] = useState("");

  const checkEmployer = (event) => {
    const newValue = event.target.value;
    const newValue1 = newValue.trim();
    setClientEmployer(newValue1);
  };

  //Get client Signature from backend

  const emptySig =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAyAAAACWCAYAAAAmC+ydAAAAAXNSR0IArs4c6QAACXpJREFUeF7t1zENAAAMw7CVP+mxyOURqGTtyc4RIECAAAECBAgQIEAgEli0Y4YAAQIECBAgQIAAAQInQDwBAQIECBAgQIAAAQKZgADJqA0RIECAAAECBAgQICBA/AABAgQIECBAgAABApmAAMmoDREgQIAAAQIECBAgIED8AAECBAgQIECAAAECmYAAyagNESBAgAABAgQIECAgQPwAAQIECBAgQIAAAQKZgADJqA0RIECAAAECBAgQICBA/AABAgQIECBAgAABApmAAMmoDREgQIAAAQIECBAgIED8AAECBAgQIECAAAECmYAAyagNESBAgAABAgQIECAgQPwAAQIECBAgQIAAAQKZgADJqA0RIECAAAECBAgQICBA/AABAgQIECBAgAABApmAAMmoDREgQIAAAQIECBAgIED8AAECBAgQIECAAAECmYAAyagNESBAgAABAgQIECAgQPwAAQIECBAgQIAAAQKZgADJqA0RIECAAAECBAgQICBA/AABAgQIECBAgAABApmAAMmoDREgQIAAAQIECBAgIED8AAECBAgQIECAAAECmYAAyagNESBAgAABAgQIECAgQPwAAQIECBAgQIAAAQKZgADJqA0RIECAAAECBAgQICBA/AABAgQIECBAgAABApmAAMmoDREgQIAAAQIECBAgIED8AAECBAgQIECAAAECmYAAyagNESBAgAABAgQIECAgQPwAAQIECBAgQIAAAQKZgADJqA0RIECAAAECBAgQICBA/AABAgQIECBAgAABApmAAMmoDREgQIAAAQIECBAgIED8AAECBAgQIECAAAECmYAAyagNESBAgAABAgQIECAgQPwAAQIECBAgQIAAAQKZgADJqA0RIECAAAECBAgQICBA/AABAgQIECBAgAABApmAAMmoDREgQIAAAQIECBAgIED8AAECBAgQIECAAAECmYAAyagNESBAgAABAgQIECAgQPwAAQIECBAgQIAAAQKZgADJqA0RIECAAAECBAgQICBA/AABAgQIECBAgAABApmAAMmoDREgQIAAAQIECBAgIED8AAECBAgQIECAAAECmYAAyagNESBAgAABAgQIECAgQPwAAQIECBAgQIAAAQKZgADJqA0RIECAAAECBAgQICBA/AABAgQIECBAgAABApmAAMmoDREgQIAAAQIECBAgIED8AAECBAgQIECAAAECmYAAyagNESBAgAABAgQIECAgQPwAAQIECBAgQIAAAQKZgADJqA0RIECAAAECBAgQICBA/AABAgQIECBAgAABApmAAMmoDREgQIAAAQIECBAgIED8AAECBAgQIECAAAECmYAAyagNESBAgAABAgQIECAgQPwAAQIECBAgQIAAAQKZgADJqA0RIECAAAECBAgQICBA/AABAgQIECBAgAABApmAAMmoDREgQIAAAQIECBAgIED8AAECBAgQIECAAAECmYAAyagNESBAgAABAgQIECAgQPwAAQIECBAgQIAAAQKZgADJqA0RIECAAAECBAgQICBA/AABAgQIECBAgAABApmAAMmoDREgQIAAAQIECBAgIED8AAECBAgQIECAAAECmYAAyagNESBAgAABAgQIECAgQPwAAQIECBAgQIAAAQKZgADJqA0RIECAAAECBAgQICBA/AABAgQIECBAgAABApmAAMmoDREgQIAAAQIECBAgIED8AAECBAgQIECAAAECmYAAyagNESBAgAABAgQIECAgQPwAAQIECBAgQIAAAQKZgADJqA0RIECAAAECBAgQICBA/AABAgQIECBAgAABApmAAMmoDREgQIAAAQIECBAgIED8AAECBAgQIECAAAECmYAAyagNESBAgAABAgQIECAgQPwAAQIECBAgQIAAAQKZgADJqA0RIECAAAECBAgQICBA/AABAgQIECBAgAABApmAAMmoDREgQIAAAQIECBAgIED8AAECBAgQIECAAAECmYAAyagNESBAgAABAgQIECAgQPwAAQIECBAgQIAAAQKZgADJqA0RIECAAAECBAgQICBA/AABAgQIECBAgAABApmAAMmoDREgQIAAAQIECBAgIED8AAECBAgQIECAAAECmYAAyagNESBAgAABAgQIECAgQPwAAQIECBAgQIAAAQKZgADJqA0RIECAAAECBAgQICBA/AABAgQIECBAgAABApmAAMmoDREgQIAAAQIECBAgIED8AAECBAgQIECAAAECmYAAyagNESBAgAABAgQIECAgQPwAAQIECBAgQIAAAQKZgADJqA0RIECAAAECBAgQICBA/AABAgQIECBAgAABApmAAMmoDREgQIAAAQIECBAgIED8AAECBAgQIECAAAECmYAAyagNESBAgAABAgQIECAgQPwAAQIECBAgQIAAAQKZgADJqA0RIECAAAECBAgQICBA/AABAgQIECBAgAABApmAAMmoDREgQIAAAQIECBAgIED8AAECBAgQIECAAAECmYAAyagNESBAgAABAgQIECAgQPwAAQIECBAgQIAAAQKZgADJqA0RIECAAAECBAgQICBA/AABAgQIECBAgAABApmAAMmoDREgQIAAAQIECBAgIED8AAECBAgQIECAAAECmYAAyagNESBAgAABAgQIECAgQPwAAQIECBAgQIAAAQKZgADJqA0RIECAAAECBAgQICBA/AABAgQIECBAgAABApmAAMmoDREgQIAAAQIECBAgIED8AAECBAgQIECAAAECmYAAyagNESBAgAABAgQIECAgQPwAAQIECBAgQIAAAQKZgADJqA0RIECAAAECBAgQICBA/AABAgQIECBAgAABApmAAMmoDREgQIAAAQIECBAgIED8AAECBAgQIECAAAECmYAAyagNESBAgAABAgQIECAgQPwAAQIECBAgQIAAAQKZgADJqA0RIECAAAECBAgQICBA/AABAgQIECBAgAABApmAAMmoDREgQIAAAQIECBAgIED8AAECBAgQIECAAAECmYAAyagNESBAgAABAgQIECAgQPwAAQIECBAgQIAAAQKZgADJqA0RIECAAAECBAgQICBA/AABAgQIECBAgAABApmAAMmoDREgQIAAAQIECBAgIED8AAECBAgQIECAAAECmYAAyagNESBAgAABAgQIECAgQPwAAQIECBAgQIAAAQKZgADJqA0RIECAAAECBAgQICBA/AABAgQIECBAgAABApmAAMmoDREgQIAAAQIECBAg8JsjAJdg2LaeAAAAAElFTkSuQmCC";

  const [userSig, setUserSig] = useState(emptySig);

  //Get client signature from backend

  const getSig = () => {
    sigCheck = (
      <div className="loadContainer">
        <div class="loading-container">
          <div class="loading"></div>
          <div id="loading-text">Waiting</div>
        </div>
      </div>
    );
    Axios.post(domain + "/getSig", {
      clientId: clientId,
      pensionProvider: pensionProvider,
      clientEmployer: clientEmployer,
    }).then((response) => {
      console.log(response);
      if (response.data != "No Signature") {
        setUserSig(response.data[0].userSignature);
        sigCheck = (
          <img
            src={userSig}
            alt="Client Signature"
            className="clientSig img-fluid"
          />
        );
      }
    });
  };

  //Check signature form inputs
  const checkSigData = () => {
    sigCheck = (
      <div className="loadContainer">
        <div class="loading-container">
          <div class="loading"></div>
          <div id="loading-text">Waiting</div>
        </div>
      </div>
    );
    if (
      (clientId == "" || clientId == null) &&
      (pensionProvider == "" || pensionProvider == null) &&
      (clientEmployer == "" || clientEmployer == null)
    ) {
      alert(
        "Please input Client Id, pension provider and Employer to get signature!"
      );
    } else if (clientId == "" || clientId == null) {
      alert("Please input Client Id!");
    } else if (pensionProvider == "" || pensionProvider == null) {
      alert("Please input the Pension provider!");
    } else if (clientEmployer == "" || clientEmployer == null) {
      alert("Please input the Employer name!");
    } else {
      getSig();
    }
  };

  //checking if signature has loaded
  var sigCheck;

  if (userSig == emptySig) {
    sigCheck = (
      <div className="loadContainer">
        <div class="loading-container">
          <div class="loading"></div>
          <div id="loading-text">Waiting</div>
        </div>
      </div>
    );
  } else {
    sigCheck = (
      <img
        src={userSig}
        alt="Client Signature"
        className="clientSig img-fluid"
      />
    );
  }

  //Download Signature

  const onDownload = () => {
    if (userSig == emptySig) {
      alert("No signature to download");
    } else {
      fetch(userSig).then((response) => {
        response.blob().then((blob) => {
          // Creating new object of Image file
          const fileURL = window.URL.createObjectURL(blob);
          // Setting various property values
          let alink = document.createElement("a");
          alink.href = fileURL;
          alink.download = userSig;
          alink.click();
        });
      });
    }
  };

  //Send Transfer update status to backend

  const statusUpdate = () => {
    Axios.post(domain + "/statusUpdate", {
      clientId: clientId,
      pensionAmount: pensionAmount,
      clientEmployer: clientEmployer,
      status: status,
      pensionProvider: pensionProvider,
    }).then((response) => {});
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

  var idNumber = (cId);

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
    Axios.post(domain + "/clientProfileTotalCombined", {
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
    Axios.post(domain + "/clientProfileTotalContributions", {
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

    Axios.post(domain + "/searchDetails", {
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
    Axios.post(domain + "/getClient", {}).then((response) => {
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

  //Delete account 
  const deleteAccount = () =>{
    Axios.post(domain + "/deleteAccount", {
      clientIdNumber: clientIdNumber,
      clientEmail: clientEmail,
    }).then((response) => {
      if(response.data == "Account Deleted"){
        alertBox();
      }
    });
  }

  //Alert

  const alertBox = () =>{
    document.getElementById('cConfirm2').style.display='flex';
    document.getElementById('cConfirm2').style.zIndex='1'
  }

  const handleClick2 = () =>{
    document.getElementById('cConfirm2').style.display='none';
    document.getElementById('cConfirm2').style.zIndex='-1';
  };

  let alertContent;

  if(clientName == "" || clientName == null){
    alertContent = "No profile to delete";
  }
  else{
    alertContent = "Account Deleted";
  }

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
          <div class="col-lg-3">
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
                        <p className="totalPotAmount totalcounts">
                          <b>{totalCases}</b>
                        </p>
                      </p>
                    </div>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
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
                      <div className="align-middle">
                        <p className="">
                          <p className="counts">
                            <b>{pendingPensions}</b>
                          </p>
                        </p>
                      </div>
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
                      <div className="align-middle">
                        <p className="">
                          <p className="counts">
                            <b>{contributionCases}</b>
                          </p>
                        </p>
                      </div>
                    </div>
                    <br />
                    <span className="btnText">Contributions</span>
                  </button>
                </div>
              </Link>
            </div>
            <div className="col-lg-4">
              <Link>
                <div className="d-flex justify-content-center">
                  <button className="dashboardButton ">
                    <div className="buttonIcon">
                      <div className="align-middle">
                        <p className="">
                          <p className="counts">
                            <b>{withdrawCases}</b>
                          </p>
                        </p>
                      </div>
                    </div>
                    <br />
                    <span className="btnText">Withdrawals</span>
                  </button>
                </div>
              </Link>
            </div>
          </div>
          <div className="row searchBarSection" onClick={hideSearchList}>
            <h3 className="text-center">Search for Client</h3>
            <div className="col-lg-2"></div>
            <div className="col-lg-8 d-flex justify-content-center">
              <div className="input-group mt-5">
                <div className="searchboxContainer d-flex justify-content-center">
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
                <div className="listContainer" onClick={hideSearchList}>
                  <div className="list">{ItemList}</div>
                </div>
             
              </div>
             
            </div>
            <div className="col-lg-2"></div>
          </div>
          <div className="row" onMouseDown={hideSearchList}>
            <div className="col-lg-2"></div>

            <div className="col-lg-8">
              <div className="card clientProfileCard collapse" id="profile">
                <h3 className="text-center">Client Profile</h3>
                <hr className="pensionTransferDivider" />
                <div className="row">
                  <div className="col-lg-6">
                    <span>
                      <b>name: &nbsp;</b>
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
                <button className="call-to-action-deleteBTN" onClick={deleteAccount}>
                  Delete client account
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
                      data={combinedCashAmount}
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
                    Total annual Combined Amount: &nbsp;
                    <b> Ksh{combinedAmount}</b>
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
                  <br />
                  <p className="text-center">
                    Total annual Contributed Amount: &nbsp;
                    <b> Ksh{contributionAmount}</b>
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
            <div className="updateSigBTNS row">
              <div className="col-sm-4 d-flex justify-content-center">
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
              </div>
              <div className="col-sm-4"></div>
              <div className="col-sm-4 d-flex justify-content-center">
                <button
                  data-bs-toggle="collapse"
                  href="#collapseExample1"
                  data-bs-target="#collapseExample1"
                  role="button"
                  aria-expanded="false"
                  aria-bs-controls="collapseExample1"
                  className="call-to-action-admin"
                >
                  {" "}
                  Client Signature
                </button>
              </div>
            </div>
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
                        type="text"
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
                    <label for="provider">
                      <span className="requiredField">*</span>
                      <span>Employer name</span>
                      <br />
                      <br />
                      <input
                        type="text"
                        onChange={checkEmployer}
                        onPaste={checkEmployer}
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
                      onMouseDown={checkData}
                      onMouseUp={queuedTransfers}
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
            <div
              className="updateContainer row  collapse"
              id="collapseExample1"
            >
              <div className="col-lg-3"></div>
              <div className="col-lg-6">
                <h3 className="text-center">
                  Get client Signature for a particular pension transfer
                  request.
                </h3>
                <div className="account-Form d-flex justify-content-center">
                  <div className="updateForm">
                    <label for="idNo">
                      <span className="requiredField">*</span>
                      <span>Client ID number</span>
                      <br />
                      <br />
                      <input
                        type="text"
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
                    <label for="provider">
                      <span className="requiredField">*</span>
                      <span>Employer name</span>
                      <br />
                      <br />
                      <input
                        type="text"
                        onChange={checkEmployer}
                        onPaste={checkEmployer}
                        className="inputbox"
                        id="provider"
                        placeholder="Pension provider name"
                        required
                      />
                    </label>
                    <button onClick={checkSigData} className="createACC-btn">
                      Acquire signature
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-lg-3"></div>
              <div className="userSig">
                <div className="d-flex justify-content-center sigbox">
                  {sigCheck}
                </div>

                {/*     
                <div className="urlImg">
                  <p>{userSig}</p>
                </div>
                */}
                <div className="row">
                  <div className="col"></div>
                  <div className="col d-flex justify-content-center">
                    <button
                      className="call-to-action-admin"
                      onClick={onDownload}
                    >
                      {" "}
                      Download
                    </button>
                  </div>
                  <div className="col"></div>
                </div>
              </div>
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

      {/*Alert*/}
      <div class="modal container-fluid " onClick={handleClick2} id="cConfirm2">
        <div class="card contributeConfirm fadeInBottom" id="card">
            <div> 
                
            </div>
            <div>
              <div id="modal-card-content">
               <p><b>{alertContent}</b></p>
              </div>
              <div class="d-flex justify-content-center">
                  <Link  data-bs-toggle="collapse"
                    href="#profile"
                    data-bs-target="#profile"
                    role="button"
                    aria-expanded="false"
                    aria-bs-controls="profile" onClick={handleClick2} class="btn btn-outline-secondary" id="s-btn-C-page">Ok</Link>
              </div>
            </div>
        </div>
      </div> 
    </>
  );
}

export default AdminDashboard;
