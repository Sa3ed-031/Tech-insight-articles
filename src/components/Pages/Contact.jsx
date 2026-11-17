import { useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

import { AUTHOR_EMAIL, GITHUB_URL, LINKEDIN_URL } from "./authorLinks";
import pageStyles from "./Page.module.css";
import styles from "./Contact.module.css";

const EMPTY_FORM = { name: "", email: "", message: "" };
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate({ name, email, message }) {
  const errors = {};
  if (name.trim().length < 2) {
    errors.name = "Please enter your name (at least 2 characters).";
  }
  if (!EMAIL_PATTERN.test(email.trim())) {
    errors.email = "Please enter a valid email address.";
  }
  if (message.trim().length < 10) {
    errors.message = "Please write a message (at least 10 characters).";
  }
  return errors;
}

// No backend: the filled form opens the visitor's email app
function buildMailto({ name, email, message }) {
  const subject = `Tech Insight: message from ${name.trim()}`;
  const body = `${message.trim()}\n\n${name.trim()} (${email.trim()})`;
  return `mailto:${AUTHOR_EMAIL}?subject=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(body)}`;
}

// If the address has to wrap, break it after the "@", not mid-word
const [EMAIL_USER, EMAIL_DOMAIN] = AUTHOR_EMAIL.split("@");
const wrappableEmail = (
  <>
    {EMAIL_USER}@<wbr />
    {EMAIL_DOMAIN}
  </>
);

export default function Contact() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  // Only show live validation after the first submit attempt
  const [submitted, setSubmitted] = useState(false);
  const [sentName, setSentName] = useState("");

  const handleChange = (e) => {
    const next = { ...form, [e.target.name]: e.target.value };
    setForm(next);
    if (submitted) setErrors(validate(next));
    setSentName("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nextErrors = validate(form);
    setErrors(nextErrors);
    setSubmitted(true);

    const firstInvalid = Object.keys(nextErrors)[0];
    if (firstInvalid) {
      e.currentTarget.elements[firstInvalid].focus();
      return;
    }

    window.location.href = buildMailto(form);
    setSentName(form.name.trim());
    setForm(EMPTY_FORM);
    setSubmitted(false);
  };

  // Props shared by the three fields: value, error state and error message link
  const fieldProps = (name) => ({
    id: `contact-${name}`,
    name,
    value: form[name],
    onChange: handleChange,
    "aria-invalid": Boolean(errors[name]),
    "aria-describedby": errors[name] ? `contact-${name}-error` : undefined,
    className: `${styles.input} ${errors[name] ? styles.invalid : ""}`,
  });

  const errorFor = (name) =>
    errors[name] && (
      <p id={`contact-${name}-error`} className={styles.error}>
        {errors[name]}
      </p>
    );

  return (
    <main className={pageStyles.page}>
      <div className={pageStyles.container}>
        <header className={pageStyles.header}>
          <p className={pageStyles.eyebrow}>Contact</p>
          <h1 className={pageStyles.title}>Get in touch</h1>
          <p className={pageStyles.lead}>
            Have a question, feedback or an idea for Tech Insight? Send a
            message and I'll get back to you.
          </p>
        </header>

        <div className={styles.layout}>
          <section
            className={pageStyles.card}
            aria-labelledby="contact-form-title"
          >
            <h2 id="contact-form-title" className={pageStyles.cardTitle}>
              <SendIcon className={pageStyles.cardIcon} />
              Send a message
            </h2>

            {sentName && (
              <p className={styles.success} role="status">
                <CheckCircleOutlineIcon fontSize="small" />
                <span>
                  Thanks, {sentName}! Your email app should open with your
                  message ready to send. If it didn't, email me directly at{" "}
                  <a
                    className={pageStyles.link}
                    href={`mailto:${AUTHOR_EMAIL}`}
                  >
                    {wrappableEmail}
                  </a>
                  .
                </span>
              </p>
            )}

            <form className={styles.form} onSubmit={handleSubmit} noValidate>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="contact-name">
                  Name
                </label>
                <input
                  type="text"
                  autoComplete="name"
                  placeholder="Your name"
                  {...fieldProps("name")}
                />
                {errorFor("name")}
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="contact-email">
                  Email
                </label>
                <input
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  {...fieldProps("email")}
                />
                {errorFor("email")}
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="contact-message">
                  Message
                </label>
                <textarea
                  rows={6}
                  placeholder="Write your message..."
                  {...fieldProps("message")}
                />
                {errorFor("message")}
              </div>

              <button
                type="submit"
                className={`${pageStyles.button} ${styles.submit}`}
              >
                <SendIcon fontSize="small" />
                Send message
              </button>
            </form>
          </section>

          <section
            className={pageStyles.card}
            aria-labelledby="contact-direct-title"
          >
            <h2 id="contact-direct-title" className={pageStyles.cardTitle}>
              <EmailOutlinedIcon className={pageStyles.cardIcon} />
              Or reach out directly
            </h2>
            <p className={pageStyles.text}>
              Prefer your own email app or social media? Use one of these.
            </p>
            <ul className={styles.direct}>
              <li>
                <a
                  className={pageStyles.social}
                  href={`mailto:${AUTHOR_EMAIL}`}
                >
                  <EmailOutlinedIcon fontSize="small" />
                  {wrappableEmail}
                </a>
              </li>
              <li>
                <a
                  className={pageStyles.social}
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <LinkedInIcon fontSize="small" />
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  className={pageStyles.social}
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GitHubIcon fontSize="small" />
                  GitHub
                </a>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
}
