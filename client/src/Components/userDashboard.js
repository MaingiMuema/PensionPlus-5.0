import { HashRouter as Router, Route, Switch, Link } from "react-router-dom";
import DashboardNavBar from "./dashboardNavbar";
import React, { useRef } from "react";
import moment from "moment";
import {CircularProgressbar, CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useState, useEffect, Component } from "react";
import Axios from "axios";
import {  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell, PieChart, Pie, LabelList, Label,} from "recharts";
import "semantic-ui-css/semantic.min.css";
import { Icon, Item } from "semantic-ui-react";

//Images
import img1 from "../Assets/totalIcon.png";
import img2 from "../Assets/whiteAddIcon.png";
import img3 from "../Assets/whiteContributionIcon.png";
import img4 from "../Assets/whiteWithdrawIcon.png";
import img5 from "../Assets/whitePensionCalculatorIcon.png";
import img6 from "../Assets/collaborate.png";
import img7 from "../Assets/user.png";

function UserDashboard () {
              //Login status
const [loginStatus, setLoginStatus] = useState("false");

    const checkLogin= () => {
        Axios.post("http://localhost:5000/auth", {
          
        }).then((response) => {
            if(response.data.message == 'Not authenticated'){
                window.location.href="/";
           
            }
            else{   
                setLoginStatus("true");
                totalCombined();
                pendingTransfers();
            }
    
        });
      };

      const checkDetails = () =>{
        Axios.post("http://localhost:5000/checkUserDetails", {

        }).then((response) =>{
            if(response.data.message == "Client details present"){
                window.location.href="/#/pensionDetails";
            }
            else{
                window.location.href="/#/clientDetails";
            }
        })
      }

        //Get total combined amount from backend

        const [totalCombinedAmount, setTotalCombinedAmount] = useState(0);

        const totalCombined = () =>{
            totalContributions();
            transactions();
            activity();
            Axios.post("http://localhost:5000/totalCombined", {
    
            }).then((response) =>{
                if(response){
                    setTotalCombinedAmount(response.data[0].totalCombined);
                }
                else{
                    setTotalCombinedAmount(response.data[0].totalCombined);
                }
            })
          }
        
          
        //Get total contributed amount from backend
        const [contributedAmount, setContributedAmount] = useState(0);

        const totalContributions = () =>{
            Axios.post("http://localhost:5000/totalContributions", {
    
            }).then((response) =>{
                if(response){
                    setContributedAmount(response.data[0].totalContributed);
                }
                else{
                    setContributedAmount(response.data[0].totalContributed);
                }
            })
          }

        //Total Pot amount
        const totalPotAmount = contributedAmount + totalCombinedAmount;

         //Total percentage change
         const [annualPercentageChange, setannualPercentageChange] = useState(0);

         let sign;
         if(annualPercentageChange == 0){
            sign = "";
         }
         else if(annualPercentageChange > 0){
            sign = "+"
         }
         else{
            sign = "-"
         }


        //Progress status bar
        const progressStatus = "60%";

        //Combined and Contributions percentages

        let combinedPercentage = totalCombinedAmount*100/totalPotAmount;
        let contributionPercentage = contributedAmount*100/totalPotAmount;

       // const tCombined = parseInt(combinedPercentage);
        // const tCContributed = parseInt(contributionPercentage);

          //Donut Chart

          const portfolioData = [
            {
                pieLable:"Portfolio", name: 'Contributions', value: contributionPercentage, fill: "#FFC928"
               
            },
            {
                name: 'Combined Pensions', value: combinedPercentage, fill: "#0075C9"
            }
        ]
          

        //const pendingTransfer = "Imaginarium Pensions";

        //List Update
        const [pendingTransferList, setpendingTransferList] = useState([]);

        //Get pending pension transfers
        const pendingTransfers= () => {

            Axios.post("http://localhost:5000/pendingTransfers", {      
            }).then((response) => {
                console.log(response);
            if(response.data.message == "No pension transfers"){
                console.log(response);
                
                setpendingTransferList(
                    [
                        {
                            providerName: "No pending tranfers",
                            transferStatus: 0
                        }
                    ]
                );
            }
            else{
                console.log(response);
                setpendingTransferList(response.data);
               
            }
            
            
            });
        };

        //Activity List
        const [activityList, setTransferList] = useState([
            {
                activity: "Pension Transfer",
                timeStamp: "24 SEP 2022, 3:49PM",
                activityAmount: 13500
            },
            {
                activity: "Contribution",
                timeStamp: "13 Sep 2022, 10:45 PM",
                activityAmount: 15000
            },
            {
                activity: "Withdraw",
                timeStamp: "10 Aug 2022, 1:40 PM",
                activityAmount: 3500
            },

        ]);

          //Get pension providers
         const activity= () => {

            Axios.post("http://localhost:5000/activity", {      
            }).then((response) => {
            console.log(response);
            if(response.data.message == "No activity"){
                setTransferList(
                    [
                        {
                            activity: "No activity",
                            timeStamp: "10 Aug 2022, 1:40 PM",
                            activityAmount: 0
                        }
                    ]
                );
            }
            else{
                setTransferList(response.data);
            }            
            });
        }; 


        //Line graph data

        //Get amount and year from the backend
       

        const [data, setData] = useState([]);

        const [KshAmount, setKshAmount] = useState();

        const transactions = () =>{
            Axios.post("http://localhost:5000/transactions", {
    
            }).then((response) =>{            
                var tamount = [];

                for(var i=0; i<response.data.length; i++){
                    let amountT = response.data[i].amount;
                    tamount[0] = response.data[0].amount;
                    if(i>0){
                        tamount[i] = amountT + tamount[i-1];
                    }
                    
                }
                setKshAmount(tamount)

                for(i=0; i<response.data.length; i++){
                    response.data[i].amount = tamount[i];
                }

                if(response){

                    setData(response.data);
                }
                else{
                    console.log("No amount combined or contributed!");
                }
            })
          }

          var screenWidth = window.screen.width;
          var casegraphWidth;
          var casegraphHeight;

          casegraphWidth = 550;

          if(screenWidth < 540 && screenWidth > 343){
            casegraphWidth = 400;
            casegraphHeight = 350;
          }
          else if(screenWidth < 342){
            casegraphWidth = 300;
            casegraphHeight = 250;
          }
          else{
            casegraphWidth = 550;
            casegraphHeight = 300;
          }



//Check user session


/*useEffect(() =>{
  Axios.get("http://localhost:5000/login").then((response) => {
    if(response.data.loggedIn == true){
      setLoginStatus("LoggedIn");
    }
    
  })
}, [])*/

var applauseMessage;

if(totalPotAmount == 0){
    applauseMessage = "Get started";
    contributionPercentage =0;
    combinedPercentage =0;
}
else{
    applauseMessage = "You are on Track.";
}

    return (
        <div onLoad={checkLogin} className="container-fluid Dashboard">
        <div className="container">
            <>
            <Router>
                <Switch>
                <Route exact path="/UserDashboard">
                    <DashboardNavBar />
                </Route>
                </Switch>
            </Router>
            </>
        </div>
        <div className="row">
            <div className="col-lg-4">
            <div className="dashboardBlueDiv fadeInLeft">
                <h1>Dashboard</h1>
            </div>
            </div>
            <div class="col-lg-4 fadeInUp">
            <div className="dWrapper">
            <div className="dashboardCard">
                <div className="totalPot d-flex">
                <span className="d-flex column1">
                    <div className="totalIcon">
                        <img className="img-fluid" src={img1} alt="total Icon" />
                    </div>
                    <div className="align-middle">
                    <p className="totalPotLabel">
                        Total Pot:
                        <br />
                        <br />{" "}
                        <p className="totalPotAmount">
                        <b>Ksh{totalPotAmount}</b>
                        </p>
                    </p>
                    </div>
                </span>
                <span className="percentageChange d-flex justify-content-left column2">
                    <p className="annualChange">
                    Annual Change
                    <br />
                    <br />{" "}
                    <p class="pChange">
                        {sign}
                        {annualPercentageChange}%
                    </p>
                    </p>
                </span>
                </div>
            </div>
            </div>
            </div>
            <div className="col-lg-4 fadeInRight">
                <div className="d-flex justify-content-center">
                    <div className="applausCard">
                        <h3>{applauseMessage}</h3>
                        <p>Contribute/add to retire with confidence</p>
                    </div>
                </div>
            </div>
        </div>
        <div className="container dashboardButtonContainer">
                <div className="row">
                    <div className="col-lg-3 fadeInUp">
                    <Link onClick={checkDetails}>
                        <div className="d-flex justify-content-center">
                            <button className="dashboardButton ">
                                <div className="buttonIcon">
                                    <img className="img-fluid bIcon" src={img2} alt="total Icon" />
                                </div>
                                <br/>
                                <span className="btnText">Add Pension</span>
                            </button>
                        </div>
                    </Link>
                    </div>
                    <div className="col-lg-3 fadeInUp">
                    <Link to="/contributionPage"><div className="d-flex justify-content-center">
                            <button className="dashboardButton ">
                                <div className="buttonIcon">
                                    <img className="img-fluid bIcon" src={img3} alt="total Icon" />
                                </div>
                                <br/>
                                <span className="btnText">Contribute</span>
                            </button>
                        </div>
                    </Link>
                    </div>
                   <div className="col-lg-3 fadeInUp">
                   <Link to="/withdraw"><div className="d-flex justify-content-center">
                            <button className="dashboardButton ">
                                <div className="buttonIcon">
                                    <img className="img-fluid bIcon" src={img4} alt="total Icon" />
                                </div>
                                <br/>
                                <span className="btnText">Withdraw</span>
                            </button>
                        </div>
                    </Link>
                    </div>
                    <div className="col-lg-3 fadeInUp">
                    <Link to="/pensionCalculator"><div className="d-flex justify-content-center">
                            <button className="dashboardButton ">
                                <div className="buttonIcon">
                                    <img className="img-fluid bIcon" src={img5} alt="total Icon" />
                                </div>
                                <br/>
                                <span className="btnText">Pension Calculator</span>
                            </button>
                        </div>
                    </Link>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-3">

                    </div>
                    <div className="col-lg-3 fadeInUp">
                    <Link to="/profile">
                        <div className="d-flex justify-content-center">
                            <button className="dashboardButton ">
                                <div className="buttonIcon">
                                    <img className="img-fluid bIcon" src={img7} alt="total Icon" />
                                </div>
                                <br/>
                                <span className="btnText">Profile</span>
                            </button>
                        </div>
                    </Link>
                    </div>
                    <div className="col-lg-3 fadeInUp">
                    <Link to="/referral"><div className="d-flex justify-content-center">
                            <button className="dashboardButton ">
                                <div className="buttonIcon">
                                    <img className="img-fluid bIcon" src={img6} alt="total Icon" />
                                </div>
                                <br/>
                                <span className="btnText">Refer a friend</span>
                            </button>
                        </div>
                    </Link>
                    </div>
                    <div className="col-lg-3">
                        
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-7 fadeInLeft">
                        <div className="dashboardCard" id="caseChart">
                            <span className="tableHeading">Performance track</span>
                       
                            <LineChart  className="casegraph"
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
                                    <XAxis dataKey="timeStamp" />
                                    <YAxis  dataKey="amount"/>
                                    <Tooltip />
                                    <Legend />
                                    <Line
                                        type="monotone"
                                        dataKey="amount"
                                        stroke="#FFC928"
                                        activeDot={{ r: 8 }}
                                    />
                            </LineChart>
                  
                            <p className="caseSummary">This is an overview of your pension performance, that is, your combined pensions,
                                 interest gained and total contributions.</p>
                        </div>
                    </div>
                    <div className="col-lg-5 fadeInRight">
                        <div className="dashboardCard" id="portfolioChart">
                            <PieChart className="portfolioPiechart" width={220} height={220}>
                                <Pie
                                data={portfolioData}
                                cx={100}
                                cy={100}
                                innerRadius={70}
                                outerRadius={100}
                                dataKey="value"
                                
                                isAnimationActive={true}
                                >
                                    <LabelList
                                        dataKey="pieLable"
                                        position="center"
                                        fill="#000"
                                        stroke="#000"
                                    />
                                </Pie>
                                
                            </PieChart>
                            <br/>
                            <p>Total pot: &nbsp;<b> Ksh{totalPotAmount}<hr/></b></p>
                        
                            <div className="d-flex">
                                <div className="blueLabel"></div><p className="portfolioKeyLabel">Combined Pensions ({combinedPercentage}%)</p>
                            </div>
                            <br/>
                            <div className="d-flex">
                                <div className="yellowLabel"></div><p className="portfolioKeyLabel">Contributions ({contributionPercentage}%)</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row activitySection">
                    <div className="col-lg-6 fadeInUp">
                        <div className="dashboardCard">
                            <span className="tableHeading">Pending Transfers</span>
                            <hr className="pensionTransferDivider"/>
                            <div className="listUpdateContainer">
                                {
                                    pendingTransferList.map(transfer => 
                                        <li class="pendingTransfer">
                                        <span className="pendingTransferProviderName">{transfer.PensionProvider}</span>
                                        <span className="d-flex justify-content-end">
                                            <span className="progressStatus">
                                                <CircularProgressbar
                                                    value={transfer.transferStatus}
                                                    text={`${transfer.transferStatus}%`}
                                                    styles={buildStyles({
                                                        textColor: "#444",
                                                        pathColor: "#FFC928",
                                                        trailColor: "#D9D9D9"
                                                    })}
                                                />
                                            </span>
                                        </span>
                                    </li>    
                                        )
                                }
                            </div>
                        </div> 
                    </div>
                    <div className="col-lg-6">
                        <div className="dashboardCard">
                            <span className="tableHeading">Activity</span>
                            <hr className="pensionTransferDivider"/>
                            <div className="listUpdateContainer">
                                {
                                    activityList.map(activity => 
                                        <li class="pendingTransfer">
                                        <span className="pendingTransferProviderName">{activity.activity}</span>
                                        <span className="d-flex justify-content-end" id="activityAmount">
                                            <span className="activityStatus">
                                                Ksh{activity.activityAmount}
                                            </span>
                                        </span>
                                    </li>    
                                        )
                                }
                            </div>
                        </div>
                    </div>
                </div>
        </div>
        </div>
    );
    };


export default UserDashboard;
