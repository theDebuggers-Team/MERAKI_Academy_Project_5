import emailjs from "emailjs-com";
import React from "react";
// np instal1 enailjs-com save
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./emailjs.css"

toast.configure();
const ContactUs = () => {
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_k41gckx', 'template_cvrnvzh',e.target, 'user_Rx3I0704PL1aG8AASNv5Y')
      .then((result) => {
          console.log(result.text);
          toast.success("your email sent Successfully,thank you for your feedback", {
            position: toast.POSITION.TOP_RIGHT,
          });
      }, (error) => {
          console.log(error.text);
      });

      e.target.reset()
  };

  return (
    <div className="container-emailjs">
      <form onSubmit={sendEmail} >
        <div className="form-input-emailjs">
          <div className="form-name-emailjs">
              <label>Your Name :</label>
              
            <input type="text" placeholder="Your Name" name="name" className="form-inp-but-emailjs" required/>
            <br/>
          </div>
          <div className="form-email-emailjs">
          <label>Email Address :</label>
              
            <input type="text" placeholder="Email Address" name="email" className="form-inp-but-emailjs" required />
            <br/>
          </div>
          <div className="form-subject-emailjs">
          <label>Subject :</label>
              
            <input type="text" placeholder="Subject (Optional)" name="subject" className="form-inp-but-emailjs"/>
            <br/>
          </div>
          <div className="form-textarea2-emailjs">
          <label>Message :</label>
              
            <textarea type="text" placeholder="Your Message" className="form-textarea-emailjs" name="message" required/>
            <br/>
          </div>
          <div className="form-submit-emailjs">
            <input type="Submit" value="Send Email" className="form-btn-emailjs" name=""/>
            <br/>
          </div>
        </div>
      </form>
    </div>
  );
};


export default ContactUs