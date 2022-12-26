import { useState } from "react";
import { toast } from "react-toastify";
import styles from "./styles.module.scss";

const NewsletterRegistration = () => {
  const [emailValue, setEmailValue] = useState({ email: "" });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmailValue({ email: event.target.value });
  };
  const registrationHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailValue),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.email) {
          toast.success("Success!");
        } else {
          toast.error("Invalid email.");
        }
      });

    setEmailValue({ email: "" });
  };

  return (
    <section className={styles.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={styles.control}>
          <input
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
            value={emailValue.email}
            onChange={handleChange}
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
};

export default NewsletterRegistration;
