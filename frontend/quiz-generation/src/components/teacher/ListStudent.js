import React, { useState, useEffect } from "react";
import Layout from "../layout/Layout";
import { Modal, Button } from "react-bootstrap";
import "./ListStudent.css";

const ListStudent = () => {
  // State and effect hooks
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [studentsPerPage] = useState(7);

  useEffect(() => {
    fetch("/allSatudents")
      .then((res) => res.json())
      .then((data) => setStudents(data));
  }, []);
  const handleSelectStudents = (student) => {
    setSelectedStudent(student);
  };
  const handleShowModal = (student) => {
    setSelectedStudent(student);
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedStudent(null);
  };
  // Pagination functions
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = students.slice(
    indexOfFirstStudent,
    indexOfLastStudent
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  // Rendering
  return (
    <div className="pat-cover">
      <Layout>
        <div>
          <h1>Students</h1>
          <table className="containerpatient">
            <thead className="co-thread">
              <tr className="co-td">
                <th className="co-th">Email</th>
              </tr>
            </thead>
            <tbody className="co-tbody">
              {currentStudents.map((student, index) => (
                <tr className="co-tr" key={index}>
                  <td className="co-td">{student.email}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="pagination">
            {students.length > studentsPerPage &&
              Array.from(
                { length: Math.ceil(students.length / studentsPerPage) },
                (_, i) => (
                  <button key={i} onClick={() => paginate(i + 1)}>
                    {i + 1}
                  </button>
                )
              )}
          </div>
        </div>
      </Layout>
    </div>
  );
};
export default ListStudent;
