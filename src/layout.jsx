import React from 'react';
import Dashboard from './Navbar'; // This is your Navbar component
import { Outlet } from 'react-router-dom'; // This will render the page content

const Layout = () => {
  return (
    <div>
      <Dashboard /> {/* This Navbar will always be visible */}
      <div className="content">
        <Outlet /> {/* This will render the current page's content */}
      </div>
    </div>
  );
};

export default Layout;
