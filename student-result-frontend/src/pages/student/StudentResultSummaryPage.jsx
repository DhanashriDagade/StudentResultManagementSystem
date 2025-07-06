import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Card, Table, Spinner, Alert, Button } from "react-bootstrap";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function StudentResultSummary() {
  const [results, setResults] = useState([]);
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await axios.get("https://localhost:7294/api/studentviewresult/my-results", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setResults(res.data);

        const profileRes = await axios.get("https://localhost:7294/api/studentviewresult/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setStudent(profileRes.data);
      } catch (err) {
        setError(err.response?.data || "Failed to load student results.");
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [token]);

  const totalMarks = results.reduce((acc, r) => acc + r.marks, 0);
  const maxMarks = results.length * 100;
  const percentage = ((totalMarks / maxMarks) * 100).toFixed(2);
  const isPassed = percentage >= 35;

  const generatePDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Result Summary", 70, 15);

    doc.setFontSize(12);
    doc.text(`Name: ${student.firstName} ${student.lastName}`, 14, 30);
    doc.text(`Roll No: ${student.rollNumber}`, 14, 38);
    doc.text(`Class: ${student.class}`, 14, 46);
    doc.text(`Total Marks: ${totalMarks} / ${maxMarks}`, 14, 54);
    doc.text(`Percentage: ${percentage}%`, 14, 62);
    doc.text(`Status: ${isPassed ? "Pass" : "Fail"}`, 14, 70);

    autoTable(doc, {
      startY: 80,
      head: [["#", "Subject", "Marks"]],
      body: results.map((r, i) => [i + 1, r.subject, r.marks]),
    });

    doc.save("result-summary.pdf");
  };

  if (loading) return <div className="text-center mt-5"><Spinner animation="border" /></div>;
  if (error) return <Alert variant="danger" className="mt-4 text-center">{error}</Alert>;

  return (
    <Container className="mt-5">
      <Card className="p-4 shadow">
        <h3 className="text-center text-primary mb-4">Result Management System</h3>

        <p><strong>Student Name :</strong> {student.firstName} {student.lastName}</p>
        <p><strong>Student Roll Id :</strong> {student.rollNumber}</p>
        <p><strong>Student Class:</strong> {student.class}</p>

        <Table striped bordered hover className="mt-4">
          <thead>
            <tr>
              <th>#</th>
              <th>Subject</th>
              <th>Marks</th>
            </tr>
          </thead>
          <tbody>
            {results.map((r, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{r.subject}</td>
                <td>{r.marks}</td>
              </tr>
            ))}
            <tr>
              <td colSpan="2"><strong>Total Marks</strong></td>
              <td><strong>{totalMarks} out of {maxMarks}</strong></td>
            </tr>
            <tr>
              <td colSpan="2"><strong>Percentage</strong></td>
              <td><strong>{percentage} %</strong></td>
            </tr>
            <tr>
              <td colSpan="2"><strong>Status</strong></td>
              <td>
                <strong className={isPassed ? "text-success" : "text-danger"}>
                  {isPassed ? "Pass" : "Fail"}
                </strong>
              </td>
            </tr>
            <tr>
              <td colSpan="2"><strong>Download Result</strong></td>
              <td><Button variant="link" onClick={generatePDF}>Download PDF</Button></td>
            </tr>
          </tbody>
        </Table>
      </Card>
    </Container>
  );
}
