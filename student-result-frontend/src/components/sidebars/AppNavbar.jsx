import React from "react";
import { Navbar, Container, Button } from "react-bootstrap";
import { PersonCircle, List } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { handleLogout } from "../../utils/auth";

export default function AppNavbar({ onToggleSidebar }) {
  const navigate = useNavigate();

  const firstName = localStorage.getItem("firstName") || "User";
  const lastName = localStorage.getItem("lastName") || "";
  const role = localStorage.getItem("role") || "";

  return (
    <Navbar
      expand="lg"
      fixed="top"
      className="px-4 shadow-sm"
      style={{
        zIndex: 1060,
        background: "linear-gradient(45deg, #1b2a4e,rgb(138, 17, 130))",
      }}
    >
      <Container fluid className="d-flex justify-content-between align-items-center text-light">
        <div className="d-flex align-items-center">
          <Button
            variant="outline-light"
            className="me-3"
            onClick={onToggleSidebar}
            aria-label="Toggle Sidebar"
            style={{
              borderColor: "#ffc107",
              color: "#fff",
            }}
          >
            <List size={24} />
          </Button>
          <Navbar.Brand className="d-flex align-items-center mb-0 text-light fw-semibold">
            <PersonCircle size={26} className="me-2 text-warning" />
            {firstName} {lastName}
            {role && (
              <span className="ms-2 text-warning fw-semibold">({role})</span>
            )}
          </Navbar.Brand>
        </div>

        <Button
          variant="outline-light"
          onClick={() => handleLogout(navigate)}
          style={{
            borderColor: "#ffc107",
            color: "#fff",
          }}
        >
          Logout
        </Button>
      </Container>
    </Navbar>
  );
}
