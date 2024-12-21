import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Attendance.css';

const Attendance = () => {
  const [branch, setBranch] = useState('');
  const [semester, setSemester] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form fields ko check karte hain
    if (branch && semester) {
      // Agar branch aur semester selected hain, toh naye route par navigate karenge
      navigate(`/attendance/markattendance/${branch}/${semester}`);
    } else {
      alert('Please select both branch and semester.');
    }
  };

  return (

    <div className='select'>
    <div className="attendance-form">
  <h1>Attendance</h1>
  <form onSubmit={handleSubmit}>
    <div className="form-group">
      <label htmlFor="branch">Select Branch:</label>
      <select
        name="branch"
        id="branch"
        value={branch}
        onChange={(e) => setBranch(e.target.value)}
        required
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
      <label htmlFor="semester">Select Semester:</label>
      <select
        name="semester"
        id="semester"
        value={semester}
        onChange={(e) => setSemester(e.target.value)}
        required
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

    <button type="submit" className="submit-btn">View Students</button>
  </form>
</div>
</div>

  );
};

export default Attendance;
