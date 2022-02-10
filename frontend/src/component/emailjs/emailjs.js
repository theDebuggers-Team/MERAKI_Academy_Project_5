import emailjs from "emailjs-com";
import React from "react";
// np instal1 enailjs-com save

const ContactUs = () => {
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('gmail', 'template_fvhdmki',e.target, 'user_Rx3I0704PL1aG8AASNv5Y')
      .then((result) => {
          console.log(result.text);
          toast.success("your email is sent", {
            position: toast.POSITION.TOP_RIGHT,
          });
      }, (error) => {
          console.log(error.text);
      });

      e.target.reset()
  };

  return (
    <div className="container-emailjs">
      <form onSubmit={sendEmail}>
        <div className="form-input-emailjs">
          <div className="form-name-emailjs">
            <input type="text" placeholder="Your Name" name="name" />
          </div>
          <div className="form-email-emailjs">
            <input type="text" placeholder="Email Address" name="email"/>
          </div>
          <div className="form-subject-emailjs">
            <input type="text" placeholder="Subject" name="subject" />
          </div>
          <div className="form-textarea-emailjs">
            <input type="text" placeholder="Your Message" name="message"/>
          </div>
          <div className="form-submit-emailjs">
            <input type="Submit" value="Send Email" />
          </div>
        </div>
      </form>
    </div>
  );
};


export default ContactUs