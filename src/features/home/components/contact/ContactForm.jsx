import { useState } from "react";
import emailjs from "emailjs-com";
import { UrsusLoader } from "../../../brand/UrsusStatus";

export default function ContactForm() {
  const [state, setState] = useState("idle");

  const sendEmail = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    setState("loading");
    try {
      await emailjs.sendForm(
        "service_tuzj8o8",
        "template_2t3vmyq",
        form,
        "zMnzBWSWnWqVVBdTV"
      );
      form.reset();
      setState("sent");
    } catch {
      setState("error");
    }
  };

  return (
    <form className="u-card u-form" onSubmit={sendEmail}>
      <label>Your Name<input name="name" autoComplete="name" required /></label>
      <label>Your Email<input name="email" type="email" autoComplete="email" required /></label>
      <label>Your Message<textarea name="message" rows="5" required /></label>
      <button className="u-button u-primary" type="submit" disabled={state === "loading"}>Send Message</button>
      {state === "loading" && <p role="status" className="u-status u-muted"><UrsusLoader /> Sending message…</p>}
      {state === "sent" && <p role="status" className="u-muted">Message sent.</p>}
      {state === "error" && <p role="alert" className="u-error">Something went wrong. Please try again.</p>}
    </form>
  );
}
