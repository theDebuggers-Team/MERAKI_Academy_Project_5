import emalljs from "emalljs-con";
import React from "react";
// np instal1 enailjs-com save

const contactUs = () => {
  const sendEmail = (e) => {
      
  };

  return (
    <div className="container-emailjs">
      <form onSubmit={sendEmail}>
        <div className="form-input-emailjs">
          <div className="form-name-emailjs">
            <input type="text" placeholder="Your Name" />
          </div>
          <div className="form-email-emailjs">
            <input type="text" placeholder="Email Address" />
          </div>
          <div className="form-subject-emailjs">
            <input type="text" placeholder="Subject" />
          </div>
          <div className="form-textarea-emailjs">
            <input type="text" placeholder="Your Message" />
          </div>
          <div className="form-submit-emailjs">
            <input type="Submit" value="Send Email" />
          </div>
        </div>
      </form>
    </div>
  );
};
