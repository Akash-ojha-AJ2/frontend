import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "./DeleteAttendanceRoute.css"

const DeleteAttendanceResult = () => {
  const { branch, semester } = useParams(); // Get branch and semester from the URL
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deletingStudentId, setDeletingStudentId] = useState(null); // Track which student is being deleted
  const [deletingAll, setDeletingAll] = useState(false); // Track the state of deleting all students

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch(`https://attendance-v2dt.onrender.com/api/student/${branch}/${semester}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include', // Ensure the session or token is sent
        });

        if (!response.ok) {
          throw new Error('Failed to fetch student data');
        }

        const data = await response.json();
        setStudents(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [branch, semester]);

  const handleDelete = async (studentId) => {
    setDeletingStudentId(studentId); // Set the currently deleting student
    try {
      const response = await fetch(`https://attendance-v2dt.onrender.com/api/student/delete/${studentId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Send cookies or authentication token
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete student');
      }

      // Update frontend after successful deletion
      setStudents(students.filter((student) => student._id !== studentId));
      alert('Student deleted successfully');
    } catch (err) {
      setError(err.message); // Display error if something goes wrong
    } finally {
      setDeletingStudentId(null); // Reset deleting state
    }
  };

  const handleDeleteAll = async () => {
    setDeletingAll(true);
    try {
      const response = await fetch(`https://attendance-v2dt.onrender.com/api/student/deleteall/${branch}/${semester}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete all students');
      }

      // Clear the students list after deletion
      setStudents([]);
      alert('All students deleted successfully');
    } catch (err) {
      setError(err.message); // Display error if something goes wrong
    } finally {
      setDeletingAll(false);
    }
  };

  if (loading) return <div className="loading-message">Loading students...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="delete-container">
      <h1 className="delete-title">Students for Deletion</h1>
      {students.length > 0 ? (
        <>
          <table className="student-table">
            <thead>
              <tr>
                <th>Serial No.</th>
                <th>Roll No</th>
                <th>Name</th>
                <th>Branch</th>
                <th>Semester</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <tr key={student._id}>
                  <td>{index + 1}</td>
                  <td>{student.rollNo}</td>
                  <td>{student.studentName}</td>
                  <td>{student.branch}</td>
                  <td>{student.semester}</td>
                  <td>
                    <button
                      onClick={() => handleDelete(student._id)}
                      className="delete-button"
                      disabled={deletingStudentId === student._id}
                    >
                      {deletingStudentId === student._id ? 'Deleting...' : 'Delete'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="delete-all-container">
            <button
              onClick={handleDeleteAll}
              className="delete-all-button"
              disabled={deletingAll}
            >
              {deletingAll ? 'Deleting All...' : 'Delete All'}
            </button>
          </div>
        </>
      ) : (
        <div>No students found for this batch and semester.</div>
      )}
    </div>
  );
};

export default DeleteAttendanceResult;
