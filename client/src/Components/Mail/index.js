import React, {Component} from 'react';
import API from "../../utils/API";
import axios from 'axios';
import MailRetrieve from "../MailRetrieve"

class ContactForm extends Component{
  
    handleSubmit(event){
        event.preventDefault();
        const mailSubject = document.getElementById('subject').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        console.log(mailSubject);
        console.log(email);
        console.log(message);

        let mailData = {
            senderName: "Harcoded now sender Name",   
                senderEmail: "teamorganizer@outlook.com",
                email: email, 
                mailSubject: mailSubject, 
                message: message,
                taskId: "01"
        }

        //Save mail
API.saveMail(mailData)
// .then(res => {
//   console.log(res.data);
// })
.then(()=>{
  console.log("Mail Saved");
})
.catch(err => {
  console.log(err);
});



        axios({
            method: "POST", 
            url:"http://localhost:3002/send", 
            data: mailData
            // {
            //     senderName: "Harcoded now sender Name",   
            //     senderEmail: "teamorganizer@outlook.com",
            //     email: email, 
            //     mailSubject: mailSubject, 
            //     message: message
            // }
        }).then((response)=>{
            console.log(response.data);
            if (response.data.msg === 'success'){
                this.setState({
                    render: true
                });
                alert("Message Sent."); 
               
                this.resetForm()
            }else if(response.data.msg === 'fail'){
                alert("Message failed to send.")
            }
        })
    }

    resetForm(){
        document.getElementById('contact-form').reset();

    }

    render(){
        return(

            <div>
            <div className="col-sm-4 offset-sm-4">
                <form id="contact-form" onSubmit={this.handleSubmit.bind(this)} method="POST">
                    
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input type="email" className="form-control" id="email" aria-describedby="emailHelp" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="subject">Subject</label>
                        <input type="text" className="form-control" id="subject" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="message">Message</label>
                        <textarea className="form-control" rows="5" id="message"></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>

            <br></br>
         <MailRetrieve />


            </div>


        )
       
        
    }
};

export default ContactForm; 