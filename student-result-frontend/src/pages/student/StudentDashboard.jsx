import React, { useEffect } from "react";
import { Card, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function StudentDashboard() {
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  useEffect(() => {
    if (role !== "Student") {
      navigate("/unauthorized");
    }
  }, []);

  return (
    <div className="p-4">
      <h2 className="mb-4 text-primary">Welcome to Student Dashboard</h2>
      <Row>
        <Col md={6}>
          <Card className="mb-4 shadow-sm border-0">
            <Card.Body>
              <Card.Title className="text-dark">My Results</Card.Title>
              <Card.Text>
                View all your academic results by subject including marks and grade.
              </Card.Text>
              <button
                className="btn btn-outline-success"
                onClick={() => navigate("/student/results")}
              >
                View Results
              </button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="mb-4 shadow-sm border-0">
            <Card.Body>
              <Card.Title className="text-info text-dark">Profile</Card.Title>
              <Card.Text>
                View your student profile information .
              </Card.Text>
              <button
                className="btn btn-outline-success"
                onClick={() => navigate("/student/profile")}
              >
                View Profile
              </button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
