import React, { useEffect, useState } from "react";
import {
  Table,
  Alert,
  Spinner,
  Button,
  Modal,
  Form,
  ToastContainer,
  Toast,
} from "react-bootstrap";
import axios from "axios";

export default function ViewSubjects() {
  const [subjects, setSubjects] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ show: false, message: "", variant: "" });

  const token = localStorage.getItem("token");

  const [showEdit, setShowEdit] = useState(false);
  const [currentSubject, setCurrentSubject] = useState({
    id: "",
    name: "",
    class: "",
    code: "",
    teacherId: "",
  });

  const fetchSubjects = async () => {
    try {
      const res = await axios.get("https://localhost:7294/api/subject", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSubjects(res.data);
    } catch {
      setError("Failed to load subjects.");
    } finally {
      setLoading(false);
    }
  };

  const fetchTeachers = async () => {
    try {
      const res = await axios.get("https://localhost:7294/api/teacher", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTeachers(res.data);
    } catch {
      console.error("Failed to load teachers");
    }
  };

  useEffect(() => {
    fetchSubjects();
    fetchTeachers();
  }, []);

  const handleEditClick = (subject) => {
    setCurrentSubject(subject);
    setShowEdit(true);
  };

  const handleEditChange = (e) => {
    setCurrentSubject({ ...currentSubject, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    if (!currentSubject.name || !currentSubject.class || !currentSubject.code || !currentSubject.teacherId) {
      setToast({ show: true, message: "All fields are required.", variant: "warning" });
      return;
    }

    const updatedData = {
      name: currentSubject.name,
      class: currentSubject.class,
      code: currentSubject.code,
      teacherId: currentSubject.teacherId,
    };

    try {
      await axios.put(
        `https://localhost:7294/api/subject/${currentSubject.id}`,
        updatedData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setToast({ show: true, message: "Subject updated", variant: "success" });
      setShowEdit(false);
      fetchSubjects();
    } catch (err) {
      console.error("Update error:", err.response?.data || err.message);
      setToast({ show: true, message: "Update failed", variant: "danger" });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this subject?")) return;
    try {
      await axios.delete(`https://localhost:7294/api/subject/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setToast({ show: true, message: "Subject deleted", variant: "success" });
      fetchSubjects();
    } catch (err) {
      console.error("Delete error:", err.response?.data || err.message);
      setToast({ show: true, message: "Delete failed", variant: "danger" });
    }
  };

  if (loading) return <Spinner animation="border" />;

  return (
    <div className="p-4 shadow bg-white rounded">
      <h3 className="mb-3 text-dark">All Subjects</h3>
      {error && <Alert variant="danger">{error}</Alert>}

      <Table bordered hover responsive className="table-striped">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Subject Name</th>
            <th>Class</th>
            <th>Code</th>
            <th>Teacher</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {subjects.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center">
                No subjects found.
              </td>
            </tr>
          ) : (
            subjects.map((s, i) => (
              <tr key={s.id}>
                <td>{i + 1}</td>
                <td>{s.name}</td>
                <td>{s.class}</td>
                <td>{s.code}</td>
                <td>
                  {s.teacher
                    ? `${s.teacher.firstName} ${s.teacher.lastName}`
                    : "Unassigned"}
                </td>
                <td>
                  <Button
                    size="sm"
                    variant="warning"
                    className="me-2"
                    onClick={() => handleEditClick(s)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => handleDelete(s.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>

      {/* Edit Modal */}
      <Modal show={showEdit} onHide={() => setShowEdit(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Subject</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>Subject Name</Form.Label>
              <Form.Control
                name="name"
                value={currentSubject.name}
                onChange={handleEditChange}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Class</Form.Label>
              <Form.Control
                name="class"
                value={currentSubject.class}
                onChange={handleEditChange}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Code</Form.Label>
              <Form.Control
                name="code"
                value={currentSubject.code}
                onChange={handleEditChange}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Teacher</Form.Label>
              <Form.Select
                name="teacherId"
                value={currentSubject.teacherId}
                onChange={handleEditChange}
              >
                <option value="">-- Select --</option>
                {teachers.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.firstName} {t.lastName}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEdit(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Toast */}
      <ToastContainer position="bottom-end" className="p-3">
        <Toast
          show={toast.show}
          onClose={() => setToast({ ...toast, show: false })}
          bg={toast.variant}
          delay={3000}
          autohide
        >
          <Toast.Body className="text-white">{toast.message}</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
}
