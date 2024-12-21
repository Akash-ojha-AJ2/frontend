import React, { useState } from 'react';
import './addstudent.css';

const AddStudent = () => {
  const [studentName, setStudentName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [rollNo, setRollNo] = useState('');
  const [branch, setBranch] = useState('');
  const [semester, setSemester] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

const handleSubmit = async (e) => {
  e.preventDefault();

  const formData = {
    studentName,
    email,
    phoneNo,
    rollNo,
    branch,
    semester,
  };

  try {
    const response = await fetch('https://attendance-v2dt.onrender.com/api/student/addstudent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (response.ok) {
      console.log('Success:', data);
      setSuccessMessage(data.message);
      // Clear form and messages
    } else {
      console.error('Error Response:', data);
      setErrorMessage(data.message || 'Something went wrong');
    }
  } catch (error) {
    console.error('Network error:', error);
    setErrorMessage('Network error. Please try again later.');
  }
};


  // Close the success message manually
  const handleCloseSuccessMessage = () => {
    setSuccessMessage('');
  };

  return (
    <div className='add'>
    <div className="form-containerr">
      <h1>Add New Student</h1>
      {successMessage && (
        <div className="message success">
          <span>{successMessage}</span>
          <button className="close-btn" onClick={handleCloseSuccessMessage}>×</button>
        </div>
      )}
      {errorMessage && <div className="message error">{errorMessage}</div>}

      <form onSubmit={handleSubmit} className="student-form">
        <div className="form-group">
          <label htmlFor="studentName">Student Name:</label>
          <input
            type="text"
            name="studentName"
            id="studentName"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="phoneNo">Phone Number:</label>
          <input
            type="text"
            name="phoneNo"
            id="phoneNo"
            value={phoneNo}
            onChange={(e) => setPhoneNo(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="rollNo">Roll Number:</label>
          <input
            type="text"
            name="rollNo"
            id="rollNo"
            value={rollNo}
            onChange={(e) => setRollNo(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="branch">Branch:</label>
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
          <label htmlFor="semester">Semester:</label>
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

        <button type="submit" className="submit-btn">Add Student</button>
      </form>
    </div>
    </div>
  );
};

export default AddStudent;
