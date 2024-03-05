import React, { useState, useRef } from "react";
// import axios from "axios";
import "./ContactForm.css";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const nameInputRef = useRef(null);
  const emailInputRef = useRef(null);
  const phoneInputRef = useRef(null);
  const messageInputRef = useRef(null);

  const handleInputFocus = (inputRef) => {
    if (inputRef.current) {
      inputRef.current.style.boxShadow = "0px 0px 5px #000";
    }
  };

  const handleInputBlur = (inputRef) => {
    if (inputRef.current) {
      inputRef.current.style.boxShadow = "none"; // Reset box shadow on blur
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    fetch("https://sheetdb.io/api/v1/u3pfnsx9afls0", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: [
          {
            Name: formData.name,
            Email: formData.email,
            Phone: formData.phone,
            Message: formData.message,
          },
        ],
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data));

    try {
      // Clear form fields after submission
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });

      alert("Form submitted successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error submitting form. Please try again later.");
    }

    alert("Form submitted successfully!");
  };

  return (
    <div className="contact-form">
      <h2>Contact Us</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name"></label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter your Name"
            ref={nameInputRef}
            onFocus={() => handleInputFocus(nameInputRef)}
            onBlur={() => handleInputBlur(nameInputRef)}
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          {/* <label htmlFor="email">Email:</label> */}
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            ref={emailInputRef}
            onFocus={() => handleInputFocus(emailInputRef)}
            onBlur={() => handleInputBlur(emailInputRef)}
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          {/* <label htmlFor="phone">Phone:</label> */}
          <input
            type="tel"
            id="phone"
            name="phone"
            placeholder="Phone"
            ref={phoneInputRef}
            onFocus={() => handleInputFocus(phoneInputRef)}
            onBlur={() => handleInputBlur(phoneInputRef)}
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          {/* <label htmlFor="message">Message:</label> */}
          <textarea
            id="message"
            name="message"
            placeholder="Enter your message"
            ref={messageInputRef}
            onFocus={() => handleInputFocus(messageInputRef)}
            onBlur={() => handleInputBlur(messageInputRef)}
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ContactForm;
