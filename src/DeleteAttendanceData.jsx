import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DeleteAttendanceData = () => {
  const [branch, setBranch] = useState('');
  const [semester, setSemester] = useState('');
  const navigate = useNavigate();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // After the form is submitted, navigate to the delete results page with branch and semester as params
    navigate(`/delete-attendance-result/${branch}/${semester}`);
  };

  return (
    <div className='select'>
    <div className="form-container select-data">
    <h1 className="form-heading">View Student Data for Deletion</h1>
  
    {/* Form to select branch and semester */}
    <form onSubmit={handleFormSubmit} className="form">
      <div className="form-group">
        <label htmlFor="branch" className="form-label">Select Branch:</label>
        <select
          name="branch"
          id="branch"
          required
          value={branch}
          onChange={(e) => setBranch(e.target.value)}
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
        <label htmlFor="semester" className="form-label">Select Semester:</label>
        <select
          name="semester"
          id="semester"
          required
          value={semester}
          onChange={(e) => setSemester(e.target.value)}
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
  
      <button type="submit" className="form-button">View Students</button>
    </form>
  </div>
  </div>
  
  );
};

export default DeleteAttendanceData;
