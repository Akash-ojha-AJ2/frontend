import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import './Navbar.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch('https://attendance-v2dt.onrender.com/api/teachers/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        credentials: 'include',
      });

      if (response.ok) {
        localStorage.removeItem('token');
        localStorage.removeItem('teacherId');
        Cookies.remove('token', { path: '/' });
        Cookies.remove('teacherId', { path: '/' });
        navigate('/login');
      } else {
        const errorData = await response.json();
        console.error('Logout failed:', errorData.message || 'Unknown error');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  // Function to close the menu on link click
  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="logo">
          <h1>MARK</h1>
          <h2>MY ATTENDANCE</h2>
        </div>
        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>
      <div className={`navbar-right ${menuOpen ? 'show' : ''}`}>
        <ul className="navbar-links">
          <li><Link to="/home" className="navbar-link" onClick={handleLinkClick}>Home</Link></li>
          <li><Link to="/addStudent" className="navbar-link" onClick={handleLinkClick}>Add Student</Link></li>
          <li><Link to="/viewstudentform" className="navbar-link" onClick={handleLinkClick}>View Student Data</Link></li>
          <li><Link to="/attendance" className="navbar-link" onClick={handleLinkClick}>Attendance</Link></li>
          <li><Link to="/delete-attendance" className="navbar-link" onClick={handleLinkClick}>Delete Attendance</Link></li>
          <li>
            <button
              onClick={() => {
                handleLogout();
                handleLinkClick();
              }}
              className="navbar-link logout-button"
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

