import React from "react";
import { Icon } from "semantic-ui-react";

const GetInTouch = () => {
  return (
    <div>
      <div className="container contact-section">
        <h1 class="Contact-section-h1 text-center">
          <span>Get in touch</span>
        </h1>
        <div class="wrapper">
          <div class="company-info">
            <h2>Friendly and expert customer service</h2>
            <p>
              Pensions can be confusing. Our friendly team of experts will
              answer any question you have, and we promise no jargon.
              <br />
              <br />
              No waiting lines, no call centers. Just drop us a message, email
              us or give us a call any time.
            </p>

            <span className="contact-info">
              <Icon className="contact-icon" name="phone" />
              &nbsp; +254 (0)722 206 900
            </span>
            <br />
            <br />
            <a href="mailto:customerservice@sanlam.co.ke">
              <span className="contact-info">
                <Icon className="contact-icon" name="mail" />
                &nbsp;info@pensionplus.co.ke
              </span>
            </a>
            <br />
            <br />
            <a href="#">
              <span className="contact-info">
                <Icon
                  className="contact-icon"
                  name="comment alternate outline"
                />
                &nbsp;Chat
              </span>
            </a>
            <br />
          </div>
          <div class="contact">
            <h3>Talk to us</h3>

            <form id="contact-form">
              <label>Name</label>
              <input type="text" name="name" id="name" required />

              <label>E-mail Address</label>
              <input type="email" name="email" id="email" required />

              <label>Message</label>
              <textarea name="message" rows="5" id="message"></textarea>

              <label></label>
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetInTouch;
