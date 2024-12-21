import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import Registration from './Registration';
import Layout from './layout'; // Wraps Navbar and shared UI
import ProtectedRoute from './protectedRoute';
import { AuthProvider } from './AuthContext';

// Component Imports
import Home from './homepage';
import AddStudent from './addstudent';
import ViewStudentData from './ViewStudentForm';
import ViewData from './ViewData';
import Attendance from './Attendance';
import MarkAttendance from './MarkAttendance';
import DeleteAttendanceData from './DeleteAttendanceData';
import DeleteAttendanceResult from './DeleteAttendanceResult';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Default route */}
          <Route path="/" element={<Navigate to="/login" />} />

          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />

          {/* Protected Routes */}
          <Route
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route path="/home" element={<Home />} />
            <Route path="/addStudent" element={<AddStudent />} />
            <Route path="/viewstudentform" element={<ViewStudentData />} />
            <Route path="/viewdata" element={<ViewData />} />
            <Route path="/attendance" element={<Attendance />} />
            <Route path="/attendance/markattendance/:branch/:semester" element={<MarkAttendance />} />
            <Route path="/delete-attendance" element={<DeleteAttendanceData />} />
            <Route path="/delete-attendance-result/:branch/:semester" element={<DeleteAttendanceResult />} />
          </Route>

          {/* Fallback Route */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;

