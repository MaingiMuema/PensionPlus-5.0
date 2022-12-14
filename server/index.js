const express = require('express');
const app = express();
const isAuth = require('./isAuth');

const mysql = require('mysql');

const cors = require('cors');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

//Password encryption modules
const bcrypt = require('bcrypt');
const saltRounds = 10;
 
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true
}));

app.use(cookieParser());//Express middleware for easier cookie handling
app.use(bodyParser.urlencoded({ extended: true }));//Supports URL encoded bodies

const sessionConfig = {
    name: 'userSession',
    secret: 'process.env.cookieSECRET',
    cookie: {
        maxAge: 1000 * 60 * 60,
        secure: false,
        httpOnly: true,
    },
    saveUninitialized: true,
    resave: false,
}


app.use(session(sessionConfig));


app.use(express.json());//Supports JSON-encoded bodies

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: '',
    database: 'pensionplus'
});

//1. Create account

app.post('/create', async(req, res) => {
    //Create account details
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;

        db.query("SELECT * FROM userAccount WHERE email = ?;",
        email,
        (err, result)=>{
            if(err){
                console.log({err : err});
            }
            else if(result.length > 0){
                res.send("A username with that email already exists! Try logging in");
            }
            else{
                bcrypt.hash(password, saltRounds, (err, hash) =>{

                    if(err){
                        console.log(err);
                    }
        
                    db.query("INSERT INTO userAccount (name, email, password) VALUES (?, ?, ?);", 
                    [name, email, hash], 
                    (err, result) =>{
                        if(err){
                            console.log(err);
                        }
                        else{                          
                            res.send("Values Inserted");
                        }
                    }
                    );
                })
        
            }
        }
        )

       
       
});

//2. Login a user

app.post('/login', (req, res) => {
    //login details
        const email = req.body.email;
        const password = req.body.password;

        db.query("SELECT * FROM userAccount WHERE email = ?;", 
        email,
        (err, result) =>{
            if(err){
                console.log({err : err});
            }
            if(result.length > 0){
               bcrypt.compare(password, result[0].password, (error, response) =>{
                if(response){
                    req.session.user = result;   
                    res.send({message: 'Logged In'});                                  
                }
                else{
                    res.send({message: "Wrong email/Password combination!"});
                }
               })
            }
            else{
                res.send({message: "User does not exist!"});
              
            }

                   
            
        }
        );
});

//3. Middleware
app.post('/auth', (req, res, next) =>{
    if(req.session && req.session.user){
        res.send({message: 'authenticated'});
        next();
    }
    else{
        res.send({message: 'Not authenticated'});
    }
    
});

//4. Logout

app.get('/logout', (req, res) =>{
    if(req.session){
        req.session.destroy(error =>{
            if(error){
                res.send("Log out error!");
            }
            else{
                res.send('Logged out');
            }
        })
    }
    else{
        res.send('Not logged in');
    }
})


//5. Check if user details exist

app.post('/checkUserDetails', (req, res) => {
    //id from userAccount table
    const userId = req.session.user[0].id;

        db.query("SELECT * FROM userDetails WHERE userId = ?;", 
        userId,
        (err, result) =>{
            if(err){
                console.log({err : err});
            }
            if(result.length > 0){
               res.send({message: "Client details present"});
            }
            else{
                res.send({message: "Client details are missing"});
              
            }

            
        }
        );
});


//6. user details
app.post('/userDetails', (req, res) => {    
        const phone = req.body.phone;
        const id_no = req.body.id_no;
        const dob = req.body.dob;
        const employment_status = req.body.employment_status;
        const userId = req.session.user[0].id;
        

        db.query("INSERT INTO userDetails (phone, id_no, dob, employment_status, userId) VALUES (?, ?, ?, ?, ?)", 
        [phone, id_no, dob, employment_status, userId], 
        (err, result) =>{
            if(err){
                console.log(err);
            }
            else{
                res.send({message: "Values Inserted"});
            }
        }
        );

});

//7. CheckSignature

app.post('/userSignature', (req, res) =>{
    const userId = req.session.user[0].id;

    db.query("SELECT * FROM pensiondetails WHERE userId = ?;", 
        userId,
        (err, result) =>{
            if(err){
                console.log({err : err});
            }
            if(result.length > 0){
               
               const userSignature = req.body.userSignature;

               db.query("UPDATE pensionDetails SET userSignature = ? WHERE userId = ?", 
                [userSignature, userId],
                (err, result) =>{
                    if(err){
                        console.log(err);
                    }
                    else{
                        res.send({message: "signature inserted"});
                    }
                }
                );
            }
            else{
                res.send({message: "signature missing"});
              
            }
        }
        );  

})


//8. Add pensionDetails
app.post('/pensionDetails',  (req, res) => {    
    const EmployerName= req.body.companyName;
    const OrganizationEmail = req.body.companyEmail;
    const PensionProvider = req.body.provider;
    const AdditionalInformation = req.body.additionalInfo;
    const FundedByEmployer = req.body.isFundedByEmployer;
    const userId = req.session.user[0].id;
    const transferStatus = req.body.transferStatus;
    const transactionType = "Pension Transfer";


      //Inserting pension details to the pensionDetails table
      db.query("INSERT INTO pensiondetails (EmployerName, OrganizationEmail, PensionProvider, AdditionalInformation, FundedByEmployer, userId, transferStatus) VALUES (?, ?, ?, ?, ?, ?, ?)", 
      [EmployerName, OrganizationEmail, PensionProvider, AdditionalInformation, FundedByEmployer, userId, transferStatus], 
      (err, result) =>{
          if(err){
              console.log(err);
          }
          else{
              res.send({message: "Values Inserted"});
          }
      }
      );

    const userName = (req.session.user[0].name);

    //Inserting usercombinedpension
   db.query("INSERT INTO usercombinedpensions (userId, userName, provider, transactionType) VALUES (?, ?, ?, ?)", 
    [userId, userName, PensionProvider, transactionType], 
    (err, result) =>{
        if(err){
            console.log(err);
        }
        else{
           
        }
    }
    );

    //Inserting into transactions

   db.query("INSERT INTO transactions (PensionProvider, transferStatus, transactionType, userId) VALUES (?, ?, ?, ?)", 
   [PensionProvider, transferStatus, transactionType, userId], 
   (err, result) =>{
       if(err){
           console.log(err);
       }
       else{
          
       }
   }
   );

   //Getting user Id no and updating to transactions
   db.query("SELECT id_no  FROM userdetails WHERE userId = ?;", 
        userId,
        (err, result) =>{
            if(err){
                console.log({err : err});
            }
            if(result.length > 0){
               db.query("UPDATE transactions SET idNo = ? WHERE userId = ?", 
                [result[0].id_no, userId],
                (err, result) =>{
                    if(err){
                        console.log(err);
                    }
                    else{
                        
                    }
                }
                );

                db.query("UPDATE pensiondetails SET idNo = ? WHERE userId = ?", 
                [result[0].id_no, userId],
                (err, result) =>{
                    if(err){
                        console.log(err);
                    }
                    else{
                        
                    }
                }
                );
            }
            else{
                
              
            }
        }
        );  


});


//9. Get pension providers to send to confirm page for the user to confirm the providers

app.post('/pensionProvider', (req, res) => {
    //id from userAccount table
    const userId = req.session.user[0].id;
    const transferStatus = 1;

        db.query("SELECT PensionProvider AS providerName FROM pensiondetails WHERE userId = ? AND transferStatus = ?;", 
        [userId, transferStatus],
        (err, result) =>{
            if(err){
                console.log({err : err});
            }
            if(result.length > 0){
               res.send({message: result});
            }
            else{
                res.send({message: "Providers are missing."});
              
            }

            
        }
        );
});

//10. UPDATE status

app.post('/queueTransfer', (req, res) => {
    //id from userAccount table
    const userId = req.session.user[0].id;
    const transferStatus = req.body.transferStatus;

    db.query("UPDATE pensionDetails SET transferStatus = ? WHERE userId = ?", 
    [transferStatus, userId],
    (err, result) =>{
        if(err){
            console.log(err);
        }
        else{
            res.send({message: "Transfer queued successfully"});
        }
    }
    );
});


// 11. Total Combined pensions
app.post('/totalCombined', (req, res) => {
    //id from userAccount table
    const userId = req.session.user[0].id;
    const transactionType = "Pension Transfer";

        db.query("SELECT SUM(amount) AS totalCombined FROM transactions WHERE userId = ? AND transactionType = ?;", 
        [userId, transactionType],
        (err, result) =>{
            if(err){
                console.log({err : err});
            }
            if(result.length > 0){
               res.send(result);
            }
            else{
                res.send({message: "Amount not found"});
            }
            
        }
        );
});

// 12. Get Total contributions
app.post('/totalContributions', (req, res) => {
    //id from userAccount table
    const userId = req.session.user[0].id;

        db.query("SELECT SUM(amount) AS totalContributed FROM usercontributions WHERE userId = ?", 
        [userId],
        (err, result) =>{
            if(err){
                console.log({err : err});
            }
            if(result.length > 0){
               res.send(result);
            }
            else{
                res.send({message: "Amount not found"});
              
            }

            
        }
        );
});

//13. Get transactions to populate graph

app.post('/transactions', (req, res) => {
    //id from userAccount table
    const userId = req.session.user[0].id;

        db.query("SELECT amount, DATE_FORMAT(time, '%Y-%m') AS timeStamp FROM transactions WHERE userId = ? AND transferStatus > 99 ORDER BY Time ASC;", 
        [userId],
        (err, result) =>{
            if(err){
                console.log({err : err});
            }
            if(result.length > 0){
               res.send(result);
            }
            else{
                res.send({message: "No transactions yet"});
              
            }

            
        }
        );
});

//14. get Pending pension transfers

app.post('/pendingTransfers', (req, res) => {
    //id from userAccount table
    const userId = req.session.user[0].id;

        db.query("SELECT PensionProvider, transferStatus FROM transactions WHERE userId = ? AND transferStatus < 100;", 
        [userId],
        (err, result) =>{
            if(err){
                console.log({err : err});
            }
            if(result.length > 0){
               res.send(result);
            }
            else{
                res.send({message: "No pension transfers"});
                
            }
        }
        );
});

//15. Get activity from database

app.post('/activity', (req, res) => {
    //id from userAccount table
    const userId = req.session.user[0].id;

        db.query("SELECT transactionType AS activity, Amount AS activityAmount FROM transactions WHERE userId = ? AND transferStatus > 99;", 
        [userId],
        (err, result) =>{
            if(err){
                console.log({err : err});
            }
            if(result.length > 0){
               res.send(result);
            }
            else{
                res.send({message: "No activity"});
              
            }

            
        }
        );
});

//
//
//
//
//
//
//##########   Admin Section
//
//
//
//
//

//1. Get total accounts

app.post('/totalCases', (req, res) => {
    //id from adminAccount table
    //const userId = req.session.user[0].id;

        db.query("SELECT id AS cases FROM useraccount;", 
        (err, result) =>{
            if(err){
                console.log({err : err});
            }
            if(result){
               res.send(result);
            }
            else{
                res.send({message: "No cases"});
              
            }            
        }
        );
});

//2. Get total pending transfers

app.post('/totalPendingTransfers', (req, res) => {
    //id from adminAccount table
    //const userId = req.session.user[0].id;

        db.query("SELECT COUNT(*) AS totalPendingTransfers FROM transactions WHERE transferStatus < 100;", 
        (err, result) =>{
            if(err){
                console.log({err : err});
            }
            if(result){
               res.send(result);
            }
            else{
                res.send({message: "No Pending transfers"});
              
            }            
        }
        );
});

//Create admin account
app.post('/adminCreate', async(req, res) => {
    //Create account details
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;

        db.query("SELECT * FROM adminaccount WHERE email = ?;",
        email,
        (err, result)=>{
            if(err){
                console.log({err : err});
            }
            else if(result.length > 0){
                res.send("Another admin with that email already exists! If this is you, Try logging in");
            }
            else{
                bcrypt.hash(password, saltRounds, (err, hash) =>{

                    if(err){
                        console.log(err);
                    }
        
                    db.query("INSERT INTO adminaccount (adminName, email, password) VALUES (?, ?, ?);", 
                    [name, email, hash], 
                    (err, result) =>{
                        if(err){
                            console.log(err);
                        }
                        else{                          
                            res.send("Values Inserted");
                        }
                    }
                    );
                })
        
            }
        }
        )
    
});

//2. Admin Login

app.post('/adminLogin', (req, res) => {
    //login details
        const email = req.body.email;
        const password = req.body.password;

        db.query("SELECT * FROM adminaccount WHERE email = ?;", 
        email,
        (err, result) =>{
            if(err){
                console.log({err : err});
            }
            if(result.length > 0){
               bcrypt.compare(password, result[0].password, (error, response) =>{
                if(response){
                    req.session.user = result;   
                    res.send({message: 'Logged In'});                 
                }
                else{
                    res.send({message: "Wrong email/Password combination!"});
                }
               })
            }
            else{
                res.send({message: "Administrator account does not exist!"});
              
            }

            
        }
        );
});

//3. Authenticate admin
app.post('/adminAuth', (req, res, next) =>{
    if(req.session && req.session.user){
        res.send({message: 'authenticated'});
        next();
    }
    else{
        res.send({message: 'Not authenticated'});
    }
    
});

//4. Get number of cases and date of enrolment to populate graph

app.post('/casePerformance', (req, res) => {

        db.query("SELECT id, DATE_FORMAT(create_time, '%m') AS timeStamp FROM useraccount ORDER BY create_time ASC;", 
        (err, result) =>{
            if(err){
                console.log({err : err});
            }
            if(result.length > 0){
               res.send(result);
            }
            else{
                res.send({message: "No cases"});
              
            }

            
        }
        );
});

//5. Admin dashboard pending transfer table
app.post("/")

//6. get Pending pension transfers

app.post('/queuedTransfers', (req, res) => {
    

        db.query("SELECT DISTINCT useraccount.name, useraccount.email, userdetails.phone, userdetails.id_no, userdetails.dob, userdetails.employment_status, pensiondetails.EmployerName, pensiondetails.OrganizationEmail, transactions.PensionProvider, pensiondetails.FundedByEmployer, transactions.transferStatus, pensiondetails.usersignature FROM useraccount, userdetails, pensiondetails, transactions WHERE useraccount.id = userdetails.userId AND userdetails.userId = pensiondetails.userId AND userdetails.userId = transactions.userId AND transactions.transferStatus < 100 AND pensiondetails.transferStatus < 100;", 
    
        (err, result) =>{
            if(err){
                console.log({err : err});
            }
            if(result.length > 0){
               res.send(result);
            }
            else{
                res.send({message: "No pension transfers"});
                
            }
        }
        );
});

//7. Sending admin user name to dashboard
app.post('/adminName', (req, res) => {
        res.send(req.session.user[0].adminName);
});


//8. Update of status and amount --- Done by the admin the dashboard
app.post('/statusUpdate', (req, res) => {
    //Update details
    const clientId = req.body.clientId;
    const pensionAmount = req.body.pensionAmount;
    const status = req.body.status;
    const pensionProvider = req.body.pensionProvider;

    db.query("UPDATE transactions SET transferStatus = ?, Amount = ?  WHERE idNo = ? AND PensionProvider = ?;", 
    [status, pensionAmount, clientId, pensionProvider], 
    (err, result) =>{
        if(err){
            console.log(err);
        }
        else{                          
            res.send("Values Updated");
            
        }
    }
    );

                    
})
       

//9. Update of status and amount --- Done by the admin the dashboard
app.post('/statusUpdate2', (req, res) => {
    //Update details
    const clientId = req.body.clientId;
    const status = req.body.status;
    const pensionProvider = req.body.pensionProvider;

    //Update
    db.query("UPDATE pensiondetails SET transferStatus = ? WHERE idNo = ? AND PensionProvider = ?;", 
            [status, clientId, pensionProvider], 
            (err, result) =>{
                if(err){
                    
                }
                else{                       
                    res.send("Values Updated");
                }
            }
            ); 
                    
})

  //10. get contributions

app.post('/contributionsTable', (req, res) => {
    

    db.query("SELECT DISTINCT useraccount.name, userdetails.id_no, userdetails.phone, transactions.amount FROM useraccount JOIN userdetails ON useraccount.id = userdetails.userId JOIN transactions ON userdetails.userId = transactions.userid WHERE transactions.transactionType = \"Contribution\";", 

    (err, result) =>{
        if(err){
            console.log({err : err});
        }
        if(result.length > 0){
           res.send(result);
        }
        else{
            res.send({message: "No contributions"});
            
        }
    }
    );
});       

       
//11. Get withdrawals

app.post('/withdrawTable', async(req, res) => {
    

    db.query("SELECT DISTINCT useraccount.name, userdetails.id_no, userdetails.phone, transactions.amount FROM useraccount JOIN userdetails ON useraccount.id = userdetails.userId JOIN transactions ON userdetails.userId = transactions.userid WHERE transactions.transactionType = \"Withdraw\";", 

    (err, result) =>{
        if(err){
            console.log({err : err});
        }
        if(result.length > 0){
           res.send(result);
        }
        else{
            res.send({message: "No Withdrawals"});
            
        }
    }
    );
});  


app.listen(5000, ()=>{
    console.log("Server is running on port 5000");
});
