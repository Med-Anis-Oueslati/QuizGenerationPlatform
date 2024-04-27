import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Modal,
  Form,
  Card,
} from "react-bootstrap";
import axios from "axios";
import "./Dashboard.css";

function Dashboard() {
  const [students, setStudents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newStudent, setNewStudent] = useState({
    name: "",
    email: "",
    establishment: "",
  });
  useEffect(() => {
    // Fetch the list of patients from the backend API
    axios
      .get("/api/students")
      .then((response) => setStudents(response.data))
      .catch((error) => console.log(error));
  }, []);
  const handleShowModal = () => setShowModal(true);

  const handleCloseModal = () => setShowModal(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewStudent((prevState) => ({ ...prevState, [name]: value }));
  };
  const handleAddStudent = (event) => {
    event.preventDefault();
    // Add a new patient to the database
    axios
      .post("/api/students", newStudent)
      .then((response) => {
        setStudents((prevState) => [...prevState, response.data]);
        setNewStudent({ name: "", email: "", establishment: "" });
        setShowModal(false);
      })
      .catch((error) => console.log(error));
  };
  const handleDeleteStudent = (id) => {
    // Delete a patient from the database
    axios
      .delete(`/api/students/${id}`)
      .then(() => {
        setStudents((prevState) =>
          prevState.filter((student) => student._id !== id)
        );
      })
      .catch((error) => console.log(error));
  };
  return (
    <div className="dashboard-container">
      <Container>
        <Row>
          <Col md={12} lg={6}>
            <div className="dashboard-card">
              <div className="dashboard-card-header">
                <h3>My Students</h3>
                <Button onClick={handleShowModal}>Add Student</Button>
              </div>
              <div className="dashboard-card-body">
                {students.length ? (
                  <div className="patients-list">
                    {students.map((student) => (
                      <Card key={student._id} className="patient-card">
                        <Card.Body>
                          <Card.Title>{student.name}</Card.Title>
                          <Card.Subtitle className="mb-2 text-muted">
                            email: {student.email}
                          </Card.Subtitle>
                          <Card.Subtitle className="mb-2 text-muted">
                            establishment: {student.gender}
                          </Card.Subtitle>
                          <Card.Text>{student.diagnosis}</Card.Text>
                          <Button
                            variant="danger"
                            onClick={() => handleDeleteStudent(student._id)}
                          >
                            Delete
                          </Button>
                        </Card.Body>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <p>No students yet</p>
                )}
              </div>
            </div>
          </Col>
          <Col md={12} lg={6}>
            <div className="dashboard-card">
              <div className="dashboard-card-header">
                <h3>Statistics</h3>
              </div>
              <div className="dashboard-card-body">
                <p>Coming soon...</p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Student</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAddStudent}>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={newStudent.name}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={newStudent.email}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>establishment</Form.Label>
              <Form.Control
                type="string"
                name="establishment"
                value={newStudent.gender}
                onChange={handleInputChange}
                required
              ></Form.Control>
            </Form.Group>
            <Button type="submit">Add</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Dashboard;
