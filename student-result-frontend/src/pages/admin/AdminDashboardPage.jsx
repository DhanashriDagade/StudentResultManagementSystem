import React, { useEffect, useState } from "react";
import { Card, Col, Row, Spinner } from "react-bootstrap";
import { PeopleFill, PersonBadgeFill, BookFill, ClipboardData,} from "react-bootstrap-icons";
import axios from "axios";

export default function AdminDashboardPage() {
  const [counts, setCounts] = useState({
    students: 0,
    teachers: 0,
    subjects: 0,
    results: 0,
  });
  const [loading, setLoading] = useState(true);

  const fetchCounts = async () => {
    try {
      const token = localStorage.getItem("token");

      const [studentsRes, teachersRes, subjectsRes, resultsRes] = await Promise.all([
        axios.get("https://localhost:7294/api/student", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get("https://localhost:7294/api/teacher", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get("https://localhost:7294/api/subject", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get("https://localhost:7294/api/result", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      setCounts({
        students: studentsRes.data.length,
        teachers: teachersRes.data.length,
        subjects: subjectsRes.data.length,
        results: resultsRes.data.length,
      });
    } catch (err) {
      console.error("Failed to fetch counts", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCounts();
  }, []);

  return (
    <div className="p-4">
      <h3 className="mb-4 text-dark">Admin Dashboard</h3>

      {loading ? (
        <Spinner animation="border" variant="primary" />
      ) : (
        <Row className="g-4">
          <Col md={6} lg={3}>
            <Card bg="primary" text="white" className="shadow">
              <Card.Body className="d-flex justify-content-between align-items-center">
                <div>
                  <Card.Title>Total Students</Card.Title>
                  <h4>{counts.students}</h4>
                </div>
                <PeopleFill size={40} />
              </Card.Body>
            </Card>
          </Col>

          <Col md={6} lg={3}>
            <Card bg="success" text="white" className="shadow">
              <Card.Body className="d-flex justify-content-between align-items-center">
                <div>
                  <Card.Title>Total Teachers</Card.Title>
                  <h4>{counts.teachers}</h4>
                </div>
                <PersonBadgeFill size={40} />
              </Card.Body>
            </Card>
          </Col>

          <Col md={6} lg={3}>
            <Card bg="warning" text="dark" className="shadow">
              <Card.Body className="d-flex justify-content-between align-items-center">
                <div>
                  <Card.Title>Total Subjects</Card.Title>
                  <h4>{counts.subjects}</h4>
                </div>
                <BookFill size={40} />
              </Card.Body>
            </Card>
          </Col>

          <Col md={6} lg={3}>
            <Card bg="danger" text="white" className="shadow">
              <Card.Body className="d-flex justify-content-between align-items-center">
                <div>
                  <Card.Title>Total Results</Card.Title>
                  <h4>{counts.results}</h4>
                </div>
                <ClipboardData size={40} />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </div>
  );
}
