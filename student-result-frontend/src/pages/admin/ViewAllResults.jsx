import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Alert, Spinner, Form, InputGroup, Badge } from "react-bootstrap";

export default function ViewAllResults() {
  const [results, setResults] = useState([]);
  const [groupedResults, setGroupedResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await axios.get("https://localhost:7294/api/result", { headers });

        const grouped = groupResultsByStudent(res.data);
        setResults(grouped);
        setGroupedResults(grouped);
      } catch (err) {
        setError("Failed to load results.");
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, []);

  const groupResultsByStudent = (data) => {
    const map = new Map();

    data.forEach((r) => {
      const key = r.studentId;
      if (!map.has(key)) {
        map.set(key, {
          studentId: r.studentId,
          studentName: r.studentName,
          subjects: [],
        });
      }
      map.get(key).subjects.push({ subject: r.subjectCode, marks: r.marks });
    });

    return Array.from(map.values()).map((entry) => {
      const totalMarks = entry.subjects.reduce((sum, s) => sum + s.marks, 0);
      const maxMarks = entry.subjects.length * 100;
      const percentage = (totalMarks / maxMarks) * 100;
      const status = percentage >= 35 ? "Pass" : "Fail";

      return {
        ...entry,
        totalMarks,
        percentage: percentage.toFixed(2),
        status,
      };
    });
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    const filtered = results.filter((r) =>
      r.studentName.toLowerCase().includes(value) ||
      r.subjects.some((s) => s.subject.toLowerCase().includes(value))
    );

    setGroupedResults(filtered);
  };

  if (loading) return <Spinner animation="border" className="mt-4" />;

  return (
    <div className="p-4 shadow bg-white rounded">
      <h3 className="mb-3 text-dark">All Student Results</h3>
      {error && <Alert variant="danger">{error}</Alert>}

      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Search by student or subject"
          value={searchTerm}
          onChange={handleSearch}
        />
      </InputGroup>

      <Table bordered hover responsive className="table-striped">
        <thead className="table-dark text-center">
          <tr>
            <th>#</th>
            <th>Student</th>
            <th>Subjects</th>
            <th>Total Marks</th>
            <th>Percentage</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {groupedResults.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center">No results found.</td>
            </tr>
          ) : (
            groupedResults.map((r, i) => (
              <tr key={r.studentId} className="text-center align-middle">
                <td>{i + 1}</td>
                <td>{r.studentName}</td>
                <td className="text-start">
                  {r.subjects.map((s, idx) => (
                    <div key={idx}>🟣 {s.subject} : {s.marks}</div>
                  ))}
                </td>
                <td>{r.totalMarks}</td>
                <td>{r.percentage}%</td>
                <td>
                  <Badge bg={r.status === "Pass" ? "success" : "danger"}>
                    {r.status}
                  </Badge>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </div>
  );
}
