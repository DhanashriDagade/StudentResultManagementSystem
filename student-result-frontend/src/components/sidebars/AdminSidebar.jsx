import React from "react";
import { Nav } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import {
  Speedometer2,
  PersonPlus,
  People,
  Book,
  ClipboardData,
} from "react-bootstrap-icons";

export default function AdminSidebar() {
  const location = useLocation();

  const navItems = [
    { to: "/admin/dashboard", label: "Dashboard", icon: <Speedometer2 className="me-2" /> },

    // Students
    { to: "/admin/register-student", label: "Register Student", icon: <PersonPlus className="me-2" /> },
    { to: "/admin/view-students", label: "View Students", icon: <People className="me-2" /> },

    // Teachers
    { to: "/admin/register-teacher", label: "Register Teacher", icon: <PersonPlus className="me-2" /> },
    { to: "/admin/view-teachers", label: "View Teachers", icon: <People className="me-2" /> },

    // Subjects
    { to: "/admin/add-subject", label: "Add Subject", icon: <Book className="me-2" /> },
    { to: "/admin/view-subjects", label: "View Subjects", icon: <Book className="me-2" /> },

    // Results
    { to: "/admin/view-results", label: "All Results", icon: <ClipboardData className="me-2" /> },
  ];

  return (
    <Nav className="flex-column p-3">
      {navItems.map((item, idx) => (
        <Nav.Link
          key={idx}
          as={Link}
          to={item.to}
          className={`d-flex align-items-center py-2 px-3 rounded sidebar-link ${
            location.pathname === item.to ? "active-link" : ""
          }`}
        style={{ color: "white" }}>
          {item.icon}
          {item.label}
        </Nav.Link>
      ))}
    </Nav>
  );
}
