import React, { useState, useEffect } from "react";
import { Form, Button, Card, Alert, Spinner } from "react-bootstrap";
import axios from "axios";

export default function AddSubjectPage() {
  const [form, setForm] = useState({
    name: "",
    class: "",
    code: "",
    teacherId: ""
  });

  const [teachers, setTeachers] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  const fetchTeachers = async () => {
    try {
      const res = await axios.get("https://localhost:7294/api/teacher", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTeachers(res.data);
    } catch {
      setError("Failed to load teachers.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");

    if (!form.name || !form.class || !form.code || !form.teacherId) {
      setError("All fields are required.");
      return;
    }

    try {
      await axios.post("https://localhost:7294/api/subject", form, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setSuccess("Subject created successfully.");
      setForm({ name: "", class: "", code: "", teacherId: "" });
    } catch (err) {
      setError("Failed to create subject.");
    }
  };

  return (
    <Card className="p-4 shadow">
      <h3 className="mb-3 text-dark">Add New Subject</h3>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      {loading ? (
        <Spinner animation="border" />
      ) : (
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Subject Name</Form.Label>
            <Form.Control
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="e.g. Mathematics"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Class</Form.Label>
            <Form.Control
              value={form.class}
              onChange={(e) => setForm({ ...form, class: e.target.value })}
              placeholder="e.g. 10A"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Subject Code</Form.Label>
            <Form.Control
              value={form.code}
              onChange={(e) => setForm({ ...form, code: e.target.value })}
              placeholder="e.g. MATH101"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Assign Teacher</Form.Label>
            <Form.Select
              value={form.teacherId}
              onChange={(e) => setForm({ ...form, teacherId: e.target.value })}
            >
              <option value="">-- Select Teacher --</option>
              {teachers.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.firstName} {t.lastName}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Button type="submit" variant="primary">
            Add Subject
          </Button>
        </Form>
      )}
    </Card>
  );
}
