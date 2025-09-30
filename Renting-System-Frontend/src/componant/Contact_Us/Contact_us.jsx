import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import './contact_us.css';

export default function ContactUs() {
  const form = useRef();
  const [formData, setFormData] = useState({
    user_name: '',
    user_email: '',
    subject: '',
    phone: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_2jngxd8', 'template_o4tlve2', form.current, 'p-ZtlDjQS-z1zY4vq')
      .then((result) => {
          console.log('SUCCESS!', result.text);
          alert('Message sent successfully!');
      }, (error) => {
          console.log('FAILED...', error.text);
          alert('Failed to send message. Please try again later.');
      });
  };

  return (
    <div>
      <div className="img">
        <div className="contact_us_layer">
          <h2 className='text_Contact_us'>Contact Us</h2>
        </div>
      </div>

      <div className="contact_us_form">
        <form ref={form} className='contact_form' onSubmit={sendEmail}>
          <div className="names">
            <div className="l_name">
              <label htmlFor="user_name">Full Name</label>
              <input type="text" id="user_name" name="user_name" placeholder='Full Name' onChange={handleChange} />
            </div>
            <div className="l_name">
              <label htmlFor="user_email">E-mail</label>
              <input type="email" id="user_email" name="user_email" placeholder='Email' onChange={handleChange} />
            </div>
          </div>
          <div className="names_sub">
            <div className="l_name">
              <label htmlFor="subject">Subject</label>
              <input type="text" id="subject" name="subject" placeholder='Subject' onChange={handleChange} />
            </div>
            <div className="l_name">
              <label htmlFor="phone">Phone</label>
              <input className='tel' type="tel" id="phone" name="phone" placeholder='Phone' onChange={handleChange} />
            </div>
          </div>

          <div className="textarea">
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" placeholder='Write a message' onChange={handleChange}></textarea>
          </div>
          <div className="btn_submit">
            <button className='contact_us_submit' type='submit'>Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}
