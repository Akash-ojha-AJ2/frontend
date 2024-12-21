import React, { useState } from 'react';
import "./Navbar.css";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Assuming you have AuthContext for managing login state


const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth(); // Get the logout function from AuthContext

  const handleLogout = async () => {
    try {
      const response = await fetch('https://attendance-v2dt.onrender.com/api/teachers/logout', {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        logout(); // Update authentication state
        navigate('/login'); // Redirect to login page after successful logout
      } else {
        console.error('Logout failed.');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        {/* Logo */}
        <div className='logo'>
          <h1>MARK</h1>
          <h2>MY ATTENDANCE</h2>
        </div>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>
      </div>
      <div className={`navbar-right ${menuOpen ? 'show' : ''}`}>
        {/* Navbar Links */}
        <ul className="navbar-links">
          <li><Link to="/home" className="navbar-link">Home</Link></li>
          <li><Link to="/addStudent" className="navbar-link">Add Student</Link></li>
          <li><Link to="/viewstudentform" className="navbar-link">View Student Data</Link></li>
          <li><Link to="/attendance" className="navbar-link">Attendance</Link></li>
          <li><Link to="/delete-attendance" className="navbar-link">Delete Attendance</Link></li>
          {/* Logout Button inside the list */}
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
