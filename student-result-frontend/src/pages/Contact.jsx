import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const contactImage =
  "https://assets-v2.lottiefiles.com/a/2a473874-116d-11ee-8f5d-5742a028c01a/x97QegXymC.gif";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState({ success: null, message: "" });

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const { name, email, message } = formData;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const nameRegex = /^[A-Za-z\s]+$/;

    if (!name || !email || !message) {
      return { valid: false, message: "All fields are required." };
    }

    if (!nameRegex.test(name)) {
      return { valid: false, message: "Name should contain only letters and spaces." };
    }

    if (!emailRegex.test(email)) {
      return { valid: false, message: "Please enter a valid email address." };
    }

    if (message.length < 10) {
      return { valid: false, message: "Message should be at least 10 characters long." };
    }

    return { valid: true, message: "" };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validation = validateForm();
    if (!validation.valid) {
      setStatus({ success: false, message: validation.message });
      return;
    }

    try {
       const response = await axios.post("https://localhost:7294/api/contact", formData);
      setStatus({ success: true, message: "Message sent successfully!" });
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      setStatus({ success: false, message: "Something went wrong. Please try again." });
    }
  };

  return (
    <>
      <Navbar />
      <div style={{ backgroundColor: "#f4f7ff", minHeight: "90vh", padding: "60px 0" }}>
        <Container>
          <Row className="align-items-center">
            <Col md={6} data-aos="fade-right">
              <h2 className="fw-bold mb-3 text-dark">Let's Get in Touch</h2>
              <p className="text-muted mb-4">
                Have a question, suggestion, or just want to say hello? Fill out the form below and
                our support team will get back to you shortly.
              </p>

              {status.message && (
                <Alert variant={status.success ? "success" : "danger"}>{status.message}</Alert>
              )}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="custom-input"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="custom-input"
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Control
                    as="textarea"
                    rows={4}
                    name="message"
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="custom-input"
                  />
                </Form.Group>

                <Button type="submit" variant="primary" className="px-4 py-2 fw-semibold">
                  Submit
                </Button>
              </Form>
            </Col>

            <Col md={6} className="text-center mt-5 mt-md-0" data-aos="fade-left">
              <img
                src={contactImage}
                alt="Contact Support Illustration"
                className="img-fluid"
                style={{ maxHeight: "400px" }}
              />
            </Col>
          </Row>
        </Container>
      </div>
      <Footer />

      <style jsx="true">{`
        .custom-input {
          padding: 12px 16px;
          border-radius: 8px;
          border: 1px solid #ccc;
          transition: border-color 0.3s, box-shadow 0.3s;
        }

        .custom-input:focus {
          border-color: #007bff;
          box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
        }

        button.btn-primary {
          background-color: #2a5298;
          border: none;
          transition: background-color 0.3s;
        }

        button.btn-primary:hover {
          background-color: #1e3c72;
        }
      `}</style>
    </>
  );
}
