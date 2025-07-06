import React, { useEffect, useState } from "react";
import { Container, Card, Spinner, Alert, Row, Col, Image } from "react-bootstrap";
import axios from "axios";

export default function StudentProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("https://localhost:7294/api/studentviewresult/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProfile(res.data);
      } catch (err) {
        setError(err.response?.data || "Failed to fetch profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token]);

  if (loading) return <div className="text-center mt-5"><Spinner animation="border" /></div>;
  if (error) return <Alert variant="danger" className="mt-4 text-center">{error}</Alert>;

  return (
    <Container className="mt-5">
      <Card className="p-4 shadow-sm">
        <Row className="align-items-center">
          <Col md={4} className="text-center mb-3 mb-md-0">
            <Image
              src="https://cdn-icons-png.flaticon.com/512/3135/3135768.png"
              roundedCircle
              width={120}
              height={120}
              alt="Student Avatar"
            />
          </Col>
          <Col md={8}>
            <h4 className="text-primary">Student Profile</h4>
            <hr />
            <p><strong>Full Name:</strong> {profile.firstName} {profile.lastName}</p>
            <p><strong>Roll Number:</strong> {profile.rollNumber}</p>
            <p><strong>Class:</strong> {profile.class}</p>
          </Col>
        </Row>
      </Card>
    </Container>
  );
}
