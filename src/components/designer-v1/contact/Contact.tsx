"use client";

import { useState } from "react";
import { useParams } from "next/navigation";

import styles from "@/components/designer-v1/contact/Contact.module.css";
import type { Designer } from "@/types/designer";

type FormProps = {
  data: Designer["data"]["contact"];
};

const Contact = ({ data }: FormProps) => {
  const { slug } = useParams<{ slug: string }>();

  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!slug) {
      setErrorMessage("Invalid portfolio.");
      return;
    }

    setLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          slug,
          ...form,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Unable to send message.");
      }

      setSuccess(true);

      setForm({
        name: "",
        email: "",
        mobile: "",
      });
    } catch (error) {
      console.error(error);

      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={styles.contactContainer} id={data.id}>
      <div
        className={styles.formContainer}
        style={{
          backgroundImage: `url(${data.image})`,
        }}
      >
        <div className={styles.overlay} />

        <div className={styles.formGroupContainer}>
          <div className={styles.content}>
            {!success ? (
              <>
                <h2 className={styles.title}>{data.title}</h2>

                <p className={styles.description}>
                  {data.description}
                </p>

                <form className={styles.form} onSubmit={submit}>
                  <div className={styles.inputGroup}>
                    <label htmlFor="name">{data.form.name.label}</label>

                    <div className={styles.inputWrapper}>
                      <img
                        src={data.form.name.iconImage}
                        alt=""
                        className={styles.inputIcon}
                      />

                      <input
                        id="name"
                        type="text"
                        value={form.name}
                        placeholder={data.form.name.placeholder}
                        required={data.form.name.required}
                        onChange={(e) =>
                          setForm((prev) => ({
                            ...prev,
                            name: e.target.value,
                          }))
                        }
                      />
                    </div>
                  </div>

                  <div className={styles.inputGroup}>
                    <label htmlFor="mobile">{data.form.mobile.label}</label>

                    <div className={styles.inputWrapper}>
                      <img
                        src={data.form.mobile.iconImage}
                        alt=""
                        className={styles.inputIcon}
                      />

                      <input
                        id="mobile"
                        type="tel"
                        value={form.mobile}
                        placeholder={data.form.mobile.placeholder}
                        required={data.form.mobile.required}
                        onChange={(e) =>
                          setForm((prev) => ({
                            ...prev,
                            mobile: e.target.value,
                          }))
                        }
                      />
                    </div>
                  </div>

                  <div className={styles.inputGroup}>
                    <label htmlFor="email">{data.form.email.label}</label>

                    <div className={styles.inputWrapper}>
                      <img
                        src={data.form.email.iconImage}
                        alt=""
                        className={styles.inputIcon}
                      />

                      <input
                        id="email"
                        type="email"
                        value={form.email}
                        placeholder={data.form.email.placeholder}
                        required={data.form.email.required}
                        onChange={(e) =>
                          setForm((prev) => ({
                            ...prev,
                            email: e.target.value,
                          }))
                        }
                      />
                    </div>
                  </div>

                  {errorMessage && (
                    <p className={styles.error}>
                      {errorMessage}
                    </p>
                  )}

                  <button
                    className={styles.submitButton}
                    type="submit"
                    disabled={loading}
                  >
                    {loading
                      ? "Sending..."
                      : data.form.submitButton.text}
                  </button>
                </form>
              </>
            ) : (
              <div className={styles.success}>
                <div className={styles.successIcon}>
                  ✓
                </div>

                <h3>Thank You!</h3>

                <p>
                  Your enquiry has been received successfully.
                  <br />
                  We'll get back to you shortly.
                </p>

                <button
                  className={styles.submitButton}
                  onClick={() => setSuccess(false)}
                >
                  Send Another Message
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;