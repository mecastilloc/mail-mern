import React, { Component } from 'react';
import API from "../../utils/API";
import axios from 'axios';
import MailRetrieve from "../MailRetrieve"
import FileUpload from "../FileUpload"

class MailForm extends Component {
    constructor(props){
        super(props);
        this.state = {
          id : "fileUpload", // I would use this.props.id for a real world implementation
          fileURI : null
        }
      }
      
      buildFileTag(){
          //console.log (this.state.fileURI)
        let fileTag = null;
        if (this.state.fileURI !== null)
          fileTag = this.state.fileURI
                     
        return fileTag;
      }
      
      readURI(e){
        if(e.target.files && e.target.files[0]){
          let reader = new FileReader();
          reader.onload = function(ev){
            this.setState({fileURI:ev.target.result});
          }.bind(this);
          reader.readAsDataURL(e.target.files[0]);
        }
      }
      
      handleChange(e){
        e.preventDefault();
        this.readURI(e); // maybe call this with webworker or async library?
        if (this.props.onChange !== undefined)
          this.props.onChange(e); // propagate to parent component
              }

    handleSubmit(event) {
        event.preventDefault();
        const fileTag = this.buildFileTag();
        // console.log(fileTag)
        const mailSubject = document.getElementById('subject').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        let mailData = {
            senderName: "Harcoded now sender Name",
            senderEmail: "teamorganizer@outlook.com",
            email: email,
            mailSubject: mailSubject,
            message: message,
            taskId: "01",
            fileUri: fileTag
        }

        console.log(mailData)

        axios({
            method: "POST",
            url: "/send",
            data: mailData
        })
        .then((response) => {
            console.log(response.data);
            if (response.data.msg === 'success') {
                //Save mail
                API.saveMail(mailData)
                    .then(() => {
                        console.log("Mail Saved");
                    })
                    .catch(err => {
                                           });
                alert("Message Sent.");

                this.resetForm()
            } else if (response.data.msg === 'fail') {
                 alert("Message failed to send.")
            }
        });
    }

    resetForm() {
        document.getElementById('contact-form').reset();
    };

    render() {
        return (
            <div>
                <div className="col-sm-4 offset-sm-4">
                    {/* <form id="contact-form" onSubmit={this.handleSubmit.bind(this)} method="POST"> */}
                    <form id="contact-form" >
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
                       
                        <div className="form-group"> 
                       <label
                htmlFor={this.state.id}
                //className="button"
                >

              </label>
              <input
                id={this.state.id}
                type="file"
                onChange={this.handleChange.bind(this)}
                className="show-for-sr" />              
            </div>


                         <button type="submit" className="btn btn-primary" onClick={this.handleSubmit.bind(this)}>Submit</button>
                       
                    </form>
                    
                </div>
                <br></br>
                <MailRetrieve />
            </div>
        )
    }
};

export default MailForm; 