const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: '',
    database: 'pensionplus'
});

//Create account

app.post('/create', (req, res) => {
    //Create account details
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;
    //user details
        const phone = req.body.phone;
        const id_no = req.body.id_no;
        const dob = req.body.dob;
        const employment_status = req.body.employemnt_status;

        db.query("INSERT INTO userAccount (name, email, password) VALUES (?, ?, ?)", 
        [name, email, password, phone, id_no, dob, employment_status], 
        (err, result) =>{
            if(err){
                console.log(err);
            }
            else{
                res.send("Values Inserted");
            }
        }
        );
});

//user details
app.post('/userDetails', (req, res) => {    
        const phone = req.body.phone;
        const id_no = req.body.id_no;
        const dob = req.body.dob;
        const employment_status = req.body.employment_status;

        db.query("INSERT INTO userDetails (phone, id_no, dob, employment_status) VALUES (?, ?, ?, ?)", 
        [phone, id_no, dob, employment_status], 
        (err, result) =>{
            if(err){
                console.log(err);
            }
            else{
                res.send("Values Inserted");
            }
        }
        );
});



app.listen(5000, ()=>{
    console.log("Server is running on port 5000");
});

