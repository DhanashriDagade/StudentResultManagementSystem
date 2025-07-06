import React, { useState } from "react";
import {
  Form,
  Button,
  Card,
  Alert,
  Row,
  Col,
  Spinner,
  Container,
  InputGroup,
} from "react-bootstrap";
import {
  PersonPlus,
  Envelope,
  Lock,
  Telephone,
  GeoAlt,
  GenderAmbiguous,
  Eye,
  EyeSlash,
} from "react-bootstrap-icons";
import axios from "axios";

export default function RegisterTeacherPage() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    gender: "",
    address: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); 

  const validate = () => {
    const newErrors = {};
    const nameRegex = /^[A-Za-z]+$/;
    const phoneRegex = /^\d{10}$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[@]).{6,}$/;

    if (!form.firstName.trim() || !nameRegex.test(form.firstName))
      newErrors.firstName = "Valid first name is required";

    if (!form.lastName.trim() || !nameRegex.test(form.lastName))
      newErrors.lastName = "Valid last name is required";

    if (!form.email.includes("@"))
      newErrors.email = "Valid email is required";

    if (!passwordRegex.test(form.password))
      newErrors.password =
        "Password must have uppercase, lowercase, @ and 6+ characters";

    if (!phoneRegex.test(form.phone))
      newErrors.phone = "Phone must be exactly 10 digits";

    if (!form.gender) newErrors.gender = "Gender is required";

    if (!form.address.trim()) newErrors.address = "Address is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setErrors({});
    if (!validate()) return;

    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      await axios.post(
        "https://localhost:7294/api/auth/register-teacher",
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccess("Teacher registered successfully!");
      setForm({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        phone: "",
        gender: "",
        address: "",
      });
    } catch (err) {
      setErrors({
        api: err.response?.data || "Server error. Try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-4">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="shadow-sm p-4">
            <h4 className="mb-3 text-dark text-center">
              <PersonPlus className="me-2" />
              Register Teacher
            </h4>

            {success && <Alert variant="success">{success}</Alert>}
            {errors.api && <Alert variant="danger">{errors.api}</Alert>}

            <Form onSubmit={handleSubmit}>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={form.firstName}
                      onChange={(e) =>
                        setForm({ ...form, firstName: e.target.value })
                      }
                      isInvalid={!!errors.firstName}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.firstName}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={form.lastName}
                      onChange={(e) =>
                        setForm({ ...form, lastName: e.target.value })
                      }
                      isInvalid={!!errors.lastName}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.lastName}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label>
                  <Envelope className="me-1" />
                  Email
                </Form.Label>
                <Form.Control
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  isInvalid={!!errors.email}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>
                  <Lock className="me-1" />
                  Password
                </Form.Label>
                <InputGroup>
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={(e) =>
                      setForm({ ...form, password: e.target.value })
                    }
                    isInvalid={!!errors.password}
                  />
                  <Button
                    variant="outline-secondary"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeSlash /> : <Eye />}
                  </Button>
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                </InputGroup>
                <Form.Text className="text-muted">
                  Must include uppercase, lowercase, @ and 6+ characters.
                </Form.Text>
              </Form.Group>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      <Telephone className="me-1" />
                      Phone
                    </Form.Label>
                    <Form.Control
                      type="text"
                      value={form.phone}
                      onChange={(e) =>
                        setForm({ ...form, phone: e.target.value })
                      }
                      isInvalid={!!errors.phone}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.phone}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      <GenderAmbiguous className="me-1" />
                      Gender
                    </Form.Label>
                    <Form.Select
                      value={form.gender}
                      onChange={(e) =>
                        setForm({ ...form, gender: e.target.value })
                      }
                      isInvalid={!!errors.gender}
                    >
                      <option value="">Select</option>
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {errors.gender}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label>
                  <GeoAlt className="me-1" />
                  Address
                </Form.Label>
                <Form.Control
                  type="text"
                  value={form.address}
                  onChange={(e) =>
                    setForm({ ...form, address: e.target.value })
                  }
                  isInvalid={!!errors.address}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.address}
                </Form.Control.Feedback>
              </Form.Group>

              <div className="text-center">
                <Button type="submit" variant="primary" disabled={loading}>
                  {loading ? (
                    <>
                      <Spinner
                        animation="border"
                        size="sm"
                        className="me-2"
                      />
                      Registering...
                    </>
                  ) : (
                    "Register Teacher"
                  )}
                </Button>
              </div>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
