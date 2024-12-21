import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./viewStudentForm.css"

const ViewStudentData = () => {
  const [branch, setBranch] = useState('');
  const [semester, setSemester] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send branch and semester to the backend to fetch student data
    try {
      const response = await fetch('https://attendance-v2dt.onrender.com/api/student/viewstudentdataform', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ branch, semester }),
      });

      const data = await response.json();

      if (response.ok) {
        // Navigate to ViewData and pass the student data via state
        navigate('/viewdata', {
          state: { data,branch,semester },
        });
      } else {
        console.error('Error fetching student data:', data);
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  return (
    <div className='select-data'>
    <div className="form-container">
    <h1 className="form-heading">View Student Data</h1>
    <form onSubmit={handleSubmit} className="form">
      <div className="form-group">
        <label className="form-label">Branch:</label>
        <select
          value={branch}
          onChange={(e) => setBranch(e.target.value)}
          required
          className="form-input"
        >
          <option value="">Select Branch</option>
          <option value="Computer Science">Computer Science</option>
          <option value="Mechanical Engineering">Mechanical Engineering</option>
          <option value="Civil Engineering">Civil Engineering</option>
          <option value="Electrical Engineering">Electrical Engineering</option>
          <option value="Electronics and Communication">Electronics and Communication</option>
          <option value="Information Technology">Information Technology</option>
          <option value="Chemical Engineering">Chemical Engineering</option>
          <option value="Aerospace Engineering">Aerospace Engineering</option>
        </select>
      </div>
  
      <div className="form-group">
        <label className="form-label">Semester:</label>
        <select
          value={semester}
          onChange={(e) => setSemester(e.target.value)}
          required
          className="form-input"
        >
          <option value="">Select Semester</option>
          <option value="Semester 1">Semester 1</option>
          <option value="Semester 2">Semester 2</option>
          <option value="Semester 3">Semester 3</option>
          <option value="Semester 4">Semester 4</option>
          <option value="Semester 5">Semester 5</option>
          <option value="Semester 6">Semester 6</option>
          <option value="Semester 7">Semester 7</option>
          <option value="Semester 8">Semester 8</option>
        </select>
      </div>
  
      <div className="form-group">
        <button type="submit" className="form-button">View Students</button>
      </div>
    </form>
  </div>
  </div>
  
  );
};

export default ViewStudentData;
