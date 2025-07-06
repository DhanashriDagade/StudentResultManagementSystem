import React, { useEffect, useState } from "react";
import { Form, Button, Card, Alert, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AssignResultPage() {
  const [form, setForm] = useState({
    studentId: "",
    subjectId: "",
    marks: "",
    grade: "",
  });

  const [students, setStudents] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [apiError, setApiError] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  useEffect(() => {
    if (role !== "Teacher") {
      navigate("/unauthorized");
    } else {
      fetchStudents();
      fetchSubjects();
    }
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await axios.get("https://localhost:7294/api/teacher/students", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStudents(res.data);
    } catch {
      setApiError("Failed to load students.");
    }
  };

  const fetchSubjects = async () => {
    try {
      const res = await axios.get("https://localhost:7294/api/subject", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSubjects(res.data);
    } catch {
      setApiError("Failed to load subjects.");
    }
  };

  const validate = () => {
    const errs = {};
    if (!form.studentId) errs.studentId = "Student is required";
    if (!form.subjectId) errs.subjectId = "Subject is required";
    if (form.marks === "" || form.marks < 0 || form.marks > 100)
      errs.marks = "Marks must be between 0 and 100";
    if (!form.grade || form.grade.length > 2)
      errs.grade = "Grade is required (max 2 characters)";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");
    setSuccess("");

    if (!validate()) return;

    try {
      await axios.post(
        "https://localhost:7294/api/teacher/assign-result",
        form,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setSuccess("Result assigned successfully!");
      setForm({ studentId: "", subjectId: "", marks: "", grade: "" });
    } catch (err) {
      console.error(err);
      setApiError("Failed to assign result.");
    }
  };

  return (
    <Card className="p-4 shadow">
      <h3 className="mb-4 text-success">Assign Result</h3>
      {success && <Alert variant="success">{success}</Alert>}
      {apiError && <Alert variant="danger">{apiError}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Student</Form.Label>
              <Form.Select
                value={form.studentId}
                onChange={(e) => setForm({ ...form, studentId: e.target.value })}
                isInvalid={!!errors.studentId}
              >
                <option value="">Select Student</option>
                {students.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.firstName} {s.lastName} (Roll: {s.rollNumber})
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">{errors.studentId}</Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Subject</Form.Label>
              <Form.Select
                value={form.subjectId}
                onChange={(e) => setForm({ ...form, subjectId: e.target.value })}
                isInvalid={!!errors.subjectId}
              >
                <option value="">Select Subject</option>
                {subjects.map((sub) => (
                  <option key={sub.id} value={sub.id}>
                    {sub.name} ({sub.code})
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">{errors.subjectId}</Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Marks</Form.Label>
              <Form.Control
                type="number"
                value={form.marks}
                onChange={(e) => setForm({ ...form, marks: e.target.value })}
                isInvalid={!!errors.marks}
              />
              <Form.Control.Feedback type="invalid">{errors.marks}</Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Grade</Form.Label>
              <Form.Control
                type="text"
                value={form.grade}
                onChange={(e) => setForm({ ...form, grade: e.target.value })}
                isInvalid={!!errors.grade}
              />
              <Form.Control.Feedback type="invalid">{errors.grade}</Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Button type="submit" variant="success">Submit</Button>
      </Form>
    </Card>
  );
}
