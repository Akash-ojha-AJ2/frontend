import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import './Navbar.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch('https://attendance-v2dt.onrender.com/api/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Token in header
        },
        credentials: 'include',
      });

      if (response.ok) {
        // Clear token and redirect to login
        localStorage.removeItem('token');
        localStorage.removeItem('teacherId');
        Cookies.remove('token', { path: '/' });
        Cookies.remove('teacherId', { path: '/' });
        navigate('/login'); // Redirect to login page
      } else {
        const errorData = await response.json();
        console.error('Logout failed:', errorData.message || 'Unknown error');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="logo">
          <h1>MARK</h1>
          <h2>MY ATTENDANCE</h2>
        </div>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>
      </div>
      <div className={`navbar-right ${menuOpen ? 'show' : ''}`}>
        <ul className="navbar-links">
          <li><Link to="/home" className="navbar-link">Home</Link></li>
          <li><Link to="/addStudent" className="navbar-link">Add Student</Link></li>
          <li><Link to="/viewstudentform" className="navbar-link">View Student Data</Link></li>
          <li><Link to="/attendance" className="navbar-link">Attendance</Link></li>
          <li><Link to="/delete-attendance" className="navbar-link">Delete Attendance</Link></li>
          <li>
            <button onClick={handleLogout} className="navbar-link logout-button">
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

