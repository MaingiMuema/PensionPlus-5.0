import $ from "jquery";
import Axios from "axios";
import { useState } from "react";

const Email = () =>{
    const [userEmail, setUserEmail] = useState();
        

        //Get email from backend
        const checkEmail= () => {
            Axios.post("http://localhost:5000/getProfile", {
              
            }).then((response) => {
                if(response.data.message == 'No Profile'){
                    alert("Could not send email");               
                }
                else{   
                    setUserEmail(response.data[0].email);
                }
        
            });
          };

        var to,subject,text;
    
        const sendEmail = () => {    
            to=userEmail;
           
                subject="Welcome email";
                text="Welcome to pensionplus.";
                
                $.post("http://localhost:5000/send",{to:to,subject:subject,text:text},function(data){
                if(window.location.href=="/#/login")
                {
                    alert("Email has been sent at "+to+" . Please check inbox!");
                }
                });
            
        };
    
}

export default Email;