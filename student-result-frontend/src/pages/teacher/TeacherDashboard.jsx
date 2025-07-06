import React, { useEffect, useState } from "react";
import { Card, Row, Col, Spinner } from "react-bootstrap";
import { PeopleFill, ClipboardData, CheckCircle, ClipboardPlus } from "react-bootstrap-icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function TeacherDashboard() {
  const [assignedCount, setAssignedCount] = useState(0);
  const [resultsSubmitted, setResultsSubmitted] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "Teacher") {
      navigate("/unauthorized");
    }

    fetchTeacherDashboardData();
  }, [navigate]);

  const fetchTeacherDashboardData = async () => {
    try {
      const token = localStorage.getItem("token");

      const resultRes = await axios.get("https://localhost:7294/api/teacher/results", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setResultsSubmitted(resultRes.data.length);
      setAssignedCount(resultRes.data.map(r => r.studentId).filter((v, i, a) => a.indexOf(v) === i).length);
    } catch (err) {
      console.error("Error loading teacher dashboard", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center"><Spinner animation="border" /></div>;

  return (
    <div className="p-4">
      <h3 className="mb-4 text-primary"> Teacher Dashboard</h3>
      <Row className="g-4">
        <Col md={4}>
          <Card className="shadow border-0">
            <Card.Body>
              <div className="d-flex align-items-center">
                <PeopleFill size={40} className="text-info me-3" />
                <div>
                  <h5 className="mb-1">Assigned Students</h5>
                  <h4>{assignedCount}</h4>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="shadow border-0">
            <Card.Body>
              <div className="d-flex align-items-center">
                <CheckCircle size={40} className="text-success me-3" />
                <div>
                  <h5 className="mb-1">Results Submitted</h5>
                  <h4>{resultsSubmitted}</h4>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="shadow border-0">
            <Card.Body>
              <div className="d-flex align-items-center">
                <ClipboardPlus size={40} className="text-warning me-3" />
                <div>
                  <h5 className="mb-1">Assign Results</h5>
                  <a href="/teacher/assign-result" className="text-decoration-none fw-bold">
                    Go to Assign
                  </a>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
