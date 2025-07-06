import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaHome,
  FaInfoCircle,
  FaPhone,
  FaUserShield,
  FaChalkboardTeacher,
  FaUserGraduate,
  FaUniversity,
} from "react-icons/fa";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <nav
      className="navbar navbar-expand-lg px-4"
      style={{
        background: "linear-gradient(45deg, #1b2a4e,rgb(138, 17, 130))",
        padding: "12px 24px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
      }}
    >
      <h3 className="navbar-brand d-flex align-items-center text-light m-0">
        <FaUniversity className="me-2 text-warning" /> EduSphere
      </h3>

      <div className="ms-auto d-flex align-items-center gap-2">
        <button
          className="btn btn-outline-light"
          title="Home"
          onClick={() => navigate("/")}
        >
          <FaHome size={20} />
        </button>

        <button
          className="btn btn-outline-light"
          title="About"
          onClick={() => navigate("/about")}
        >
          <FaInfoCircle size={20} />
        </button>

        <button
          className="btn btn-outline-light"
          title="Contact"
          onClick={() => navigate("/contact")}
        >
          <FaPhone size={20} />
        </button>

        <button
            className="btn btn-outline-light"
          title="Admin Login"
          onClick={() => navigate("/login")}
        >
          <FaUserShield size={20} />
        </button>

        <button
            className="btn btn-outline-light"
          title="Teacher Login"
          onClick={() => navigate("/login")}
        >
          <FaChalkboardTeacher size={20} />
        </button>

        <button
            className="btn btn-outline-light"
          title="Student Login"
          onClick={() => navigate("/login")}
        >
          <FaUserGraduate size={20} />
        </button>
      </div>
    </nav>
  );
}
