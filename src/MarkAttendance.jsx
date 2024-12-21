import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './MarkAteendance.css';

const MarkAttendance = () => {
  const { branch, semester } = useParams(); // Get branch and semester from URL
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [date, setDate] = useState('');
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Fetch students based on branch and semester
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch(
          `https://attendance-v2dt.onrender.com/api/student/attendancedataform/${branch}/${semester}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include', // Include session cookies
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to fetch students');
        }

        const data = await response.json();
        setStudents(data);

        // Initialize attendance object with "Absent" for all students
        const initialAttendance = {};
        data.forEach((student) => {
          initialAttendance[student._id] = 'Absent';
        });
        setAttendance(initialAttendance);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [branch, semester]);

  // Handle checkbox change
  const handleAttendanceChange = (studentId) => {
    setAttendance((prev) => ({
      ...prev,
      [studentId]: prev[studentId] === 'Present' ? 'Absent' : 'Present',
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!date || isNaN(new Date(date).getTime())) {
      alert('Please select a valid date for attendance.');
      return;
    }

    // Create an array of studentIds where the attendance is "Present"
    const presentStudentIds = Object.keys(attendance).filter((studentId) => attendance[studentId] === 'Present');

    const attendanceData = {
      branch,
      semester,
      date,
      studentIds: presentStudentIds,  // Send the present students' IDs to the backend
    };

    setIsSubmitting(true);
    try {
      const response = await fetch('https://attendance-v2dt.onrender.com/api/student/attendance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(attendanceData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage(data.message || 'Attendance marked successfully.');
        setError('');

        const resetAttendance = {};
        students.forEach((student) => {
          resetAttendance[student._id] = 'Absent';
        });
        setAttendance(resetAttendance);

        setTimeout(() => {
          setSuccessMessage('');
        }, 3000);
      } else {
        throw new Error(data.message || 'Failed to mark attendance.');
      }
    } catch (err) {
      setError(err.message);
      setSuccessMessage('');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <div>Loading students...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  const presentCount = Object.values(attendance).filter((status) => status === 'Present').length;
  const absentCount = Object.values(attendance).length - presentCount;

  return (
    <div className="attendance-container">
      <h1>Mark Attendance</h1>

      {/* Display success or error messages */}
      {successMessage && <div className="success-message">{successMessage}</div>}
      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit}>
        {/* Date Input */}
        <div className="form-group">
          <label htmlFor="date">Select Date:</label>
          <input
            type="date"
            id="date"
            name="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            max={new Date().toISOString().split('T')[0]} // Restrict future dates
            required
          />
        </div>

        {/* Attendance Summary */}
        <div className="attendance-summary">
          <p>Present: {presentCount}</p>
          <p>Absent: {absentCount}</p>
        </div>

        {/* Attendance Table */}
        <table className="attendance-table">
          <thead>
            <tr>
              <th className='serial'>Serial <br className='br'></br> No.</th> {/* New Column for Serial Number */}
              <th className='roll'>Roll No</th>
              <th>Name</th>
              <th className='branch'>Branch</th>
              <th className='sem'>Semester</th>
              <th>Mark<br className='br'></br> Attendance</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={student._id}>
                <td>{index + 1}</td> {/* Display serial number */}
                <td className='roll'>{student.rollNo}</td>
                <td>{student.studentName}</td>
                <td className='branch'>{student.branch}</td>
                <td className='sem'>{student.semester}</td>
                <td>
                  <input
                    type="checkbox"
                    checked={attendance[student._id] === 'Present'}
                    onChange={() => handleAttendanceChange(student._id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit Attendance'}
        </button>
      </form>
    </div>
  );
};

export default MarkAttendance;
