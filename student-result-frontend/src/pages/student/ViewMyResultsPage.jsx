import React, { useEffect, useState } from "react";
import { Table, Spinner, Alert, Card } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ViewMyResultsPage() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (role !== "Student") {
      navigate("/unauthorized");
    } else {
      fetchResults();
    }
  }, []);

  const fetchResults = async () => {
    try {
      const res = await axios.get("https://localhost:7294/api/studentviewresult/my-results", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setResults(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load your results.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-4 shadow-sm bg-white">
      <h3 className="text-primary mb-3">My Results</h3>
      {loading ? (
        <Spinner animation="border" />
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : results.length === 0 ? (
        <Alert variant="info">No results found.</Alert>
      ) : (
        <Table striped bordered hover responsive>
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Subject</th>
              <th>Marks</th>
              <th>Grade</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {results.map((r, i) => (
              <tr key={r.id}>
                <td>{i + 1}</td>
                <td>{r.subject}</td>
                <td>{r.marks}</td>
                <td>{r.grade}</td>
                <td>{new Date(r.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Card>
  );
}
