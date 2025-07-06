import React from "react";
import { Nav } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import {
  Speedometer,
  ClipboardPlus,
  PencilSquare,
  ClipboardData,
  Person,
} from "react-bootstrap-icons";

export default function TeacherSidebar() {
  const location = useLocation();

  const navItems = [
    { to: "/teacher/dashboard", label: "Dashboard", icon: <Speedometer className="me-2" /> },
    { to: "/teacher/assign-result", label: "Assign Result", icon: <ClipboardPlus className="me-2" /> },
    { to: "/teacher/view-results", label: "View/Update Result", icon: <PencilSquare className="me-2" /> },
   
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
