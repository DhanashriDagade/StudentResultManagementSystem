import React from "react";
import { Nav } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import {
  Speedometer,
  ClipboardData,
} from "react-bootstrap-icons";

export default function StudentSidebar() {
  const location = useLocation();

  const navItems = [
    { to: "/student/dashboard", label: "Dashboard", icon: <Speedometer className="me-2" /> },
    { to: "/student/view-results", label: "My Results", icon: <ClipboardData className="me-2" /> },
      { to: "/student/result-summary", label: "Result summary", icon: <Speedometer className="me-2" /> },
   
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
