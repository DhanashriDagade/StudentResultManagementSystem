import React from "react";
import {
  FaUniversity,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaClock,
  FaLink,
  FaUsers,
  FaBook,
  FaHome,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer style={{ background: "linear-gradient(45deg, #1b2a4e,rgb(138, 17, 130))", }} className="text-light pt-5 pb-4">
      <div className="container">
        <div className="row">

          {/* About */}
          <div className="col-md-4 mb-4">
            <h5 className="text-light mb-3">
              <FaUniversity className="me-2 text-warning" /> About EduSphere
            </h5>
            <p>
              EduSphere College is committed to offering transparent result systems,
              empowering students and staff with accurate performance data.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-4 mb-4">
            <h5 className="text-light mb-3">
              <FaLink className="me-2 text-warning" /> Quick Links
            </h5>
            <ul className="list-unstyled">
              <li>
                <a href="/" className="text-light text-decoration-none">
                  <FaHome className="me-2" /> Home
                </a>
              </li>
              <li>
                <a href="/about" className="text-light text-decoration-none">
                  <FaUsers className="me-2" /> About Us
                </a>
              </li>
              <li>
                <a href="#academics" className="text-light text-decoration-none">
                  <FaBook className="me-2" /> Academics
                </a>
              </li>
              <li>
                <a href="/contact" className="text-light text-decoration-none">
                  <FaPhone className="me-2" /> Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-md-4 mb-4">
            <h5 className="text-light mb-3">
              <FaMapMarkerAlt className="me-2 text-warning" /> Contact
            </h5>
            <p><FaMapMarkerAlt className="me-2" /> Pune, Maharashtra</p>
            <p><FaPhone className="me-2" /> +91-9876543210</p>
            <p><FaEnvelope className="me-2" /> contact@edusphere.com</p>
          </div>
        </div>

        <div className="row border-top pt-3 mt-3 border-light-subtle">
          <div className="col-md-6">
            <p><FaClock className="me-2" /><strong>College Hours:</strong> Mon–Fri: 9 AM–4 PM</p>
          </div>
          <div className="col-md-6 text-md-end">
            <p><FaClock className="me-2" /><strong>Office Hours:</strong> Mon–Sat: 10 AM–5 PM</p>
          </div>
        </div>

        <div className="text-center mt-3  ">
          <p className="mb-0 text-muted " >&copy; 2025 EduSphere All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
