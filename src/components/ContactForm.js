import React, { useRef } from "react";
import emailjs from "emailjs-com";
import { TextField, Button } from "@mui/material";

const ContactForm = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_tuzj8o8",     // from EmailJS dashboard
        "template_2t3vmyq",    // from EmailJS dashboard
        form.current,
        "zMnzBWSWnWqVVBdTV"      // from EmailJS dashboard
      )
      .then(
        (result) => {
          console.log(result.text);
          e.target.reset();
        },
        (error) => {
          console.log(error.text);
          alert("Something went wrong. Please try again.");
        }
      );
  };

  return (
    <form
      ref={form}
      onSubmit={sendEmail}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
        width: "100%",
        margin: "auto",
        padding: "1rem",
      }}
    >
      <TextField
        name="name"
        label="Your Name"
        required
        fullWidth
      />
      <TextField
        name="email"
        label="Your Email"
        required
        fullWidth
      />
      <TextField
        name="message"
        label="Your Message"
        multiline
        rows={8}
        required
        fullWidth
      />
      <Button
        variant="contained"
        type="submit"
        color="primary"
      >
        Send Message
      </Button>
    </form>
  );
};

export default ContactForm;
