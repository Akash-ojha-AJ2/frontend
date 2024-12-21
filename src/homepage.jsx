import React, { useState, useEffect } from 'react';
import './homepage.css';
import image from './assets/home.jpg.jpg'; // Adjust path if needed

import Cookies from 'js-cookie';

const AddStudent = () => {
  const teacherId = Cookies.get('teacherId');

  if (!teacherId) {
    window.location.href = '/login'; // Redirect to login if not authenticated
    return null;
  }


  return (
    <div className="add-student-containerr">
        <img src={image} alt="Home Background" className='img1'/>
      <div className="overlay">
        <h1 className="welcome-message">Namaste</h1>
        <h2 className="slogan">Please Manage <br></br>Your Student Attendance Data</h2>
      </div>
    </div>
  );
};

export default AddStudent;
