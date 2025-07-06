import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Alert,
  Spinner,
  Toast,
  ToastContainer,
} from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ViewAndEditResultsPage() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editResult, setEditResult] = useState(null);
  const [error, setError] = useState("");
  const [toast, setToast] = useState({ show: false, message: "", variant: "" });
  const [validationErrors, setValidationErrors] = useState({});
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  useEffect(() => {
    if (role !== "Teacher") {
      navigate("/unauthorized");
    } else {
      fetchAllResults();
    }
  }, [navigate, role]);

  const fetchAllResults = async () => {
    try {
      const res = await axios.get("https://localhost:7294/api/teacher/results", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setResults(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load data.");
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (result) => {
    setValidationErrors({});
    setEditResult({ ...result });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditResult({ ...editResult, [name]: value });
  };

  const validateEditForm = () => {
    const errs = {};
    if (editResult.marks < 0 || editResult.marks > 100) {
      errs.marks = "Marks must be between 0 and 100.";
    }
    if (!editResult.grade || editResult.grade.length > 2) {
      errs.grade = "Grade is required (max 2 characters).";
    }
    setValidationErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleUpdate = async () => {
    if (!validateEditForm()) return;

    try {
      await axios.put(
        `https://localhost:7294/api/teacher/result/${editResult.id}`,
        {
          id: editResult.id,
          studentId: editResult.studentId,
          subjectId: editResult.subjectId,
          marks: editResult.marks,
          grade: editResult.grade,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setToast({ show: true, message: "Result updated successfully.", variant: "success" });
      setEditResult(null);
      fetchAllResults();
    } catch (err) {
      console.error(err);
      setToast({ show: true, message: "Update failed.", variant: "danger" });
    }
  };

  if (loading) return <Spinner animation="border" className="mt-4" />;

  return (
    <div className="p-4 shadow bg-white rounded">
      <h3 className="mb-3 text-primary">Manage Results</h3>

      {error && <Alert variant="danger">{error}</Alert>}

      <Table bordered hover responsive>
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Student</th>
            <th>Subject</th>
            <th>Marks</th>
            <th>Grade</th>
            <th>Created</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {results.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-center">No results found.</td>
            </tr>
          ) : (
            results.map((r, i) => (
              <tr key={r.id}>
                <td>{i + 1}</td>
                <td>{r.student ? `${r.student.firstName} ${r.student.lastName}` : "N/A"}</td>
                <td>{r.subject ? `${r.subject.name} (${r.subject.code})` : "N/A"}</td>
                <td>{r.marks}</td>
                <td>{r.grade}</td>
                <td>{new Date(r.createdAt).toLocaleDateString()}</td>
                <td>
                  <Button size="sm" variant="warning" onClick={() => handleEditClick(r)}>
                    Edit
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>

      {/* Edit Modal */}
      <Modal show={!!editResult} onHide={() => setEditResult(null)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Result</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editResult && (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Marks</Form.Label>
                <Form.Control
                  type="number"
                  name="marks"
                  value={editResult.marks}
                  onChange={handleEditChange}
                  isInvalid={!!validationErrors.marks}
                />
                <Form.Control.Feedback type="invalid">
                  {validationErrors.marks}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Grade</Form.Label>
                <Form.Control
                  type="text"
                  name="grade"
                  value={editResult.grade}
                  onChange={handleEditChange}
                  isInvalid={!!validationErrors.grade}
                />
                <Form.Control.Feedback type="invalid">
                  {validationErrors.grade}
                </Form.Control.Feedback>
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setEditResult(null)}>Cancel</Button>
          <Button variant="primary" onClick={handleUpdate}>Update</Button>
        </Modal.Footer>
      </Modal>

      {/* Toast Notification */}
      <ToastContainer position="bottom-end" className="p-3">
        <Toast
          bg={toast.variant}
          onClose={() => setToast({ ...toast, show: false })}
          show={toast.show}
          delay={3000}
          autohide
        >
          <Toast.Body className="text-white">{toast.message}</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
}
