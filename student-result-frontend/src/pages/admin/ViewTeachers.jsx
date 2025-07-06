import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Alert,
  Modal,
  Form,
  ToastContainer,
  Toast,
} from "react-bootstrap";
import axios from "axios";

export default function ViewTeachers() {
  const [teachers, setTeachers] = useState([]);
  const [error, setError] = useState("");
  const [toast, setToast] = useState({ show: false, message: "", variant: "" });

  const token = localStorage.getItem("token");

  const [showEdit, setShowEdit] = useState(false);
  const [currentTeacher, setCurrentTeacher] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    gender: "",
    address: "",
  });

  const fetchTeachers = async () => {
    try {
      const res = await axios.get("https://localhost:7294/api/teacher", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTeachers(res.data);
    } catch (err) {
      setError("Failed to load teachers");
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  const handleEditClick = (teacher) => {
    setCurrentTeacher(teacher);
    setShowEdit(true);
  };

  const handleEditChange = (e) => {
    setCurrentTeacher({ ...currentTeacher, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const updatedData = {
        firstName: currentTeacher.firstName,
        lastName: currentTeacher.lastName,
        email: currentTeacher.email,
        phone: currentTeacher.phone,
        gender: currentTeacher.gender,
        address: currentTeacher.address,
      };

      await axios.put(
        `https://localhost:7294/api/teacher/${currentTeacher.id}`,
        updatedData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setToast({ show: true, message: "Teacher updated successfully", variant: "success" });
      setShowEdit(false);
      fetchTeachers();
    } catch (err) {
      console.error("Update Error:", err.response?.data || err.message);
      setToast({ show: true, message: "Update failed", variant: "danger" });
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this teacher?");
    if (!confirm) return;

    try {
      await axios.delete(`https://localhost:7294/api/teacher/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setToast({ show: true, message: "Teacher deleted", variant: "success" });
      fetchTeachers();
    } catch (err) {
      console.error("Delete Error:", err.response?.data || err.message);
      setToast({ show: true, message: "Delete failed", variant: "danger" });
    }
  };

  return (
    <div className="p-4 shadow bg-white rounded">
      <h3 className="mb-3 text-dark">All Teachers</h3>
      {error && <Alert variant="danger">{error}</Alert>}

      <Table bordered hover responsive className="table-striped">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Gender</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {teachers.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-center">
                No teachers found.
              </td>
            </tr>
          ) : (
            teachers.map((teacher, idx) => (
              <tr key={teacher.id}>
                <td>{idx + 1}</td>
                <td>{teacher.firstName} {teacher.lastName}</td>
                <td>{teacher.email}</td>
                <td>{teacher.phone}</td>
                <td>{teacher.gender}</td>
                <td>{teacher.address}</td>
                <td>
                  <Button size="sm" variant="warning" className="me-2" onClick={() => handleEditClick(teacher)}>
                    Edit
                  </Button>
                  <Button size="sm" variant="danger" onClick={() => handleDelete(teacher.id)}>
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
          <Modal.Title>Edit Teacher</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                name="firstName"
                value={currentTeacher.firstName}
                onChange={handleEditChange}
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                name="lastName"
                value={currentTeacher.lastName}
                onChange={handleEditChange}
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={currentTeacher.email}
                onChange={handleEditChange}
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                name="phone"
                value={currentTeacher.phone}
                onChange={handleEditChange}
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Gender</Form.Label>
              <Form.Select
                name="gender"
                value={currentTeacher.gender}
                onChange={handleEditChange}
              >
                <option value="">Select</option>
                <option>Male</option>
                <option>Female</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Address</Form.Label>
              <Form.Control
                name="address"
                value={currentTeacher.address}
                onChange={handleEditChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEdit(false)}>Cancel</Button>
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
