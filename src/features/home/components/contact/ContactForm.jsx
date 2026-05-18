import React, { useRef } from "react";
import emailjs from "emailjs-com";
import { TextField, Button, Container, Box } from "@mui/material";
import { contactFormContainerSx, contactFormSx } from "../../styles/contactStyles";

const ContactForm = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_tuzj8o8",
        "template_2t3vmyq",
        form.current,
        "zMnzBWSWnWqVVBdTV"
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
    <Container maxWidth="md" sx={contactFormContainerSx}>
      <Box component="form" ref={form} onSubmit={sendEmail} sx={contactFormSx}>
        <TextField name="name" label="Your Name" required fullWidth />
        <TextField name="email" label="Your Email" required fullWidth />
        <TextField
          name="message"
          label="Your Message"
          multiline
          rows={8}
          required
          fullWidth
        />
        <Button variant="contained" type="submit" color="primary">
          Send Message
        </Button>
      </Box>
    </Container>
  );
};

export default ContactForm;